import s from './Spacing.module.css';

export const Spacing = ({ height }: { height?: number }) => {
    return <div className={s.root} style={height ? { height } : {}} />;
};
