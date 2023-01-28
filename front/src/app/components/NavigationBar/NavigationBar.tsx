import { useUserContext } from '@store/UserDetails';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { navigationItems } from './items';
import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
    const {
        userDetails: { isSignedIn }
    } = useUserContext();

    const items = useMemo(() => {
        if (isSignedIn) {
            return navigationItems;
        }

        return navigationItems.filter(({ isPublic }) => isPublic);
    }, [isSignedIn]);

    return (
        <nav className={styles.root}>
            {items.map(({ path, fontAwesomeIcon, isPublic }) => {
                return (
                    <Link key={path} className={styles.item} to={path}>
                        {fontAwesomeIcon ? (
                            <i className={fontAwesomeIcon}></i>
                        ) : (
                            <span>+</span>
                        )}
                        <div className={styles.itemDescription}>
                            {path.slice(1)}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
};
