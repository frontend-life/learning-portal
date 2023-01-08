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
  messages: string[];
}

export interface UserCommon {
  id: string;
  name: string;
  email: string;
  password: string;
  salary: number;
  lessonsDone: string[];
  lessonsOpen: string[];
  roles: Roles[];
  telegramChatId: number;
}

export type PopulatedHomework = Omit<
  HomeworkCommon,
  "studentId" | "lessonId"
> & {
  studentId: any; // TODO: change type to normal
  lessonId: any; // TODO: change type to normal
};

export interface CourseCommon {
  _id: string;
  title: string;
  order: number;
}
