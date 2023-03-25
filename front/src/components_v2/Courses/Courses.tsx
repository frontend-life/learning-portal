import { cls } from '@utils/css';
import s from './Courses.module.css';

export const Courses = ({ courses, onClick, currentId }) => {
    return (
        <>
            <div className={s.root} style={{ width: '250px' }}>
                <div className={s.horizontal}>
                    {courses.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={cls(s.courseItem, {
                                    [s.courseItemSelected]:
                                        currentId === item.id
                                })}
                                onClick={() => onClick(item.id)}
                            >
                                <div className={s.square} />
                                <span>{item.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <span className={s.desc}>Scrollable</span>
        </>
    );
};
