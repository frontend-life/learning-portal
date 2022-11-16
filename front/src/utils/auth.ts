import { PATHS } from './paths';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../store/UserDetails';

const KEY = 'authtoken';

export const clearToken = () => {
    localStorage.removeItem(KEY);
};

export const setToken = (token: string) => {
    localStorage.setItem(KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(KEY);
};

export const useLogout = () => {
    const { setUserDetails } = useUserContext();
    const nav = useNavigate();
    const logOut = () => {
        clearToken();
        setUserDetails((prev) => ({ ...prev, isSignedIn: false }));
        nav(PATHS.signin);
    };
    return { logOut };
};
