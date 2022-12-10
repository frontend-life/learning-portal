import { useMemo, useRef, useState } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { SalaryCounter } from '../../components/SalaryCounter/SalaryCounter';
import { useDebounceUsersSearch } from '../../utils/hooks';
import s from './Rating.module.css';
import { RateSvg } from './svg';

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
    const [search, setSearch] = useState('');
    const { data, loadingBySearch } = useDebounceUsersSearch(search);
    const ref = useRef<HTMLDivElement>(null);

    const sortedUsers = useMemo(() => {
        return data.sort((a, b) => b.salary - a.salary);
    }, [data]);

    const onSearch = (e) => {
        setSearch(e.target.value);
    };
    const findMe = () => {
        if (!ref.current) {
            return;
        }

        const row = document.getElementById('30');
        row?.scrollIntoView();
    };

    return (
        <MainBlockWrapper
            alignSecond="flex-start"
            title={
                <header className={s.header}>
                    <div className={s.line} />
                    <h1 className={s.headline}>Rating of students</h1>
                    <div className={s.line} />
                </header>
            }
        >
            <div ref={ref} className={s.root}>
                <div className={s.search}>
                    <input
                        onChange={onSearch}
                        value={search}
                        placeholder="Search users by typing"
                    />
                    {/* <button onClick={findMe}>Find me</button> */}
                </div>
                {loadingBySearch && <CircleLoader inCenterOfBlock />}
                {!loadingBySearch &&
                    sortedUsers.map((u, index) => {
                        return (
                            <div
                                id={u._id.toString()}
                                key={u._id}
                                className={s.row}
                            >
                                <div className={s.rowIndex}>{index + 1}</div>
                                {/* <div className={s.personImg}>
                                    Ava will be here
                                </div> */}
                                {index < 3 && search === '' && <RateSvg />}
                                <p className={s.name}>{u.name}</p>
                                <div className={s.salary}>
                                    <SalaryCounter value={u.salary} />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </MainBlockWrapper>
    );
};
