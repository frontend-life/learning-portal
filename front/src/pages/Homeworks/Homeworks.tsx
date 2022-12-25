import { useLocation, useNavigate } from 'react-router-dom';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import s from './Homeworks.module.css';

type HomeworkItem = {
    id: number;
    user: string;
    lesson: string;
};

const homeworks: Array<HomeworkItem> = [
    {
        id: 1,
        user: 'Test',
        lesson: '1 lesson html'
    },
    {
        id: 2,
        user: 'Test',
        lesson: '2 lesson html'
    },
    {
        id: 3,
        user: 'Test2222',
        lesson: '1 lesson html'
    }
];

export const Homeworks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <MainBlockWrapper>
            <div className={s.root}>
                <div className={s.homeworksColumn}>
                    <div className={s.search}>
                        <input
                            className={s.searchInput}
                            placeholder="Search by user name"
                        />
                        <input
                            className={s.searchInput}
                            placeholder="Search by lesson name"
                        />
                    </div>
                    <div className={s.homeworksList}>
                        {homeworks.map((homework) => {
                            const { id, lesson, user } = homework;
                            return (
                                <div
                                    key={id}
                                    className={s.homeworkItem}
                                    onClick={() => {
                                        navigate(
                                            `/homeworks?lesson=${id}&user=${user}`
                                        );
                                    }}
                                >
                                    <p>{user}</p>
                                    <p>{lesson}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={s.viewColumn}>
                    <div className={s.lessonColumn}>{location.search}</div>
                    <div className={s.chatColumn}>{location.search}</div>
                </div>
            </div>
        </MainBlockWrapper>
    );
};
