import axios from "axios";

export const telegram = axios.create({
  baseURL:
    "https://api.telegram.org/bot5965431146:AAGXWWL1YH48beGVX28fcL-OXEUFLv_qgfQ/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

let lastUpdateOffset: number;
export const getOffset = () => lastUpdateOffset || 0;
export const setOffset = (offset: number) => {
  lastUpdateOffset = offset;
};

export const T_METHODS = {
  SEND_MESSAGE: "sendMessage",
  GET_UPDATES: "getUpdates",
};

export const tlgSendMessage = ({
  text,
  chat_id,
}: {
  chat_id: number;
  text: string;
}) => {
  return telegram
    .post(T_METHODS.SEND_MESSAGE, {
      chat_id,
      parse_mode: "MarkdownV2",
      text,
    })
    .catch(console.log);
};
