export function normilize(array: any[], key: string) {
    if (array.length === 0) {
        return {};
    }

    if (!array[0][key]) {
        return console.warn('In that array you have no such key ' + key);
    }

    return array.reduce((acc, element) => {
        acc[element[key]] = element;
        return acc;
    }, {});
}
