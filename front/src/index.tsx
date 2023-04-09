import ReactDOM from 'react-dom/client';

import UserDetailsProvider from './store/UserDetails';
import LessonsProvider from './store/LessonsContext';
import App from '@app/App';

import './index.css';

declare global {
    interface Window {
        lang: 'ru' | 'eng';
    }
}
// Later need to make mechanizm for this to change langs in UI
window.lang = 'eng';

console.log('test');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <UserDetailsProvider>
        {/* <LessonsProvider> */}
            <App />
        {/* </LessonsProvider> */}
    </UserDetailsProvider>
);
