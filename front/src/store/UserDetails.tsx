import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '../components/LoadingAnimation/LoadingAnimation';
import { IUser } from '../types/api';
import { getToken } from '../utils/auth';
import { myRequest } from '../utils/axios';

type UserData = {
    isSignedIn: boolean;
} & IUser;
type StartStore = {
    userDetails: UserData;
    setUserDetails: React.Dispatch<React.SetStateAction<UserData>>;
};

const start: StartStore = {
    userDetails: {
        isSignedIn: false
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
        myRequest.get('/user/me').then((data) => {
            if (!userDetails.isSignedIn && getToken()) {
                setUserDetails((prev) => ({
                    ...prev,
                    ...data,
                    isSignedIn: true
                }));
                return null;
            }
        });
    }, []);

    if (startAnimation) {
        return (
            <LoadingAnimation
                onEnd={() => {
                    setStartAnimation(false);
                }}
            />
        );
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
