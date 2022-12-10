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
const axios_1 = require("./../service/axios");
const roles_1 = require("./../service/roles");
const express_1 = __importDefault(require("express"));
const homework_1 = require("../models/homework");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/homework", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const { hwId } = req.query;
    const saveHomeworkToHomework = hwId;
    if (saveHomeworkToHomework) {
        try {
            const hwToUpdate = yield homework_1.Homework.findOneAndUpdate({ _id: hwId }, {
                answer: Object.assign(Object.assign({}, dto), { teacherId: req.user._id }),
            }, { new: true });
            return res.status(201).send();
        }
        catch (_a) {
            return res.status(400).send();
        }
    }
    try {
        const hw = new homework_1.Homework(Object.assign(Object.assign({}, dto), { studentId: req.user._id }));
        const sentHw = yield hw.save();
        try {
            const messageToMe = `
      _New homework from ${req.user.name}_ 
      
      http://localhost:3000/lesson?lessonId\\=${dto.lessonId}&studentId\\=${req.user._id}
      [inline URL which will bi clickable](http://here-should-be-host.something/lesson?lessonId=${dto.lessonId}&studentId=${req.user._id})
      `;
            axios_1.telegram
                .post(axios_1.T_METHODS.SEND_MESSAGE, {
                chat_id: 794272343,
                parse_mode: "MarkdownV2",
                text: messageToMe,
            })
                .catch(console.log);
        }
        catch (_b) {
            console.log("Telegram send to me hw is lost");
        }
        return res.status(201).send({ homework: sentHw });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.get("/homeworksByLessonId", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId, studentId } = req.query;
    const { _id, roles = [] } = req.user;
    if (studentId === _id.toString() || roles.includes(roles_1.Roles.TEACHER)) {
        try {
            const hws = yield homework_1.Homework.find({
                lessonId: lessonId,
                studentId: studentId,
            })
                .populate("content.attachments")
                .populate("answer.content.attachments");
            return res.status(200).send(hws);
        }
        catch (error) {
            return res.status(500).send();
        }
    }
    console.log("This is not allowed request");
    return res.status(200).send([]);
}));
exports.default = router;
