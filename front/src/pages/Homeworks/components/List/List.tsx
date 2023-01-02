import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '../../../../components/CircleLoader/CircleLoader';
import { Switch } from '../../../../components/Switch/Switch';
import { cls } from '../../../../utils/css';
import s from './List.module.css';
import { useHomeworksSearch } from './useSearchHomeworks';

export function List({ loading, data }) {
    const navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');
    const [lessonSearch, setLessonSearch] = useState('');
    const [approvedSearch, setApprovedSearch] = useState(false);

    const homeworks = useHomeworksSearch(
        data,
        userSearch,
        lessonSearch,
        approvedSearch
    );

    const renderSearch = () => {
        return (
            <div className={s.search}>
                <input
                    className={s.searchInput}
                    placeholder="Search by user name"
                    onChange={(e) => setUserSearch(e.target.value)}
                />
                <input
                    className={s.searchInput}
                    placeholder="Search by lesson name"
                    onChange={(e) => setLessonSearch(e.target.value)}
                />
                <div
                    className={s.approveFilter}
                    onClick={() => {
                        setApprovedSearch((p) => !p);
                    }}
                >
                    <p>Show approved</p>
                    <Switch defaultCheck={approvedSearch} />
                </div>
            </div>
        );
    };

    const renderList = () => {
        return (
            <>
                {homeworks.map((homework) => {
                    const { id, lesson, user, approved } = homework;
                    return (
                        <div
                            key={id}
                            className={cls(s.homeworkItem, {
                                [s.homeworkItemApproved]: approved
                            })}
                            onClick={() => {
                                navigate(
                                    `/homeworks?homeworkId=${id}&userName=${user}`
                                );
                            }}
                        >
                            <h3>{user}</h3>
                            <p>{lesson}</p>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <>
            {renderSearch()}
            <div className={s.homeworksList}>
                {loading ? <CircleLoader inCenterOfBlock /> : renderList()}
            </div>
        </>
    );
}
