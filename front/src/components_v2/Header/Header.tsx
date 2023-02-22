import s from './Header.module.css';

export const Header = ({title, subtitle}:{title:string, subtitle:string}) => {
    return (
        <div className={s.header}>
            <h1 className={s.title}>{title}</h1>
            <h2 className={s.subtitle}>{subtitle}</h2>
        </div>
    );
};