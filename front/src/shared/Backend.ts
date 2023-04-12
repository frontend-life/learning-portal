import { ChatCommon } from './../../../shared/commonParts';
import { ILesson, IUser, ICourse, IMessage, ITelegramUser } from '@type/api';
import { API_ROUTES, myRequest } from '@utils/axios';
import { AxiosRequestConfig } from 'axios';
import { MessageCommon, ReqBodySpacePut } from '@commonTypes';

export class Backend {
    // dont know why i did this but lets save it here as idea

    // private static SIGN_IN = '/user/signin';
    // private static SIGN_UP = '/user/signup';
    // private static LESSONS = '/lesson/lessons';
    // private static LESSON = '/lesson';
    // private static ME = '/user/me';
    // private static HOMEWORK = '/homework';
    // private static CHAT = '/chat';
    // private static MESSAGE = '/message';
    // private static LESSON_CREATE = '/lesson/create';
    // private static ATTACHMENT = '/attachment';
    // private static COURSE = '/course';
    // private static OPEN_COURSE = '/course/open_all_lessonsn';
    // private static CLOSE_COURSE = '/course/close_all_lessons';
    // private static SPACE = '/space';

    public static get(url: string) {
        return myRequest.get(url);
    }

    public static sendTelegramAuthData = (data) => {
        return myRequest.post(API_ROUTES.TELEGRAM_AUTH, data);
        //   .catch((error) => {
        //     console.log(error); // log the error message
        //     throw error; // throw the error to the calling code
        //   });
    };

    public static signInUser = (data) => {
        return myRequest.post(API_ROUTES.SIGN_IN, data);
    };

    public static signUpUser = (data) => {
        return myRequest.post(API_ROUTES.SIGN_UP, data);
    };

    public static getMe = () => {
        // will find me by token in myRequest headers
        return myRequest.get<any, IUser>(API_ROUTES.ME);
    };

    public static getMyself = () => {
        return myRequest.get<any, ITelegramUser>(API_ROUTES.MYSELF)
    }

    public static getHomework = (config?: AxiosRequestConfig) => {
        return myRequest.get(API_ROUTES.HOMEWORK, config);
    };

    public static addHomework = (data) => {
        return myRequest.post(API_ROUTES.HOMEWORK, data);
    };

    public static updateLesson = (id: string, data) => {
        return myRequest.put(`${API_ROUTES.LESSON}?lessonId=${id}`, data);
    };

    public static createLesson = (data) => {
        return myRequest.post<any, ILesson>(API_ROUTES.LESSON_CREATE, data);
    };

    public static getAllCourses = (config?: AxiosRequestConfig) => {
        return myRequest.get(API_ROUTES.COURSE, config);
    };

    public static userLessonDone = (data: UserDoneData) => {
        return myRequest.post(API_ROUTES.USER_LESSON_DONE, data);
    };

    public static userLessonNotDone = (data: UserDoneData) => {
        return myRequest.post(API_ROUTES.USER_LESSON_NOT_DONE, data);
    };

    public static userLessonOpen = (data: UserOpenData) => {
        return myRequest.post(API_ROUTES.USER_LESSON_OPEN, data);
    };

    public static userLessonClose = (data: UserOpenData) => {
        return myRequest.post(API_ROUTES.USER_LESSON_CLOSE, data);
    };

    public static openAllCourse = (data: OpenAllCourseData) => {
        return myRequest.post<any, IUser>(API_ROUTES.OPEN_COURSE, data);
    };

    public static closeAllCourse = (data: OpenAllCourseData) => {
        return myRequest.post<any, IUser>(API_ROUTES.CLOSE_COURSE, data);
    };

    public static getSignedUrlForSaveFileToSpace = (
        data: Omit<ReqBodySpacePut, 'user_id'>
    ) => {
        return myRequest.post<any, { signedUrl: string }>(
            API_ROUTES.SPACE,
            data
        );
    };

    public static getLesson = (config?: AxiosRequestConfig) => {
        return myRequest.get(API_ROUTES.LESSON, config);
    };

    public static getLessons() {
        return myRequest.get<any, ILesson[]>(API_ROUTES.LESSONS);
    }

    public static getCourses() {
        return myRequest.get<any, ICourse[]>(API_ROUTES.COURSE);
    }

    public static updateCourse(data: Partial<ICourse> & { _id: string }) {
        return myRequest.put<any, ICourse>(API_ROUTES.COURSE, data);
    }

    public static addAttachment(data: FormData) {
        return myRequest.post(API_ROUTES.ATTACHMENT, data);
    }

    public static addMessage(data: IMessage) {
        return myRequest.post<any, MessageCommon>(API_ROUTES.MESSAGE, data);
    }

    public static getChat(config?: AxiosRequestConfig) {
        return myRequest.get<any, ChatCommon>(API_ROUTES.CHAT, config);
    }

    public static sendFileCodeToCheck(data) {
        return myRequest.post<any, any>(API_ROUTES.CODE_FILE, data);
    }
}

type UserDoneData = { lessonId: string; userId: string };
type UserOpenData = { lessonId: string; userId: string };
type OpenAllCourseData = { courseId: string; userId: string };
