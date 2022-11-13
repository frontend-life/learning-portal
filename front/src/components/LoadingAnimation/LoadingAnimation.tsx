import { useLayoutEffect, useRef } from 'react';
// import lottie from 'lottie-web';
// import drums from './drums.json';
import s from './LoadingAnimation.module.css';
import '@dotlottie/player-component';

type Props = {
    onEnd?: () => void;
    timeoutMS?: number;
};

export const LoadingAnimation = ({ onEnd, timeoutMS = 1000 }: Props) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        const timeotId = onEnd && setTimeout(onEnd, timeoutMS);
        return () => {
            timeotId && clearTimeout(timeotId);
        };
    }, []);

    return (
        <div className={s.container}>
            <div className={s.root} ref={ref}>
                <dotlottie-player
                    src="/dot_drums.lottie" // in public folder
                    autoplay
                    loop
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
        </div>
    );
};
