import s from './CheckTask.module.css';
import { ReactComponent as CheckmarkIcon } from './assets/checkmark.svg';
import { cls } from '@utils/css';

export const CheckTask = ({ status }: { status: 'success' | 'error' }) => {
    return (
        <div
            className={cls(s.root, {
                [s.success]: status === 'success',
                [s.error]: status === 'error'
            })}
        >
            <CheckmarkIcon />
            <div className={s.text}>
                <p>{status === 'error' ? 'Error' : 'Success'}</p>
                <p>{'<h1> exists'}</p>
            </div>
        </div>
    );
};
