import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/UserDetails';
import { clearToken } from '../../utils/auth';
import { PATHS } from '../../utils/paths';
import s from './LogoutButton.module.css';

export const LogoutButton = () => {
    const { setUserDetails } = useUserContext();
    const nav = useNavigate();
    const handleClick = () => {
        clearToken();
        setUserDetails((prev) => ({ ...prev, isSignedIn: false }));
        nav(PATHS.signin);
    };
    return (
        <button className={s.root} onClick={handleClick}>
            Log out
        </button>
    );
};
