import { ROUTES } from "../utils";
import express from "express";

import { User, IUser } from "./../models/user";
import { Course, ICourse } from "../models/course";
import { auth } from "../middleware/auth";
import { sendLessonsOpenToUser } from "./events/events";

const router = express.Router();

router.post(ROUTES.OPEN_COURSE, auth, async (req, res) => {
  const { courseId, userId } = req.body;
  if (!courseId || !userId) {
    return res.status(400).send("No one of parameters");
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(500).send("Didn't find this course");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).send("Didn't find this user");
    }

    let newLessonsOpened = [...user.lessonsOpen, ...course.lessonsOrder];
    newLessonsOpened = Array.from(new Set(newLessonsOpened));
    user.lessonsOpen = newLessonsOpened;

    const updatedUser = await user.save();
    sendLessonsOpenToUser(user._id, newLessonsOpened);

    return res.status(201).send(updatedUser);
  } catch (error) {
    return res.status(500).send();
  }
});

router.post(ROUTES.CLOSE_COURSE, auth, async (req, res) => {
  const { courseId, userId } = req.body;
  if (!courseId || !userId) {
    return res.status(400).send("No one of parameters");
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(500).send("Didn't find this course");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).send("Didn't find this user");
    }

    let newLessonsOpened = user.lessonsOpen.filter((lessonId) => {
      return !course.lessonsOrder.includes(lessonId);
    });
    user.lessonsOpen = newLessonsOpened;

    const updatedUser = await user.save();
    sendLessonsOpenToUser(user._id, newLessonsOpened);

    return res.status(201).send(updatedUser);
  } catch (error) {
    return res.status(500).send();
  }
});

router.post(ROUTES.COURSE, auth, async (req, res) => {
  const dto = req.body as ICourse;
  const course = new Course({
    ...dto,
    // @ts-ignore
    owner: req.user._id,
  });
  try {
    course.save();
    return res.status(201).send({ course });
  } catch (error) {
    return res.status(400).send();
  }
});

router.put(ROUTES.COURSE, auth, async (req, res) => {
  const { _id, ...dto } = req.body as ICourse;

  let doc;
  try {
    doc = await Course.findById(_id);
  } catch (e) {
    console.log(e);
  }

  if (!doc) {
    return res.status(404).send();
  }
  Object.assign(doc, dto);
  try {
    const updatedCourse = await doc.save();
    return res.status(201).send(updatedCourse);
  } catch (error) {
    return res.status(400).send();
  }
});

router.get(ROUTES.COURSE, auth, async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).send(course);
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
