import { useLogout } from '../../utils/auth';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
    const { logOut } = useLogout();
    return (
        <button className={s.root} onClick={logOut}>
            Log out
        </button>
    );
};
