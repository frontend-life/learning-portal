import { useState, useEffect } from 'react';
import { useUserContext } from '../store/UserDetails';
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

export const useServerEvents = () => {
    const [listening, setListening] = useState(false);
    const { userDetails, setUserDetails } = useUserContext();
    useEffect(() => {
        if (!listening && userDetails.isSignedIn) {
            const events = new EventSource(
                'http://localhost:8000/events?user_id=' + userDetails._id
            );

            events.addEventListener('message', (e) => {
                if (e.data === 'events connected') {
                    console.log(e.data);
                    return;
                }

                const parsedData = JSON.parse(e.data);
                /**
                 *  Here will be switcher of events
                 *
                 */
                if (parsedData.lessonsDone) {
                    setUserDetails((prev) => ({
                        ...prev,
                        lessonsDone: parsedData.lessonsDone
                    }));
                } else if (parsedData.lessonsOpen) {
                    setUserDetails((prev) => ({
                        ...prev,
                        lessonsOpen: parsedData.lessonsOpen
                    }));
                } else if (parsedData.userData) {
                    setUserDetails((prev) => ({
                        ...prev,
                        ...parsedData.userData
                    }));
                }
            });

            setListening(true);
        }
    }, [listening, userDetails.isSignedIn]);
};
