import express from "express";

import { Course } from "../models/course";
import { auth } from "../middleware/auth";
import { createCourseDTO } from "../dto/createCourseDTO";

const router = express.Router();

router.post("/course/create", auth, async (req, res) => {
  const dto = req.body as createCourseDTO;
  const course = new Course({
    ...dto,
    owner: req.user._id,
  });
  try {
    course.save();
    return res.status(201).send({ course });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/course/courses", auth, async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).send(course);
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
