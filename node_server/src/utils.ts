import { API_URLS } from "@commonTypes";

export const baseUrl = "https://thelabl.academy/";
export const isProd = () => process.env.NODE_ENV === "production";

export const ROUTES: API_URLS = {
  SIGN_IN: "/user/signin",
  SIGN_UP: "/user/signup",
  LESSONS: "/lesson/lessons",
  LESSON: "/lesson",
  ME: "/user/me",
  HOMEWORK: "/homework",
  CHAT: "/chat",
  MESSAGE: "/message",
  LESSON_CREATE: "/lesson/create",
  ATTACHMENT: "/attachment",
  COURSE: "/course",
  OPEN_COURSE: "/course/open_all_lessons",
  CLOSE_COURSE: "/course/close_all_lessons",
};
