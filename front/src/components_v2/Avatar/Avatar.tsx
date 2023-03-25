import { ImgHTMLAttributes } from 'react';

import s from './Avatar.module.css';

export const Avatar = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const src =
        props.src ||
        'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg';

    return <img className={s.root} src={src} alt="avatar" {...props} />;
};
