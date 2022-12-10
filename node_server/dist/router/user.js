"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./../models/user");
const auth_1 = require("../service/auth");
const auth_2 = require("../middleware/auth");
const events_1 = require("./events");
const roles_1 = require("../service/roles");
const router = express_1.default.Router();
const EACH_LESSON_PAY_UP_MONTHLY = 5000;
router.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const userExists = yield user_1.User.findOne({ email: dto.email });
    if (userExists) {
        return res.status(400).send({
            message: "User exists!",
        });
    }
    try {
        const password = yield (0, auth_1.generatePassword)(dto.password);
        const user = Object.assign(Object.assign({}, dto), { roles: [roles_1.Roles.STUDENT], password });
        const createdUser = new user_1.User(user);
        yield createdUser.save();
        return res.status(201).send({ user: createdUser });
    }
    catch (error) {
        return res.status(400).send({ message: "Smth went wrong" });
    }
}));
router.post("/user/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const [user] = yield user_1.User.find({ email: dto.email });
    if (!user) {
        return res.status(404).send({
            message: "User not found!",
        });
    }
    try {
        const isCorrectPassword = yield (0, auth_1.comparePasswords)(dto.password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).send({
                message: "email or password incorrect!",
            });
        }
        const authToken = (0, auth_1.generateAuthToken)(user._id.toString());
        return res.status(200).send({ authToken, user });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.get("/user/me", auth_2.auth, (req, res) => {
    return res.status(200).send(req.user);
});
router.get("/user/users", auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    let users = [];
    if (search) {
        users = yield user_1.User.find({});
        users = users === null || users === void 0 ? void 0 : users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
    }
    else {
        users = yield user_1.User.find({});
    }
    // const secureUsers: Omit<IUser, "password">[] = users.map((u) => {
    //   const { password, ...newU } = u;
    //   console.log(newU);
    //   return newU;
    // });
    return res.status(200).send(users);
}));
router.post("/user/open", auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.body;
    const [user] = yield user_1.User.find({ _id: userId });
    let newOpenedLessonsList = [...user.lessonsOpen.map((id) => id.toString())];
    newOpenedLessonsList.push(lessonId);
    newOpenedLessonsList = Array.from(new Set(newOpenedLessonsList));
    const result = yield user_1.User.findOneAndUpdate({ _id: userId }, { lessonsOpen: newOpenedLessonsList }, {
        new: true,
    });
    (0, events_1.sendLessonsOpenToUser)(userId, newOpenedLessonsList);
    return res.status(200).send(result);
}));
router.post("/user/close", auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.body;
    const [user] = yield user_1.User.find({ _id: userId });
    let newOpenedLessonsList = user.lessonsOpen.filter((id) => id.toString() !== lessonId);
    const result = yield user_1.User.findOneAndUpdate({ _id: userId }, { lessonsOpen: newOpenedLessonsList }, {
        new: true,
    });
    (0, events_1.sendLessonsOpenToUser)(userId, newOpenedLessonsList);
    return res.status(200).send(result);
}));
router.post("/user/done", auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.body;
    const [user] = yield user_1.User.find({ _id: userId });
    let newLessonsList = [...user.lessonsDone.map((id) => id.toString())];
    newLessonsList.push(lessonId);
    newLessonsList = Array.from(new Set(newLessonsList));
    const newSalary = user.salary + EACH_LESSON_PAY_UP_MONTHLY;
    const result = yield user_1.User.findOneAndUpdate({ _id: userId }, { lessonsDone: newLessonsList, salary: newSalary }, {
        new: true,
    });
    (0, events_1.sendLessonsDoneToUser)(userId, newLessonsList);
    (0, events_1.sendNewUserDataToUser)(userId, result);
    return res.status(200).send(result);
}));
router.post("/user/notdone", auth_2.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lessonId } = req.body;
    const [user] = yield user_1.User.find({ _id: userId });
    let newLessonsList = user.lessonsDone.filter((id) => id.toString() !== lessonId);
    let newSalary = user.salary - EACH_LESSON_PAY_UP_MONTHLY;
    newSalary = newSalary < 0 ? 0 : newSalary;
    const result = yield user_1.User.findOneAndUpdate({ _id: userId }, { lessonsDone: newLessonsList, salary: newSalary }, {
        new: true,
    });
    (0, events_1.sendLessonsDoneToUser)(userId, newLessonsList);
    (0, events_1.sendNewUserDataToUser)(userId, result);
    return res.status(200).send(result);
}));
exports.default = router;
