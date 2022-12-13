import s from './CircleLoader.module.css';

export const CircleLoader = ({
    inCenterOfBlock = false
}: {
    inCenterOfBlock?: boolean;
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
        return <div className={s.wrapper}>{renderCircle()}</div>;
    }

    return renderCircle();
};
