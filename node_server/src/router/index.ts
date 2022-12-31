import { Router } from "express";

import userRouter from "./user";
import lessonRouter from "./lesson";
import courseRouter from "./course";
import homeworkRouter from "./homework";
import attachRouter from "./attachments";
import telegramRouter from "./telegram";
import messageRouter from "./message";
import chatRouter from "./chat";

import { eventsHandler } from "./events";

const router = Router();

router.use(userRouter);
router.use(lessonRouter);
router.use(courseRouter);
router.use(homeworkRouter);
router.use(attachRouter);
router.use(telegramRouter);
router.use(messageRouter);
router.use(chatRouter);

router.get("/events", eventsHandler);

export default router;
