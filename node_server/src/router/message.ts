import { notifyMeInTelegram } from "./../service/telegram";
import express from "express";
import { Chat } from "../models/chat";
import { IMessage, Message } from "../models/message";
import { sendMessageToChat } from "./events/chatEvents";
import { User } from "../models/user";

const router = express.Router();

router
  .route("/message")
  .post(async (req, res) => {
    const { senderId, text, attachments, chatId } =
      req.body as Partial<IMessage>;

    if (!senderId || !text || !chatId) {
      return res.status(400).send("You missed data for message");
    }

    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(400).send("No chat " + chatId);
      }

      const new_message = new Message({
        senderId,
        text,
        attachments,
        chatId,
      });
      let saved_new_message = await new_message.save();
      saved_new_message = await saved_new_message.populate("attachments");

      chat.messages = [...chat.messages, saved_new_message._id.toString()];
      chat.participants = Array.from(new Set([...chat.participants, senderId]));

      await chat.save();

      sendMessageToChat(chatId, senderId, saved_new_message);

      try {
        const user = await User.findById(senderId);
        if (user) {
          notifyMeInTelegram(
            `${user.name} send you message: ${text || "only attachments"}`
          );
        }
      } catch {}

      res.status(201).send(saved_new_message);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  })
  .get((req, res) => {
    res.send();
  });

export default router;
