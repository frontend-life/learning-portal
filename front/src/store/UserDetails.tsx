import { createContext, useContext, useEffect, useState } from 'react';
import { LoadingAnimation } from '@components/LoadingAnimation/LoadingAnimation';
import { IUser, Roles, ITelegramUser } from '@type/api';
import { getToken } from '@utils/auth';
import { Backend } from '@shared/Backend';
import { TelegramConnectionPage } from '@app/components/TelegramConnectionPage/TelegramConnectionPage';
import { isProd } from '@utils/isProd';

type UserData = {
    isSignedIn: boolean;
    isTeacher: boolean;
} & ITelegramUser & IUser; //remove IUser once telegram user is fully implemented
type StartStore = {
    userDetails: UserData;
    setUserDetails: React.Dispatch<React.SetStateAction<UserData>>;
};

const start: StartStore = {
    userDetails: {
        isSignedIn: false,
        // roles: [] as Roles[],
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

    // getToken()

    useEffect(() => {
        // Backend.getMe()
        Backend.getMyself()
            .then((data: ITelegramUser | any) => {
                if (!userDetails.isSignedIn && getToken()) {
                    setUserDetails((prev) => ({
                        ...prev,
                        ...data,
                        isSignedIn: true,
                        isTeacher: false //sorry if I didn't properly implement it here
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

    //const { isSignedIn /*,telegramChatId */} = userDetails;

    //I think this is the page where Sergey is telling users to run the bot, and I am not 
    //entirely sure if it is needed in the future implementation, so will coment it out for now
    // if (isProd() && isSignedIn /* && !telegramChatId*/) {
    //     return <TelegramConnectionPage userId={userDetails.id} />;
    // }

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
