import { cls } from '@utils/css';
import s from './Switch.module.css';

export const Switch = ({
    defaultCheck = false,
    disabled
}: {
    defaultCheck?: boolean;
    disabled?: boolean;
}) => {
    return (
        <label
            className={cls(s.switch, {
                [s.switchDisabled]: Boolean(disabled)
            })}
        >
            <input
                className={cls(s.input, { [s.inputChecked]: defaultCheck })}
                type="checkbox"
                defaultChecked={defaultCheck}
            />
            <span className={`${s.slider} ${s.round}`}></span>
        </label>
    );
};
