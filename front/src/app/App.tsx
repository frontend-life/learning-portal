import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@utils/ErrorBoundary';

import styles from './App.module.css';
import { useServerEvents } from '@utils/hooks';
import { NotificationSystem } from '../components/NotificationSystem/NotificationSystem';
import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { AuthenticatedRoutes } from './components/AuthenticatedRoutes/AuthenticatedRoutes';

function App() {
    useServerEvents();

    return (
        <div className={styles.root}>
            <BrowserRouter>
                <NavigationBar />
                <div style={{ height: '100vh', overflow: 'auto', flex: 1 }}>
                    <ErrorBoundary>
                        <AuthenticatedRoutes />
                        <NotificationSystem />
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
