require("dotenv").config();
const express = require("express");
const cors = require("cors");
import { connectToServer, lessonsCollection } from "./db/connect.js";
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
connectToServer();

const lessonRouter = express.Router();

lessonRouter
  .route("/")
  .get(async (req, res) => {
    const lessons = await lessonsCollection().find({}).limit(50).toArray();
    return res.send(lessons);
  })
  .post(async (req, res) => {
    const result = await lessonsCollection().insertOne(req.body);
    res.json(result);
  });

app.use("/lesson", lessonRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});