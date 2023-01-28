import { cls } from '@utils/css';
import s from './CoursePanelItem.module.css';

export const CoursePanelItem = ({ isActive, onClick, children }) => {
    return (
        <div
            className={cls(s.root, {
                [s.rootActive]: isActive
            })}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
