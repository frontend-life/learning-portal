import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';

import { MenuSvg } from './menuSvg';
import s from './TopRightMenu.module.css';

const items = [
    {
        text: 'Войти',
        link: PATHS.signin
    },
    {
        text: 'Уроки',
        link: PATHS.lessons
    },
    {
        text: 'Рейтинг',
        link: PATHS.rating
    },
    {
        text: 'Добавить',
        link: PATHS.add_lesson
    }
];

export const TopRightMenu = () => {
    const user = useUserContext();

    return (
        <div
            className={`${s.root} ${
                user.userDetails.isSignedIn && s.rootVisible
            }`}
        >
            <MenuSvg />
            <div className={s.menu}>
                {items.map((i) => {
                    return (
                        <Link key={i.link} className={s.item} to={i.link}>
                            {i.text}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
