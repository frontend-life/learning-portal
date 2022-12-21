import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';

import { MenuSvg } from './menuSvg';
import s from './TopRightMenu.module.css';
import { useLogout } from '../../utils/auth';

const items = [
    {
        text: 'Sign In',
        link: PATHS.signin
    },
    {
        text: 'Sign Up',
        link: PATHS.signup
    },
    {
        text: 'Lessons',
        link: PATHS.lessons
    },
    {
        text: 'Profile',
        link: PATHS.profile
    },
    {
        text: 'add lesson',
        link: PATHS.add_lesson
    },
    {
        text: 'students',
        link: PATHS.students
    },
    {
        text: 'ratings',
        link: PATHS.rating
    },
    {
        text: 'Log Out'
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
