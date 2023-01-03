import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '../components/LoadingAnimation/LoadingAnimation';
import { IUser, Roles } from '../types/api';
import { getToken } from '../utils/auth';
import { API_URLS, myRequest } from '../utils/axios';
import { useServerEvents } from '../utils/hooks';

type UserData = {
    isSignedIn: boolean;
} & IUser;
type StartStore = {
    userDetails: UserData;
    setUserDetails: React.Dispatch<React.SetStateAction<UserData>>;
};

const start: StartStore = {
    userDetails: {
        isSignedIn: false,
        roles: [] as Roles[]
    } as UserData,
    setUserDetails: () => {}
};
const UserDetailsContext = createContext<StartStore>(start);

export const useUserContext = () => useContext(UserDetailsContext);

const UserDetailsProvider = (props) => {
    // this state will be shared with all components
    const [userDetails, setUserDetails] = useState<UserData>(start.userDetails);
    const [startAnimation, setStartAnimation] = useState(true);

    useEffect(() => {
        myRequest
            .get(API_URLS.ME)
            .then((data) => {
                if (!userDetails.isSignedIn && getToken()) {
                    setUserDetails((prev) => ({
                        ...prev,
                        ...data,
                        isSignedIn: true
                    }));
                    return null;
                }
            })
            .finally(() => {
                setStartAnimation(false);
            });
    }, []);

    if (startAnimation) {
        return <LoadingAnimation />;
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
