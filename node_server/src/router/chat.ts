import express from "express";
import { Chat, IChat } from "../models/chat";
import { Populative } from "../types";

const router = express.Router();

router
  .route("/chat")
  .post((req, res) => {
    console.log(req.body);
    console.log(
      "You want to create chat, we do nothing now on back in this case"
    );
    res.send();
  })
  .get(async (req, res) => {
    const { chatId, populate } = req.query as unknown as {
      chatId: string;
    } & Populative<IChat>;
    if (!chatId) {
      return res
        .status(400)
        .send("You need to pass chatId (string) as query parameter");
    }

    let chat: any = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send("No such chat " + chatId);
    }

    if (populate?.messages) {
      try {
        chat = await chat?.populate({
          path: "messages",
          populate: { path: "attachments" },
        });
      } catch (err) {
        console.log(err);
      }
    }

    res.status(200).send(chat);
  });

export default router;
