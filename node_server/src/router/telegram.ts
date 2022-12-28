import express from "express";

import { isValidObjectId } from "mongoose";
import { User } from "../models/user";
import { telegram, T_METHODS } from "../service/axios";

const router = express.Router();
/** 
   * Example of telegram update object
   * {
        update_id: 46272083,
        message: {
          message_id: 54,
          from: {
            id: 794272343,
            is_bot: false,
            first_name: 'Serg',
            last_name: 'Pril',
            username: 'TheLABL',
            language_code: 'en'
          },
          chat: {
            id: 794272343,
            first_name: 'Serg',
            last_name: 'Pril',
            username: 'TheLABL',
            type: 'private'
          },
          date: 1672184012,
          text: 'wefwef'
        }
      }
   * 
  */
router.post("/telegramUpdates", async (req, res) => {
  const chatId = req?.body?.message?.chat?.id;
  const text = req?.body?.message?.text;
  const [phrase, id] = text.split(" ");

  if (phrase === "ICan" && isValidObjectId(id)) {
    try {
      const userExists = await User.findOneAndUpdate(
        { _id: id },
        {
          telegramChatId: chatId,
        },
        {
          new: true,
        }
      );
      console.log("User telegram was saved ", chatId, userExists);
      telegram
        .post(T_METHODS.SEND_MESSAGE, {
          chat_id: chatId,
          parse_mode: "MarkdownV2",
          text: "Success\\! Now, you will got notifications about homeworks here \\(if server is alive\\)",
        })
        .catch(console.log);
    } catch {
      telegram
        .post(T_METHODS.SEND_MESSAGE, {
          chat_id: chatId,
          parse_mode: "MarkdownV2",
          text: "Sorry, incorrect",
        })
        .catch(console.log);
      console.log("User telegram saving was failed");
    }
  } else {
    telegram
      .post(T_METHODS.SEND_MESSAGE, {
        chat_id: chatId,
        parse_mode: "MarkdownV2",
        text: "Sorry, incorrect",
      })
      .catch(console.log);
  }

  res.status(200).send();
});

export default router;
