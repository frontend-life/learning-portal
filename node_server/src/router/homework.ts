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
    return res.status(201).send({ homework: sentHw });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/homeworksByLessonId", auth, async (req, res) => {
  const { id: lessonnId } = req.query;
  try {
    const hws = await Homework.find({ lessonnId: lessonnId }).populate(
      "content.attachments"
    );
    return res.status(200).send(hws);
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
