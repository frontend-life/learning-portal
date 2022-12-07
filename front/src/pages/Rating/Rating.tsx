import { useRef } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import { IUser } from '../../types/api';
import { useGetArrayData } from '../../utils/hooks';
import s from './Rating.module.css';

const testDAta = () => {
    const arr: {
        _id: number;
        salary: number;
        name: string;
    }[] = [];
    for (let index = 0; index < 50; index++) {
        const element = {
            _id: index,
            salary: index * 1000,
            name: 'Random name' + Math.random().toFixed(2)
        };
        // @ts-ignore
        arr.push(element);
    }
    return arr;
};

export const Rating = () => {
    const { data, loading } = useGetArrayData<IUser[]>('/user/users');
    const ref = useRef<HTMLDivElement>(null);

    if (loading) {
        return <CircleLoader inCenterOfBlock />;
    }
    const findMe = () => {
        if (!ref.current) {
            return;
        }

        const row = document.getElementById('30');
        row?.scrollIntoView();
    };

    return (
        <div ref={ref} className={s.root}>
            <button onClick={findMe}>FIND ME</button>
            {testDAta()
                .sort((a, b) => b.salary - a.salary)
                .map((u) => {
                    return (
                        <p
                            id={u._id.toString()}
                            key={u._id}
                            style={{ padding: '20px 40px', fontSize: '40px' }}
                        >
                            {u.name}
                            <span
                                style={{ marginLeft: '40px', color: 'green' }}
                            >{`${u.salary} $/month`}</span>
                        </p>
                    );
                })}
        </div>
    );
};
