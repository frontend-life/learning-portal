export default function testData() {
    const arr: {
        _id: number;
        salary: number;
        name: string;
    }[] = [];
    for (let index = 0; index < 50; index++) {
        const element = {
            _id: index,
            salary: index * 1000,
            name: 'Random name' + Math.random().toFixed(2)
        };
        // @ts-ignore
        arr.push(element);
    }
    return arr;
}
