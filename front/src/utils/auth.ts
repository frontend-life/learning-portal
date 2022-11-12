const KEY = 'authtoken';

export const signOut = () => {
    localStorage.removeItem(KEY);
};

export const setToken = (token: string) => {
    localStorage.setItem(KEY, token);
};
