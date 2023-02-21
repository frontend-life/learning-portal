import s from './Header.module.css';

export const Header = ({title, subtitle}:{title:string, subtitle:string}) => {
    return (
        <>
            <h1 className={s.title}>{title}</h1>
            <h2 className={s.subtitle}>{subtitle}</h2>
        </>
    );
};