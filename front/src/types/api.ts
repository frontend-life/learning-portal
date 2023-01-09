import {
    HomeworkCommon,
    MessageCommon,
    CourseCommon,
    LessonCommon
} from '../../../shared/commonParts';

export interface ILesson extends LessonCommon {}

export interface ICourse extends CourseCommon {}

export enum Roles {
    TEACHER = 0,
    STUDENT = 1
}

export interface IUser {
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

export interface IHomework extends HomeworkCommon {}

export interface IMessage extends Omit<MessageCommon, '_id' | 'createdAt'> {}
