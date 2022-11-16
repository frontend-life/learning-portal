export interface ILesson {
    description: string;
    homework: string;
    link: string;
    title: string;
    isDone: boolean;
    isClosed: boolean;
    isOpen: boolean;
    _id: string;
}

export interface ICourse {
    _id: string;
    title: string;
    course: string;
    owner: string;
}
