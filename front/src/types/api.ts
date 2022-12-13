export interface ILesson {
    description: string;
    homework: string;
    link: string;
    title: string;
    course: string;
    _id: string;
}

export interface ICourse {
    _id: string;
    title: string;
    course: string;
    owner: string;
}

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
}

export interface IHomework {
    // _id: string;
    content: {
        text: string;
        attachments?: string[];
    };
    // studentId: string;
    lessonId: string;
}
