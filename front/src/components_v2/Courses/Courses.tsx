import s from './Courses.module.css';

const mock = [
    {
        id: 0,
        title: 'HTML'
    },
    {
        id: 1,
        title: 'CSS'
    },
    {
        id: 2,
        title: 'React'
    }
];

export const Courses = () => {
    return (
        <>
            <div className={s.root} style={{ width: '250px' }}>
                <div className={s.horizontal}>
                    {[...mock, ...mock, ...mock].map((item) => {
                        return (
                            <div key={item.id} className={s.courseItem}>
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
