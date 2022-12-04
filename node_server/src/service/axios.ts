import axios from "axios";

export const telegram = axios.create({
  baseURL:
    "https://api.telegram.org/bot5965431146:AAGXWWL1YH48beGVX28fcL-OXEUFLv_qgfQ/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const T_METHODS = {
  SEND_MESSAGE: "sendMessage",
};
