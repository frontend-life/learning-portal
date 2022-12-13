import { useState } from 'react';
import ReactDOM from 'react-dom';
import s from './SuccessAdd.module.css';

export const useSuccessAdd = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const turnOn = () => {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 2000);
    };
    return { isSuccess, turnOn, SuccessAdd };
};

const SuccessAdd = () => {
    return ReactDOM.createPortal(
        <div className={s.root}>
            <svg
                width="155"
                height="155"
                viewBox="0 0 155 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask
                    id="mask0_192_226"
                    style={{ maskType: 'alpha' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="155"
                    height="155"
                >
                    <rect width="155" height="155" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_192_226)">
                    <path
                        d="M64.7341 113.385L125.045 52.8729L112.38 40.0065L64.7341 87.6524L42.62 65.5383L29.9546 78.4047L64.7341 113.385ZM18.8975 155C13.6706 155 9.21422 153.157 5.52853 149.471C1.84284 145.786 0 141.329 0 136.102V19.0986C0 13.8716 1.84284 9.38176 5.52853 5.62905C9.21422 1.87635 13.6706 0 18.8975 0H135.901C141.128 0 145.618 1.87635 149.371 5.62905C153.124 9.38176 155 13.8716 155 19.0986V136.102C155 141.329 153.124 145.786 149.371 149.471C145.618 153.157 141.128 155 135.901 155H18.8975ZM18.8975 136.102H135.901V19.0986H18.8975V136.102Z"
                        fill="#66FCF1"
                    />
                </g>
            </svg>
            <span className={s.text}>Lesson uploaded</span>
        </div>,
        document.body
    );
};
