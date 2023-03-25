import s from './LessonListItem.module.css';
import { LockedSVG } from './LockedSVG';
import { DoneSVG } from './DoneSVG';
import { cls } from '@utils/css';

export interface LessonListItemProps {
    title: string;
    desc: string;
    status?: 'closed' | 'done' | 'important' | 'error';
    className?: string;
}

export const LessonListItem = ({
    title,
    desc,
    status,
    className
}: LessonListItemProps) => {
    return (
        <div
            className={cls(s.root, className || '', {
                [s.rootClosed]: status === 'closed',
                [s.rootImportant]: status === 'important',
                [s.rootError]: status === 'error'
            })}
        >
            <div className={s.title}>{title}</div>
            <div className={s.desc}>{desc}</div>
            <div className={s.icon}>{getIcon(status)}</div>
        </div>
    );
};

function getIcon(status: LessonListItemProps['status']) {
    switch (status) {
        case 'closed':
            return <LockedSVG />;
        case 'done':
            return <DoneSVG />;
        default:
            return null;
    }
}
