import { useLayoutEffect, useRef } from 'react';
import lottie from 'lottie-web';
import drums from './drums.json';
import s from './LoadingAnimation.module.css';

type Props = {
    onEnd?: () => void;
    timeoutMS?: number;
};

export const LoadingAnimation = ({ onEnd, timeoutMS = 3000 }: Props) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }
        const animation = lottie.loadAnimation({
            container: ref.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: drums // the animation data
        });

        const timeotId = onEnd && setTimeout(onEnd, timeoutMS);
        return () => {
            timeotId && clearTimeout(timeotId);
            animation && animation.destroy();
        };
    }, []);

    return (
        <div className={s.container}>
            <div className={s.root} ref={ref}></div>
        </div>
    );
};
