import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserDetailsProvider from './store/UserDetails';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <UserDetailsProvider>
        <App />
    </UserDetailsProvider>
);
