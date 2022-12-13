import { useEffect, useState } from 'react';
import s from './Switch.module.css';

export const Switch = ({
    defaultCheck = false
}: {
    defaultCheck?: boolean;
}) => {
    const [checked, setChecked] = useState(defaultCheck);

    const handleCheck = () => {
        setChecked((prev) => !prev);
    };

    useEffect(() => {
        setChecked(defaultCheck);
    }, [defaultCheck]);

    return (
        <label className={s.switch}>
            <input
                className={s.input}
                onClick={(e) => e.stopPropagation()}
                type="checkbox"
                checked={checked}
                onChange={handleCheck}
            />
            <span className={`${s.slider} ${s.round}`}></span>
        </label>
    );
};
