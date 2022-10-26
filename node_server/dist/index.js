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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect_js_1 = require("./db/connect.js");
const app = express();
const port = 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
(0, connect_js_1.connectToServer)();
const lessonRouter = express.Router();
lessonRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log();
    const lessons = yield (0, connect_js_1.lessonsCollection)().find({}).limit(50).toArray();
    console.log(lessons);
    return res.send(lessons);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connect_js_1.lessonsCollection)().insertOne(req.body);
    res.json(result);
}));
app.use("/lesson", lessonRouter);
app.get("/", (req, res) => {
    console.log("wefwef");
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
