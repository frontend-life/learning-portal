import { cls } from '@utils/css';
import s from './Switch.module.css';

export const Switch = ({
    defaultCheck = false
}: {
    defaultCheck?: boolean;
}) => {
    return (
        <label className={s.switch}>
            <input
                className={cls(s.input, { [s.inputChecked]: defaultCheck })}
                type="checkbox"
                defaultChecked={defaultCheck}
            />
            <span className={`${s.slider} ${s.round}`}></span>
        </label>
    );
};
