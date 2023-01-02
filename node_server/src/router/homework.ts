import { Populative } from "./../types";
import express from "express";

import IHomework, { Homework } from "../models/homework";
import { auth } from "../middleware/auth";
import { Chat } from "../models/chat";

const router = express.Router();

interface createHomeworkDTO extends Omit<IHomework, "_id"> {}

router.post("/homework", auth, async (req, res) => {
  const { studentId, lessonId } = req.body as createHomeworkDTO;

  try {
    const existingHomeworks = await Homework.find({ studentId, lessonId });
    if (existingHomeworks.length > 0) {
      return res
        .status(400)
        .send("Homework for this student and this lesson already exists");
    }

    const chat = new Chat();
    await chat.save();

    const homework = new Homework({
      studentId: studentId,
      lessonId: lessonId,
      chatId: chat._id,
    });
    await homework.save();
    return res.status(201).send({ homework: homework });
  } catch {
    return res.status(500).send();
  }
  /*
  Send to tlg about homework
    if (isProd()) {
      try {
        const messageToMe = `
      _New homework from ${req.user.name}_ 
      
      ${createMarkdown.homeworkLink(hw._id.toString(), req.user.name)}
      `;
        tlgSendMessage({
          chat_id: 794272343,
          text: messageToMe,
        });
      } catch {
        console.log("Telegram send to me hw is lost");
      }
    }
  */
});

router.get("/homework", async (req, res) => {
  const { lessonId, studentId, populate } =
    req.query as unknown as Populative<IHomework>;

  const params: Partial<IHomework> = {};

  if (lessonId && studentId) {
    Object.assign(params, { studentId, lessonId });
  }

  try {
    let homeworks = [];
    if (populate?.lessonId && populate?.studentId) {
      homeworks = await Homework.find(params)
        .populate("lessonId")
        .populate("studentId");
    } else if (populate?.lessonId) {
      homeworks = await Homework.find(params).populate("lessonId");
    } else if (populate?.studentId) {
      homeworks = await Homework.find(params).populate("studentId");
    } else {
      homeworks = await Homework.find(params);
    }
    return res.status(200).send(homeworks);
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
