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
const course_1 = require("../models/course");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/course/create", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const course = new course_1.Course(Object.assign(Object.assign({}, dto), { owner: req.user._id }));
    try {
        course.save();
        return res.status(201).send({ course });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.get("/course/courses", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.Course.find();
        return res.status(200).send(course);
    }
    catch (error) {
        return res.status(500).send();
    }
}));
exports.default = router;
