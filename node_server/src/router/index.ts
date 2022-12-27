import { Router } from "express";

import userRouter from "./user";
import lessonRouter from "./lesson";
import courseRouter from "./course";
import homeworkRouter from "./homework";
import attachRouter from "./attachments";

import { eventsHandler } from "./events";
import { auth } from "../middleware/auth";

const router = Router();

router.use(userRouter);
router.use(lessonRouter);
router.use(courseRouter);
router.use(homeworkRouter);
router.use(attachRouter);

router.get("/events", eventsHandler);
router.get("/checkTelegramConnection", auth, (req, res) => {
  const { _id } = req.user;
  res.status(200).send(req.user);
});
router.post("/telegramUpdates", (req, res) => {
  console.log(req?.body);
  console.log(req?.url);
  res.status(200).send();
});

export default router;
