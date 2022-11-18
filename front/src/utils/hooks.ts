import { useState, useEffect } from 'react';
import { myRequest } from './axios';

export function useGetArrayData<DataType>(url: string) {
    const [d, setD] = useState<DataType>();
    const [ls, setLs] = useState(true);

    useEffect(() => {
        myRequest
            .get(url)
            .then((data) => {
                setD(data as unknown as DataType);
            })
            .finally(() => {
                setLs(false);
            });
    }, []);

    return { loading: ls, data: d, setData: setD };
}
