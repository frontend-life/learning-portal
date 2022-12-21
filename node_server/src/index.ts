// import { telegram, T_METHODS, setOffset, getOffset } from "./service/axios";
import { auth } from "./middleware/auth";
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
app.get("/checkTelegramConnection", auth, (req, res) => {
  const { _id } = req.user;
  res.status(200).send(req.user);
});

// setInterval(() => {
//   telegram
//     .post(T_METHODS.GET_UPDATES, {
//       offset: getOffset(),
//     })
//     .then((res) => {
//       const updates = res?.data?.result || [];
//       if (updates.length === 0) {
//         console.log(updates);
//         return;
//       }
//       const offset = updates[updates.length - 1].update_id + 1;
//       setOffset(offset);
//       console.log(updates);
//     });
// }, 5000);

app.get("*", (res, req) => {
  const url = "../public/index.html";
  req.sendFile(path.join(__dirname, url));
});

console.log(process.env.NODE_ENV);

const port =
  process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
