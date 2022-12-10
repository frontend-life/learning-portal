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
const lesson_1 = require("./../models/lesson");
const auth_1 = require("../middleware/auth");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
router.post("/lesson/create", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const lesson = new lesson_1.Lesson(Object.assign(Object.assign({}, dto), { owner: req.user._id }));
    try {
        lesson.save();
        return res.status(201).send({ lesson });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.put("/lesson", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId } = req.query;
    const dto = req.body;
    const doc = yield lesson_1.Lesson.findById(lessonId);
    if (!doc) {
        return res.status(404).send();
    }
    Object.assign(doc, dto);
    try {
        yield doc.save();
        return res.status(201).send({ updatedLesson: doc });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.get("/lesson/lessons", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessons = yield lesson_1.Lesson.find({ owner: req.user._id });
        return res.status(200).send(lessons);
    }
    catch (error) {
        return res.status(500).send();
    }
}));
router.get("/lesson", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId } = req.query;
    if (!mongodb_1.ObjectId.isValid(lessonId)) {
        return res.status(404).send();
    }
    try {
        const lesson = yield lesson_1.Lesson.findById(lessonId).exec();
        return res.status(200).send(lesson);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}));
exports.default = router;
