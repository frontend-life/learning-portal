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

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    salary: number;
    lessonsDone: string[];
    lessonsOpen: string[];
}
