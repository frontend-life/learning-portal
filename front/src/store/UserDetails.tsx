import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '@components/LoadingAnimation/LoadingAnimation';
import { IUser, Roles } from '@type/api';
import { getToken } from '@utils/auth';
import { Backend } from '@shared/Backend';
import { TelegramConnectionPage } from '@app/components/TelegramConnectionPage/TelegramConnectionPage';

type UserData = {
    isSignedIn: boolean;
    isTeacher: boolean;
} & IUser;
type StartStore = {
    userDetails: UserData;
    setUserDetails: React.Dispatch<React.SetStateAction<UserData>>;
};

const start: StartStore = {
    userDetails: {
        isSignedIn: false,
        roles: [] as Roles[],
        isTeacher: false
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
        Backend.getMe()
            .then((data: IUser) => {
                if (!userDetails.isSignedIn && getToken()) {
                    setUserDetails((prev) => ({
                        ...prev,
                        ...data,
                        isSignedIn: true,
                        isTeacher: data.roles.includes(Roles.TEACHER)
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

    const { isSignedIn, telegramChatId } = userDetails;

    if (isSignedIn && !telegramChatId) {
        return <TelegramConnectionPage userId={userDetails._id} />;
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
