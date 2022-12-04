import { telegram, T_METHODS } from "./../service/axios";
import { Roles } from "./../service/roles";
import express from "express";

import { Homework } from "../models/homework";
import { auth } from "../middleware/auth";
import IHomework from "../interfaces/homework";

const router = express.Router();

interface createHomeworkDTO extends Omit<IHomework, "_id" | "studentId"> {}

router.post("/homework", auth, async (req, res) => {
  const dto = req.body as createHomeworkDTO;
  const hw = new Homework({
    ...dto,
    studentId: req.user._id,
  });
  try {
    const sentHw = await hw.save();
    try {
      const messageToMe = `
      _New homework from ${req.user.name}_ 
      
      http://localhost:3000/lesson?lessonId\\=${dto.lessonId}&studentId\\=${req.user._id}
      [inline URL which will bi clickable](http://here-should-be-host.something/lesson?lessonId=${dto.lessonId}&studentId=${req.user._id})
      `;
      telegram
        .post(T_METHODS.SEND_MESSAGE, {
          chat_id: 794272343,
          parse_mode: "MarkdownV2",
          text: messageToMe,
        })
        .catch(console.log);
    } catch {
      console.log("Telegram send to me hw is lost");
    }
    return res.status(201).send({ homework: sentHw });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/homeworksByLessonId", auth, async (req, res) => {
  const { lessonId, studentId } = req.query;
  const { _id, roles = [] } = req.user;
  console.log(req.user);
  console.log(req.query);
  console.log(studentId, _id.toString());
  console.log(roles, Roles.TEACHER);
  if (studentId === _id.toString() || roles.includes(Roles.TEACHER)) {
    try {
      const hws = await Homework.find({
        lessonId: lessonId,
        studentId: studentId,
      }).populate("content.attachments");
      return res.status(200).send(hws);
    } catch (error) {
      return res.status(500).send();
    }
  }

  console.log("This is not allowed request");
  return res.status(200).send([]);
});

export default router;
