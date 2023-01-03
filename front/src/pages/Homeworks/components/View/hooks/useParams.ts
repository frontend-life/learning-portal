import { qp } from '@utils/paths';
import { useLocation } from 'react-router-dom';

type Return = { homeworkId?: string; userName?: string };
export const useParams = (): Return => {
    const location = useLocation();
    return qp(location.search) as Return;
};
