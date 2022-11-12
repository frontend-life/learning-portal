import { createContext, useContext, useState } from 'react';

type UserData = {
    isSignedIn: boolean;
};
type StartStore = {
    userDetails: UserData;
    setUserDetails: React.Dispatch<React.SetStateAction<UserData>>;
};

const start: StartStore = {
    userDetails: {
        isSignedIn: false
    },
    setUserDetails: () => {}
};
const UserDetailsContext = createContext<StartStore>(start);

export const useUserContext = () => useContext(UserDetailsContext);

const UserDetailsProvider = (props) => {
    // this state will be shared with all components
    const [userDetails, setUserDetails] = useState<UserData>(start.userDetails);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDetailsContext.Provider>
    );
};

export default UserDetailsProvider;
