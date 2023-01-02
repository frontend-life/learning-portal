import { cls } from '../../utils/css';
import s from './CircleLoader.module.css';

export const CircleLoader = ({
    inCenterOfBlock = false,
    isAbsolute = false
}: {
    inCenterOfBlock?: boolean;
    isAbsolute?: boolean;
}) => {
    const renderCircle = () => (
        <div className={s.root}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );

    if (inCenterOfBlock) {
        return (
            <div
                className={cls(s.wrapper, { [s.wrapperAbsolute]: isAbsolute })}
            >
                {renderCircle()}
            </div>
        );
    }

    return renderCircle();
};
