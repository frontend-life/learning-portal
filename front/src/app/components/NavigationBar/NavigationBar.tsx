import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { useNavItems } from './useNavItems';

export const NavigationBar = () => {
    const items = useNavItems();

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
