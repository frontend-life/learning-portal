import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';

import { MenuSvg } from './menuSvg';
import s from './TopRightMenu.module.css';
import { useLogout } from '../../utils/auth';

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
    },
    {
        text: 'Выйти'
    }
];

export const TopRightMenu = () => {
    const user = useUserContext();
    const { logOut } = useLogout();

    return (
        <div
            className={`${s.root} ${
                user.userDetails.isSignedIn && s.rootVisible
            }`}
        >
            <MenuSvg />
            <div className={s.menu}>
                {items.map((i) => {
                    if (!i.link) {
                        return (
                            <span
                                onClick={logOut}
                                key={i.text}
                                className={s.item}
                            >
                                {i.text}
                            </span>
                        );
                    }
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
