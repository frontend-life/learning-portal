import express from "express";

import { Lesson } from './../models/lesson';
import { auth } from "../middleware/auth";
import { createLessonDTO } from "../dto/createLessonDTO";

const router = express.Router();

router.post('/lesson/create', auth, async (req, res) => {
    const dto = req.body as createLessonDTO;
    const lesson = new Lesson({
        ...dto,
        owner: req.user._id
    });
    try {
        lesson.save();
        return res.status(201).send({lesson});
    } catch (error) {
        return res.status(400).send();
    }
});

router.get('/lesson/lessons', auth, async (req, res) => {
    try {
        const lessons = await Lesson.find({ owner: req.user._id });
        return res.status(200).send(lessons);
    } catch (error) {
        return res.status(500).send();
    }
});

export default router;