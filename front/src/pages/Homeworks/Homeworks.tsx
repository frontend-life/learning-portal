import { PopulatedHomework } from '@commonTypes';
import { API_ROUTES } from '@utils/axios';
import { createContext, useContext } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { useGetArrayData } from '@utils/hooks';
import { List } from './components/List/List';
import { View } from './components/View/View';
import s from './Homeworks.module.css';

const HomeworksContext = createContext(
    {} as { reload: ReturnType<typeof useGetArrayData>['reload'] }
);
export const useHomeworksContext = () => useContext(HomeworksContext);

const url = `${API_ROUTES.HOMEWORK}?populate[lessonId]=1&populate[studentId]=1`;

export const Homeworks = () => {
    const { loading, data, reload } = useGetArrayData<PopulatedHomework[]>(url);

    const renderContent = () => {
        return (
            <div className={s.root}>
                <div className={s.homeworksColumn}>
                    <List loading={loading} data={data} />
                </div>
                <div className={s.viewColumn}>
                    <View data={data} />
                </div>
            </div>
        );
    };

    return (
        <HomeworksContext.Provider value={{ reload: () => reload(url) }}>
            <MainBlockWrapper>
                {loading && <CircleLoader inCenterOfBlock />}
                {!loading && renderContent()}
            </MainBlockWrapper>
        </HomeworksContext.Provider>
    );
};
