import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/paths';
import { useUserContext } from '../../store/UserDetails';

import { MenuSvg } from './menuSvg';
import s from './TopRightMenu.module.css';
import { useLogout } from '../../utils/auth';
import { Roles } from '../../types/api';

const items = [
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
        link: PATHS.add_lesson,
        forTeacher: true
    },
    {
        text: 'students',
        link: PATHS.students,
        forTeacher: true
    },
    {
        text: 'ratings',
        link: PATHS.rating
    },
    {
        text: 'homeworks',
        link: PATHS.homeworks,
        forTeacher: true
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
                {items.map(({ link, forTeacher, text }) => {
                    if (
                        forTeacher &&
                        !user.userDetails.roles.includes(Roles.TEACHER)
                    ) {
                        return null;
                    }
                    if (!link) {
                        return (
                            <span
                                onClick={logOut}
                                key={text}
                                className={s.item}
                            >
                                {text}
                            </span>
                        );
                    }
                    return (
                        <Link key={link} className={s.item} to={link}>
                            {text}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
