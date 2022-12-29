import { baseUrl } from "../utils";

export const createMarkdown = {
  lessonLink: (lessonId: string, studentId: string) =>
    `[Click to see it](${baseUrl}lesson?lessonId=${lessonId}&studentId=${studentId})`,
  homeworkLink: (homeworkId: string, userName: string) =>
    `[Click to see it](${baseUrl}homeworks?homeworkId=${homeworkId}&userName=${userName})`,
};
