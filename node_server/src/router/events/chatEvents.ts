import express, { Response } from "express";
import { IMessage } from "../../models/message";
import { createEventMessage } from "./utils";

const router = express.Router();

const chats: {
  [key: string]: {
    participants: Array<{ user_id: string; response: Response }>;
  };
} = {};

router.get("/chatevents", (req, res) => {
  const { chat_id, user_id } = req.query as {
    chat_id?: string;
    user_id?: string;
  };

  if (!chat_id || !user_id) {
    return res.status(404).send();
  }

  console.log("Chat events connection started");
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);
  // console.log("Events connection writeHead", headers);
  // const data = ` data: ${JSON.stringify(facts)}\n\n`;

  res.write("data: chat events connected\n\n");
  // console.log("Events connection response.write");

  const newParticipant = {
    user_id,
    response: res,
  };

  // Add user to chat subscription
  if (chats[chat_id]) {
    const { participants = [] } = chats[chat_id];
    const isNewUser = !participants.find(({ user_id: id }) => user_id === id);
    if (isNewUser) {
      chats[chat_id].participants.push(newParticipant);
    }
  } else {
    chats[chat_id] = {
      participants: [newParticipant],
    };
  }
  console.log(chats, chats[chat_id].participants.length);

  req.on("close", () => {
    console.log("Chat events connection closed");

    // Delete user from chat subscription or delete all chat
    if (chats[chat_id]) {
      chats[chat_id].participants = chats[chat_id].participants.filter(
        ({ user_id: id }) => id !== user_id
      );
      if (chats[chat_id].participants.length === 0) {
        delete chats[chat_id];
      }
    }
  });
});

export function sendMessageToChat(
  chat_id: string,
  user_id: string,
  message: IMessage
) {
  if (!chats[chat_id]) {
    return;
  }

  const { participants = [] } = chats[chat_id];

  participants.forEach(({ user_id: participant_id, response }) => {
    if (user_id !== participant_id) {
      response.write(createEventMessage(message));
    }
  });
}

export default router;
