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
const path_1 = __importDefault(require("path"));
const attachment_1 = require("../models/attachment");
const auth_1 = require("../middleware/auth");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const resizer_1 = require("../service/resizer");
const router = express_1.default.Router();
router.post("/attachment", auth_1.auth, uploadMiddleware_1.upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join(__dirname, "../../public/attachments");
    const fileUpload = new resizer_1.Resize(imagePath);
    // @ts-ignore
    if (!req.file) {
        res.status(401).json({ error: "Please provide an image" });
    }
    try {
        // @ts-ignore
        const filename = yield fileUpload.save(req.file.buffer);
        const attachDB = new attachment_1.Attachment({
            name: filename,
            path: fileUpload.filepath(filename),
        });
        const attach = yield attachDB.save();
        return res.status(200).json({ attach });
    }
    catch (error) {
        return res.status(400).send();
    }
}));
router.get("/attachment", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send();
    }
    catch (error) {
        return res.status(500).send();
    }
}));
exports.default = router;
