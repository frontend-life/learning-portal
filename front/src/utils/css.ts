export const cls = (...selectors: string[]): string => {
    return selectors.reduce<string>((acc, s) => {
        acc += ' ' + s;
        return acc;
    }, '');
};
