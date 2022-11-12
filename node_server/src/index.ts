require("dotenv").config();
import express from "express";
import cors from "cors";

import userRouter from "./router/user";
import lessonRouter from "./router/lesson";

import("./db/mongoose");

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(lessonRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
