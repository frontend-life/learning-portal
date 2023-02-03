import { Backend } from '@shared/Backend';
import { API_ROUTES } from '@utils/axios';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useUserContext } from '../store/UserDetails';
import { IUser } from '@type/api';
import { getBaseApiUrl } from './axios';
import { debounce } from './debounce';

export function useGetArrayData<DataType>(url: string) {
    const [d, setD] = useState<DataType>([] as any);
    const [ls, setLs] = useState(true);

    const reload = useCallback((url) => {
        setLs(true);
        return Backend.get(url)
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

    return { loading: ls, setLoading: setLs, data: d, setData: setD, reload };
}

export const useServerEvents = () => {
    const [listening, setListening] = useState(false);
    const { userDetails, setUserDetails } = useUserContext();
    useEffect(() => {
        if (!listening && userDetails.isSignedIn) {
            const events = new EventSource(
                `${getBaseApiUrl()}/events?user_id=${userDetails._id}`
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

                console.log(parsedData);
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

    const getUsersUtils = useGetArrayData<IUser[]>(API_ROUTES.USERS);
    const debouncedReloadUsers = useCallback(
        debounce((url: string) => {
            return getUsersUtils.reload(url);
        }, 1000),
        []
    );

    useEffect(() => {
        if (search) {
            getUsersUtils.setLoading(true);
            debouncedReloadUsers(
                mountRef.current,
                `${API_ROUTES.USERS}?search=${search}`
            ).finally(() => {
                getUsersUtils.setLoading(false);
            });
            mountRef.current = false;
        }
    }, [debouncedReloadUsers, search]);

    return { ...getUsersUtils };
};
