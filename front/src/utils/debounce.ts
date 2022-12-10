export function debounce(func: (agrs: any) => Promise<any>, time: number) {
    let timer;
    return (withoutDebounce: boolean, ...args: any) => {
        // no debouncing
        if (withoutDebounce) {
            return new Promise((res, rej) => {
                func.apply({}, args).then((result) => {
                    res(result);
                });
            });
        }

        // debouncing
        if (timer) {
            clearTimeout(timer);
        }
        return new Promise((res, rej) => {
            timer = setTimeout(() => {
                func.apply({}, args).then((result) => {
                    res(result);
                });
            }, time);
        });
    };
}
