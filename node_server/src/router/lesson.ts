import { ROUTES } from "./../utils";
import { Course } from "./../models/course";
import express from "express";

import { Lesson, ILesson } from "./../models/lesson";
import { auth } from "../middleware/auth";
import { ObjectId } from "mongodb";
import { tlgSendMessage } from "../service/axios";
import { SERGEY_CHAT_ID } from "../service/telegram";

const router = express.Router();

router.post(ROUTES.LESSON_CREATE, auth, async (req, res) => {
  const dto = req.body as ILesson;
  const lesson = new Lesson({
    ...dto,
  });
  try {
    await lesson.save();
    try {
      await Course.findByIdAndUpdate(dto.course, {
        $push: {
          lessonsOrder: lesson._id,
        },
      });
    } catch {
      tlgSendMessage({
        chat_id: SERGEY_CHAT_ID,
        text: "Add lesson to course order error",
      });
    }

    return res.status(201).send(lesson);
  } catch (error) {
    return res.status(400).send();
  }
});

router.put(ROUTES.LESSON, auth, async (req, res) => {
  const { lessonId } = req.query;
  const dto = req.body as ILesson;

  const doc = await Lesson.findById(lessonId);
  if (!doc) {
    return res.status(404).send();
  }

  // Update courses lessonsOrder, because we need to do it if we change course in lesson
  if (dto.course.toString() !== doc.course.toString()) {
    const previousCourse = await Course.findById(dto.course.toString());
    const newCourse = await Course.findById(doc.course.toString());
    console.log(previousCourse, newCourse);
    tlgSendMessage({
      chat_id: SERGEY_CHAT_ID,
      text: `Somebody changed lesson ${lessonId} course from ${previousCourse?.title} to ${newCourse?.title}`,
    });
  }

  Object.assign(doc, dto);
  try {
    await doc.save();
    return res.status(201).send({ updatedLesson: doc });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/lesson/lessons", auth, async (req, res) => {
  try {
    const lessons = await Lesson.find();
    return res.status(200).send(lessons);
  } catch (error) {
    return res.status(500).send();
  }
});

router.get(ROUTES.LESSON, auth, async (req, res) => {
  const { lessonId } = req.query;
  if (!ObjectId.isValid(lessonId as string)) {
    return res.status(404).send();
  }
  try {
    const lesson = await Lesson.findById(lessonId).exec();
    return res.status(200).send(lesson);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.delete(ROUTES.LESSON, (req, res) => {
  // delete in Lesson
  // delete in Course.lessonsOrder
  // may not delete in users lessonsDone, lessonsOpen

  res.send("Delete not ready yet");
});

export default router;
