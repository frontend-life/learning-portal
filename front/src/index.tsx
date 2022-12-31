import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserDetailsProvider from './store/UserDetails';
import LessonsProvider from './store/LessonsContext';

declare global {
    interface Window {
        lang: 'ru' | 'eng';
    }
}
// Later need to make mechanizm for this to change langs in UI
window.lang = 'eng';

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
