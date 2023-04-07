import express from "express";

import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { isValidObjectId } from "mongoose";
import { User } from "../models/user";
import { telegramUser, ITelegramUser } from "../models/telegramUser"
import { telegram, T_METHODS } from "../service/axios";

interface IToken {
  _id: string;
}

const router = express.Router();

const generateAuthToken = (userId: string): string => {
  const token = jwt.sign({_id: userId}, 'thisIsSecretForToken');
  return token;
};

const decodeAuthToken = (token: string): string => {
  const decoded = jwt.verify(token, 'thisIsSecretForToken') as IToken;
  return decoded._id;
};



router.post('/telegramAuth', async (req, res) => {
  try {
    const data = req.body; 

    const userExists = await telegramUser.findOne({id: data.id})
    if (userExists) {
      return res.status(201).send({
        state: 1,
        user: data
      })
    }
    
    const createdUser = new telegramUser(data);
    await createdUser.save();

    const authToken = generateAuthToken(createdUser.id.toString());

    return res.status(201).send({
      state: 2, 
      token: authToken,
      user: createdUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

router.get('/myself', async (req: Request, res: Response) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if(!token) {
          
          return res.status(401).json({
              message: 'Unauthorized because no token'
          });
      }
      const userId = decodeAuthToken(token);
      const user = await telegramUser.findOne({id: Number(userId)});
      if(!user) {
          return res.status(401).json({
              message: 'Unauthorized because no user from token'
          });
      }
      return res.status(200).send(user);
  } catch (error) {
      res.status(401).send({error: "Wrong token!"});
  }
});
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
