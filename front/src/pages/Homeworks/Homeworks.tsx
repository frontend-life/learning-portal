import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { API_URLS } from '../../utils/axios';
import { useGetArrayData } from '../../utils/hooks';
import { List } from './components/List/List';
import { View } from './components/View/View';
import s from './Homeworks.module.css';

export const Homeworks = () => {
    const { loading, data } = useGetArrayData<any>(
        `${API_URLS.HOMEWORK}?populate[lessonId]=1&populate[studentId]=1`
    );
    console.log(data);
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
        <MainBlockWrapper>
            {loading && <CircleLoader inCenterOfBlock />}
            {!loading && renderContent()}
        </MainBlockWrapper>
    );
};
