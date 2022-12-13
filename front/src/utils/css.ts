export const cls = (
    ...selectors: Array<string | Record<string, boolean>>
): string => {
    return selectors.reduce<string>((acc, s) => {
        if (typeof s === 'string') {
            acc += ' ' + s;
        } else if (typeof s === 'object') {
            Object.entries(s).forEach(([key, value]) => {
                if (value === true) {
                    acc += ' ' + key;
                }
            });
        }
        return acc;
    }, '');
};
