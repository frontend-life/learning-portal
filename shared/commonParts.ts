// Prefix for frontend /api added in interceptor of axios
export interface API_URLS {
  SIGN_IN: `/user/signin`;
  SIGN_UP: `/user/signup`;
  LESSONS: `/lesson/lessons`;
  LESSON: `/lesson`;
  COURSE: `/course`;
  OPEN_COURSE: `/course/open_all_lessons`;
  CLOSE_COURSE: `/course/close_all_lessons`;
  ME: "/user/me";
  HOMEWORK: "/homework";
  CHAT: "/chat";
  MESSAGE: "/message";
  LESSON_CREATE: "/lesson/create";
  ATTACHMENT: "/attachment";
  SPACE: "/space";
  USER_LESSON_DONE: "/user/done";
  USER_LESSON_NOT_DONE: "/user/notdone";
  USER_LESSON_OPEN: "/user/open";
  USER_LESSON_CLOSE: "/user/close";
  USERS: "/user/users";
}

export enum Roles {
  TEACHER = 0,
  STUDENT = 1,
}

export interface AttachmentCommon {
  _id: string;
  name?: string;
  user_id?: string;
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
  participants: string[];
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

export /**
 * Populated types
 * */

type PopulatedHomework = Omit<HomeworkCommon, "studentId" | "lessonId"> & {
  studentId: Partial<UserCommon>;
  lessonId: Partial<LessonCommon>;
};

export type PopulatedLessonWithCourse = Omit<LessonCommon, "course"> & {
  course: CourseCommon;
};

// Request Response

export interface ReqBodySpacePut {
  user_id: string;
  file_name: string;
  file_type: string;
}
