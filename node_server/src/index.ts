require("dotenv").config();
import express from "express";
import cors from "cors";

import userRouter from './router/user';
import lessonRouter from './router/lesson';

import('./db/mongoose');

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(lessonRouter);

// const lessonRouter = express.Router();

// lessonRouter
//   .route("/")
//   .get(async (req, res) => {
//     const lessons = await lessonsCollection().find({}).limit(50).toArray();
//     return res.send(lessons);
//   })
//   .post(async (req, res) => {
//     const result = await lessonsCollection().insertOne(req.body);
//     res.json(result);
//   });

// const trackRouter = express.Router();
// trackRouter
//   .route("/")
//   .get(async (req, res) => {
//     const tracks = await tracksCol().find({}).limit(50).toArray();
//     return res.send(tracks);
//   })
//   .post(async (req, res) => {
//     const result = await tracksCol().insertOne(req.body);
//     res.json(result);
//   })
//   .put(async (req, res) => {
//     console.log(req.body._id);
//     const result = await tracksCol().updateOne(
//       { "_id" : new ObjectId(req.body._id) },
//       { $set: { "track_name" : req.body.track_name } }
//     );
//     console.log(result)
//     res.json(result);
//   });;

// app.use("/lesson", lessonRouter);
// app.use("/track", trackRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/registration", async (req, res) => {
//   const { email, name, password } = req.body;
//   const dbResult = await usersCol().findOne({ email: email });
//   if (!dbResult) {
//     const result = await usersCol().insertOne(req.body);
//     const response = { ...result, ...req.body };
//     console.log(response);
//     res.json(response);
//   } else {
//     res.send("Oopps!");
//   }
//   // res.send("Hello World!");
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
