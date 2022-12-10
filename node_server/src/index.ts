require("dotenv").config();
import express from "express";
import cors from "cors";

import userRouter from "./router/user";
import lessonRouter from "./router/lesson";
import courseRouter from "./router/course";
import homeworkRouter from "./router/homework";
import attachRouter from "./router/attachments";
import { eventsHandler } from "./router/events";
import path from "path";

import("./db/mongoose");

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use(userRouter);
app.use(lessonRouter);
app.use(courseRouter);
app.use(homeworkRouter);
app.use(attachRouter);
app.get("/events", eventsHandler);

app.get("*", (res, req) => {
  const url = "../public/index.html";
  req.sendFile(path.join(__dirname, url));
});

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
