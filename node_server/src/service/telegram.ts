import { Message } from "./../models/message";
import { tlgSendMessage } from "./axios";
import { baseUrl } from "../utils";

export const SERGEY_CHAT_ID: number = 794272343;

export const createMarkdown = {
  lessonLink: (lessonId: string, studentId: string) =>
    `[Click to see it](${baseUrl}lesson?lessonId=${lessonId}&studentId=${studentId})`,
  homeworkLink: (homeworkId: string, userName: string) =>
    `[Click to see it](${baseUrl}homeworks?homeworkId=${homeworkId}&userName=${userName})`,
};

export const notifyMeInTelegram = (message: string) => {
  const ready_message = telegramTextFormatter(message);

  return tlgSendMessage({
    chat_id: SERGEY_CHAT_ID,
    text: ready_message,
  });
};

export const nofityAllParticipantsThroughTelegram = (
  chat_ids: number[],
  message: string
) => {
  const ready_message = telegramTextFormatter(message);

  return Promise.allSettled(
    chat_ids.map((chat_id) =>
      tlgSendMessage({
        chat_id: chat_id,
        text: "Message from chat: " + ready_message,
      })
    )
  ).catch((err) => {
    notifyMeInTelegram("nofityAllParticipantsThroughTelegram has error");
  });
};

export function telegramTextFormatter(text: string): string {
  const symbols = [
    "_",
    "*",
    "[",
    "]",
    "(",
    ")",
    "~",
    "`",
    ">",
    "#",
    "+",
    "-",
    "=",
    "|",
    "{",
    "}",
    ".",
    "!",
  ];

  const chars = text.split("");
  for (let index in chars) {
    const char = chars[index];
    let symbol = symbols.find((i) => i === char);
    if (symbol) {
      chars[index] = `\\${symbol}`;
    }
  }

  const cleanText = chars.join("");

  return cleanText;
}
