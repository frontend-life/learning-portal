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
                    if (!homework) {
                        return null;
                    }
                    const { _id, lessonId, studentId, approved } = homework;
                    return (
                        <div
                            key={_id}
                            className={cls(s.homeworkItem, {
                                [s.homeworkItemApproved]: approved,
                                [s.homeworkChosen]:
                                    homeworkId === _id &&
                                    userName === studentId?.name
                            })}
                            onClick={() => {
                                navigate(
                                    `/homeworks?homeworkId=${_id}&userName=${studentId?.name}`
                                );
                            }}
                        >
                            <h3>{studentId?.name}</h3>
                            <p>{lessonId?.title}</p>
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
