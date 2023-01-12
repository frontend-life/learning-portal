import { createContext, useContext, useEffect, useState } from 'react';
import { ICourse, ILesson } from '../types/api';
import { API_ROUTES, myRequest } from '@utils/axios';
import { useUserContext } from './UserDetails';

type LessonsStore = {
    lessons: ILesson[];
    courses: ICourse[];
    setLessons: any;
    setCourses: any;
    reloadLessonsAndCourses: () => Promise<void>;
    loadingStatus: boolean;
};

const start: LessonsStore = {
    lessons: [],
    courses: [],
    setLessons: () => {},
    setCourses: () => {},
    reloadLessonsAndCourses: () => Promise.resolve(),
    loadingStatus: false
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
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

    const reloadLessonsAndCourses = () => {
        setLoadingStatus(true);
        return Promise.all([
            myRequest.get<any, ILesson[]>(API_ROUTES.LESSONS),
            myRequest.get<any, ICourse[]>(API_ROUTES.COURSE)
        ])
            .then(([lessons, courses]) => {
                setLessons(lessons);
                setCourses(courses);
            })
            .finally(() => {
                setLoadingStatus(false);
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
                reloadLessonsAndCourses,
                loadingStatus
            }}
        >
            {props.children}
        </LessonsContext.Provider>
    );
};

export default LessonsProvider;
