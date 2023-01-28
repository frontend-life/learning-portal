import { useLogout } from '@utils/auth';
import { useEffect } from 'react';
import s from './Logout.module.css';

export const Logout = () => {
    const { logOut } = useLogout();
    useEffect(() => {
        logOut();
    }, []);
    return <div className={s.root}></div>;
};
