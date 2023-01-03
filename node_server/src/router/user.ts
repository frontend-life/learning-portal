import { ICourse } from "./../../../front/src/types/api";
import { Lesson } from "./../models/lesson";
import { tlgSendMessage } from "./../service/axios";
import express from "express";

import { User, IUser } from "./../models/user";
import {
  comparePasswords,
  generateAuthToken,
  generatePassword,
} from "../service/auth";
import { auth } from "../middleware/auth";
import { signupUserDTO } from "../dto/signupUserDTO";
import { signinUserDTO } from "../dto/signinUserDTO";
import {
  sendLessonsDoneToUser,
  sendLessonsOpenToUser,
  sendNewUserDataToUser,
} from "./events/events";
import { createMarkdown } from "../service/telegram";
import { Homework } from "../models/homework";
import { Roles } from "../../../shared/commonParts";

const router = express.Router();

const EACH_LESSON_PAY_UP_MONTHLY = 5000;

router.post("/user/signup", async (req, res) => {
  const dto = req.body as signupUserDTO;
  const userExists = await User.findOne({ email: dto.email });
  if (userExists) {
    return res.status(400).send({
      message: "User exists!",
    });
  }
  try {
    const password = await generatePassword(dto.password);
    const user = {
      ...dto,
      roles: [Roles.STUDENT],
      password,
    };
    const createdUser = new User(user);
    await createdUser.save();
    return res.status(201).send({ user: createdUser });
  } catch (error) {
    return res.status(400).send({ message: "Smth went wrong" });
  }
});

router.post("/user/signin", async (req, res) => {
  const dto = req.body as signinUserDTO;
  const [user] = await User.find({ email: dto.email });
  if (!user) {
    return res.status(404).send({
      message: "User not found!",
    });
  }
  try {
    const isCorrectPassword = await comparePasswords(
      dto.password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(400).send({
        message: "email or password incorrect!",
      });
    }
    const authToken = generateAuthToken(user._id.toString());
    return res.status(200).send({ authToken, user });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/user/me", auth, async (req, res) => {
  return res.status(200).send(req.user);
});

router.get("/user/users", auth, async (req, res) => {
  const { search } = req.query;
  let users: IUser[] = [];
  if (search) {
    users = await User.find({});
    users = users?.filter((u) =>
      u.name.toLowerCase().includes((search as string).toLowerCase())
    );
  } else {
    users = await User.find({});
  }

  // const secureUsers: Omit<IUser, "password">[] = users.map((u) => {
  //   const { password, ...newU } = u;
  //   console.log(newU);
  //   return newU;
  // });
  return res.status(200).send(users);
});

router.post("/user/open", auth, async (req, res) => {
  const { userId, lessonId } = req.body as { userId: string; lessonId: string };
  const [user] = await User.find({ _id: userId });

  let newOpenedLessonsList = [...user.lessonsOpen.map((id) => id.toString())];
  newOpenedLessonsList.push(lessonId);
  newOpenedLessonsList = Array.from(new Set(newOpenedLessonsList));

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { lessonsOpen: newOpenedLessonsList },
    {
      new: true,
    }
  );
  sendLessonsOpenToUser(userId, newOpenedLessonsList);

  return res.status(200).send(result);
});
router.post("/user/close", auth, async (req, res) => {
  const { userId, lessonId } = req.body as { userId: string; lessonId: string };
  const [user] = await User.find({ _id: userId });

  let newOpenedLessonsList = user.lessonsOpen.filter(
    (id) => id.toString() !== lessonId
  );

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { lessonsOpen: newOpenedLessonsList },
    {
      new: true,
    }
  );
  sendLessonsOpenToUser(userId, newOpenedLessonsList);

  return res.status(200).send(result);
});
router.post("/user/done", auth, async (req, res) => {
  const { userId, lessonId } = req.body as { userId: string; lessonId: string };

  const [user] = await User.find({ _id: userId });
  if (!user) {
    res.send(404).send();
  }

  let newLessonsList = [...user.lessonsDone.map((id) => id.toString())];
  newLessonsList.push(lessonId);
  newLessonsList = Array.from(new Set(newLessonsList));

  const newSalary = user.salary + EACH_LESSON_PAY_UP_MONTHLY;

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { lessonsDone: newLessonsList, salary: newSalary },
    {
      new: true,
    }
  );

  const homework = await Homework.findOneAndUpdate(
    {
      lessonId,
      studentId: userId,
    },
    {
      approved: true,
    },
    {
      new: true,
    }
  );

  sendLessonsDoneToUser(userId, newLessonsList);
  sendNewUserDataToUser(userId, result);
  notificateThroughTlg(result as IUser, lessonId, "DONE");

  return res.status(200).send(result);
});
router.post("/user/notdone", auth, async (req, res) => {
  const { userId, lessonId } = req.body as { userId: string; lessonId: string };
  const [user] = await User.find({ _id: userId });
  if (!user) {
    res.send(404).send();
  }

  let newLessonsList = user.lessonsDone.filter(
    (id) => id.toString() !== lessonId
  );

  let newSalary = user.salary - EACH_LESSON_PAY_UP_MONTHLY;
  newSalary = newSalary < 0 ? 0 : newSalary;

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { lessonsDone: newLessonsList, salary: newSalary },
    {
      new: true,
    }
  );

  await Homework.findOneAndUpdate(
    {
      lessonId,
      studentId: userId,
    },
    {
      approved: false,
    }
  );

  sendLessonsDoneToUser(userId, newLessonsList);
  sendNewUserDataToUser(userId, result);
  notificateThroughTlg(result as IUser, lessonId, "NOT DONE");

  return res.status(200).send(result);
});

type Notification = "DONE" | "NOT DONE";
async function notificateThroughTlg(
  user: IUser,
  lessonId: string,
  type: Notification
) {
  if (user.telegramChatId) {
    const lesson = await Lesson.findById(lessonId).populate("course");
    if (!lesson) return;

    const { title, course } = lesson;
    const text = `
_Your homework was mark ${type}_ 

Lesson\\: ${title}
Course\\: ${(course as ICourse).title}

Your salary now: ${user.salary}

${createMarkdown.lessonLink(lessonId, user._id)}
`;
    tlgSendMessage({
      chat_id: user?.telegramChatId,
      text,
    });
  }
}

export default router;
