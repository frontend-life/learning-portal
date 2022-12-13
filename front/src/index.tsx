import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserDetailsProvider from './store/UserDetails';
import LessonsProvider from './store/LessonsContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <UserDetailsProvider>
        <LessonsProvider>
            <App />
        </LessonsProvider>
    </UserDetailsProvider>
);
