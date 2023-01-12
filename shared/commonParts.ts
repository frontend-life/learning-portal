// Prefix for frontend /api added in interceptor of axios
export interface API_URLS {
  SIGN_IN: `/user/signin`;
  SIGN_UP: `/user/signup`;
  LESSONS: `/lesson/lessons`;
  LESSON: `/lesson`;
  COURSE: `/course`;
  ME: "/user/me";
  HOMEWORK: "/homework";
  CHAT: "/chat";
  MESSAGE: "/message";
  LESSON_CREATE: "/lesson/create";
  ATTACHMENT: "/attachment";
}

export enum Roles {
  TEACHER = 0,
  STUDENT = 1,
}

export interface AttachmentCommon {
  _id: string;
  path: string;
}

export interface MessageCommon<AttachType = AttachmentCommon> {
  _id: string;
  senderId: string;
  text: string;
  chatId?: string;
  attachments?: Array<AttachType>;
  createdAt?: string;
}

export interface HomeworkCommon {
  _id: string;
  studentId: string;
  lessonId: string;
  chatId?: string;
  approved: boolean;
}
export interface ChatCommon {
  _id: string;
  messages: string[];
}

export interface LessonCommon {
  _id: string;
  title: string;
  description?: string;
  homework?: string;
  link?: string;
  course: string;
  homeworkAttachments?: string[];
  iframeGoogleDocs?: string;
}

export interface UserCommon {
  _id: string;
  name: string;
  email: string;
  password: string;
  salary: number;
  lessonsDone: string[];
  lessonsOpen: string[];
  roles: Roles[];
  telegramChatId: number;
}

export interface CourseCommon {
  _id: string;
  title: string;
  order: number;
  lessonsOrder: string[];
}

/**
 * Populated types
 * */

export type PopulatedHomework = Omit<
  HomeworkCommon,
  "studentId" | "lessonId"
> & {
  studentId: Partial<UserCommon>;
  lessonId: Partial<LessonCommon>;
};

export type PopulatedLessonWithCourse = Omit<LessonCommon, "course"> & {
  course: CourseCommon;
};
