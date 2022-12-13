import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '../components/LoadingAnimation/LoadingAnimation';
import { ICourse, ILesson, IUser } from '../types/api';
import { myRequest } from '../utils/axios';

type LessonsStore = {
    lessons: ILesson[];
    courses: ICourse[];
    setLessons: any;
    setCourses: any;
};

const start: LessonsStore = {
    lessons: [],
    courses: [],
    setLessons: () => {},
    setCourses: () => {}
};
const LessonsContext = createContext<LessonsStore>(start);

export const useLessonsContext = () => useContext(LessonsContext);

const LessonsProvider = (props) => {
    // this state will be shared with all components
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        Promise.all([
            myRequest.get<any, ILesson[]>('/lesson/lessons'),
            myRequest.get<any, ICourse[]>('/course/courses')
        ]).then(([lessons, courses]) => {
            setLessons(lessons);
            setCourses(courses);
        });
    }, []);

    return (
        <LessonsContext.Provider
            value={{ lessons, courses, setLessons, setCourses }}
        >
            {props.children}
        </LessonsContext.Provider>
    );
};

export default LessonsProvider;
