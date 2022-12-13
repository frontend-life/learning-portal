import { useState, useEffect, useCallback, useRef } from 'react';
import { useUserContext } from '../store/UserDetails';
import { IUser } from '../types/api';
import { myRequest } from './axios';
import { debounce } from './debounce';

export function useGetArrayData<DataType>(url: string) {
    const [d, setD] = useState<DataType>([] as any);
    const [ls, setLs] = useState(true);

    const reload = useCallback((url) => {
        return myRequest
            .get(url)
            .then((data) => {
                setD(data as unknown as DataType);
            })
            .finally(() => {
                setLs(false);
            });
    }, []);

    useEffect(() => {
        reload(url);
    }, [url]);

    return { loading: ls, data: d, setData: setD, reload };
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

export const useDebounceUsersSearch = (search: string) => {
    const mountRef = useRef<boolean>(true);

    const [loadingBySearch, setLoadingBySearch] = useState(false);

    const getUsersUtils = useGetArrayData<IUser[]>('/user/users');
    const debouncedReloadUsers = useCallback(
        debounce((url: string) => {
            return getUsersUtils.reload(url);
        }, 1000),
        []
    );

    useEffect(() => {
        setLoadingBySearch(true);
        debouncedReloadUsers(
            mountRef.current,
            `/user/users?search=${search}`
        ).finally(() => {
            setLoadingBySearch(false);
        });
        mountRef.current = false;
    }, [debouncedReloadUsers, search]);

    return { loadingBySearch, ...getUsersUtils };
};
