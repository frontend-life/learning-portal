export interface ILesson {
    description: string;
    homework: string;
    link: string;
    title: string;
    _id: string;
}

export interface ICourse {
    _id: string;
    title: string;
    course: string;
    owner: string;
}
