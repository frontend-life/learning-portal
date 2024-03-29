import { ROUTES } from "./../utils";
import { Course } from "./../models/course";
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
import { createMarkdown, telegramTextFormatter } from "../service/telegram";
import { Homework } from "../models/homework";
import { Roles, PopulatedLessonWithCourse } from "../../../shared/commonParts";

const router = express.Router();

const EACH_LESSON_PAY_UP = 7.7;

router.post(ROUTES.SIGN_UP, async (req, res) => {
  const dto = req.body as signupUserDTO;
  const userExists = await User.findOne({ email: dto.email });
  if (userExists) {
    return res.status(400).send({
      message: "User exists!",
    });
  }
  try {
    const password = await generatePassword(dto.password);
    const user: Partial<IUser> = {
      ...dto,
      roles: [Roles.STUDENT],
      password,
    };

    let htmlLessons: string[] = [];
    try {
      const htmlCourse = await Course.findOne({ title: "HTML" });
      htmlLessons = htmlCourse?.lessonsOrder || [];
    } catch {}

    user.lessonsOpen = htmlLessons;

    const createdUser = new User(user);
    await createdUser.save();
    return res.status(201).send({ user: createdUser });
  } catch (error) {
    return res.status(400).send({ message: "Smth went wrong" });
  }
});

router.post(ROUTES.SIGN_IN, async (req, res) => {
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

router.get(ROUTES.ME, auth, async (req, res) => {
  // @ts-ignore
  return res.status(200).send(req.user);
});

router.get(ROUTES.USERS, auth, async (req, res) => {
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

  return res.status(200).send(users);
});

router.post(ROUTES.USER_LESSON_OPEN, auth, async (req, res) => {
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
router.post(ROUTES.USER_LESSON_CLOSE, auth, async (req, res) => {
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
router.post(ROUTES.USER_LESSON_DONE, auth, async (req, res) => {
  const { userId, lessonId } = req.body as { userId: string; lessonId: string };

  const [user] = await User.find({ _id: userId });
  if (!user) {
    res.send(404).send();
  }

  let userLessonsOpen = [...user.lessonsOpen];
  try {
    const lesson = await Lesson.findById(lessonId);
    if (lesson) {
      const { course } = await lesson.populate("course");
      if (course) {
        // @ts-ignore
        const lessonIndexInCourseOrder = course.lessonsOrder.findIndex(
          (id) => id.toString() === lessonId
        );
        // @ts-ignore
        const nextLessonId = course.lessonsOrder[lessonIndexInCourseOrder + 1];
        if (nextLessonId) {
          userLessonsOpen.push(nextLessonId);
        }
      }
    }
  } catch {}

  let newLessonsList = [...user.lessonsDone.map((id) => id.toString())];
  newLessonsList.push(lessonId);
  newLessonsList = Array.from(new Set(newLessonsList));

  const newSalary = salaryHelper(user.salary, "+");

  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      lessonsDone: newLessonsList,
      lessonsOpen: userLessonsOpen,
      salary: newSalary,
    },
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

  const newSalary = salaryHelper(user.salary, "-");

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

    const { title, course } = lesson as unknown as PopulatedLessonWithCourse;
    let text = `
_Your homework was mark ${type}_ 

Lesson\\: ${title}
Course\\: ${course.title}

Your salary now: ${user.salary}

${createMarkdown.lessonLink(lessonId, user._id)}
`;

    text = telegramTextFormatter(text);
    tlgSendMessage({
      chat_id: user?.telegramChatId,
      text,
    });
  }
}

function salaryHelper(salary: number, type: "+" | "-"): number {
  if (type === "+") {
    salary = salary + EACH_LESSON_PAY_UP;
  } else {
    salary = salary - EACH_LESSON_PAY_UP;
  }

  if (salary < 0) {
    return 0;
  }

  return +salary.toFixed(2);
}

export default router;
