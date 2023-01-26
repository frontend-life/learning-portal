import { Link } from 'react-router-dom';
import { pages } from '@shared/constants';
import styles from './NavigationBar.module.css';

const showNav = process.env.NODE_ENV === 'development' && true;

export const NavigationBar = () => {
    if (!showNav) {
        return null;
    }

    return (
        <nav className={styles.root}>
            {pages.map(({ path }) => {
                return (
                    <Link key={path} className={styles.item} to={path}>
                        {path}
                    </Link>
                );
            })}
        </nav>
    );
};
