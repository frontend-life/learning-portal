import { PopulatedHomework } from '@commonTypes';
import { getLang } from '@utils/langs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from '../../../../components/CircleLoader/CircleLoader';
import { Switch } from '../../../../components/Switch/Switch';
import { cls } from '../../../../utils/css';
import { useParams } from '../View/hooks/useParams';
import s from './List.module.css';
import { useHomeworksSearch } from './useSearchHomeworks';

interface Props {
    loading: boolean;
    data: PopulatedHomework[];
}

export function List({ loading, data }: Props) {
    const { homeworkId, userName } = useParams();

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
                    <p>{getLang('show_approved')}</p>
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
                                [s.homeworkItemApproved]: approved,
                                [s.homeworkChosen]:
                                    homeworkId === id && userName === user
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
