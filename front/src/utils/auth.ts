const KEY = 'authtoken';

export const clearToken = () => {
    localStorage.removeItem(KEY);
};

export const setToken = (token: string) => {
    localStorage.setItem(KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(KEY);
};
