import { createMarkdown } from "./../service/telegram";
import { telegram, tlgSendMessage, T_METHODS } from "./../service/axios";
import { Roles } from "./../service/roles";
import express from "express";

import { Homework } from "../models/homework";
import { auth } from "../middleware/auth";
import IHomework from "../interfaces/homework";
import { isProd } from "../utils";
import { User } from "../models/user";

const router = express.Router();

interface createHomeworkDTO extends Omit<IHomework, "_id" | "studentId"> {}

router.post("/homework", auth, async (req, res) => {
  const dto = req.body as createHomeworkDTO;

  const { hwId } = req.query;
  const saveHomeworkToHomework = hwId;

  if (saveHomeworkToHomework) {
    try {
      const hwToUpdate = await Homework.findOneAndUpdate(
        { _id: hwId },
        {
          answer: { ...dto, teacherId: req.user._id },
        },
        { new: true }
      );
      if (hwToUpdate) {
        const user = await User.findById(hwToUpdate.studentId);
        if (!user) return;
        tlgSendMessage({
          chat_id: user.telegramChatId,
          text: `
There is answer to your homework

${createMarkdown.lessonLink(hwToUpdate.lessonId.toString(), user._id)}
`,
        });
      }

      return res.status(201).send();
    } catch {
      return res.status(400).send();
    }
  }

  try {
    const hw = new Homework({
      ...dto,
      studentId: req.user._id,
    });
    const sentHw = await hw.save();
    if (isProd()) {
      try {
        const messageToMe = `
      _New homework from ${req.user.name}_ 
      
      ${createMarkdown.lessonLink(dto.lessonId.toString(), req.user._id)}
      `;
        tlgSendMessage({
          chat_id: 794272343,
          text: messageToMe,
        });
      } catch {
        console.log("Telegram send to me hw is lost");
      }
    }
    return res.status(201).send({ homework: sentHw });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/homework", async (req, res) => {
  try {
    const hws = await Homework.find()
      .populate("lessonId")
      .populate("studentId")
      .populate("content.attachments")
      .populate("answer.content.attachments");
    return res.status(200).send(hws);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get("/homeworksByLessonId", auth, async (req, res) => {
  const { lessonId, studentId } = req.query;
  const { _id, roles = [] } = req.user;

  if (studentId === _id.toString() || roles.includes(Roles.TEACHER)) {
    try {
      const hws = await Homework.find({
        lessonId: lessonId,
        studentId: studentId,
      })
        .populate("content.attachments")
        .populate("answer.content.attachments");
      return res.status(200).send(hws);
    } catch (error) {
      return res.status(500).send();
    }
  }

  console.log("This is not allowed request");
  return res.status(200).send([]);
});

export default router;
