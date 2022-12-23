import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '../components/LoadingAnimation/LoadingAnimation';
import { ICourse, ILesson, IUser } from '../types/api';
import { API_URLS, myRequest } from '../utils/axios';
import { useUserContext } from './UserDetails';

type LessonsStore = {
    lessons: ILesson[];
    courses: ICourse[];
    setLessons: any;
    setCourses: any;
    reloadLessonsAndCourses: () => Promise<void>;
};

const start: LessonsStore = {
    lessons: [],
    courses: [],
    setLessons: () => {},
    setCourses: () => {},
    reloadLessonsAndCourses: () => Promise.resolve()
};
const LessonsContext = createContext<LessonsStore>(start);

export const useLessonsContext = () => useContext(LessonsContext);

const LessonsProvider = (props) => {
    // this state will be shared with all components
    const {
        userDetails: { isSignedIn }
    } = useUserContext();
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);

    const reloadLessonsAndCourses = () => {
        return Promise.all([
            myRequest.get<any, ILesson[]>(API_URLS.LESSONS),
            myRequest.get<any, ICourse[]>(API_URLS.COURSES)
        ]).then(([lessons, courses]) => {
            setLessons(lessons);
            setCourses(courses);
        });
    };

    useEffect(() => {
        if (isSignedIn) {
            reloadLessonsAndCourses();
        }
    }, [isSignedIn]);

    return (
        <LessonsContext.Provider
            value={{
                lessons,
                courses,
                setLessons,
                setCourses,
                reloadLessonsAndCourses
            }}
        >
            {props.children}
        </LessonsContext.Provider>
    );
};

export default LessonsProvider;
