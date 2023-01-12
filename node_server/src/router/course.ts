import { ROUTES } from "../utils";
import express from "express";

import { Course, ICourse } from "../models/course";
import { auth } from "../middleware/auth";
import { createCourseDTO } from "../dto/createCourseDTO";

const router = express.Router();

router.post(ROUTES.COURSE, auth, async (req, res) => {
  const dto = req.body as createCourseDTO;
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

  console.log(req.body);
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
