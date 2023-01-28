import { PATHS } from '@utils/paths';
import { useUserContext } from '@store/UserDetails';
import { useMemo } from 'react';
import { navigationItems } from './items';

export function useNavItems() {
    const {
        userDetails: { isSignedIn, isTeacher }
    } = useUserContext();

    return useMemo(() => {
        /**
         * Hide sign in and sign up links for signed in user
         */
        let resultItems = navigationItems.filter(({ path }) => {
            if (isSignedIn) {
                return ![PATHS.signin, PATHS.signup].includes(path);
            }
            return true;
        });

        /**
         * Show only allowed pages
         */
        return resultItems.filter(({ isPublic, forTeacher }) => {
            if (!isSignedIn) {
                return isPublic;
            }

            if (!isTeacher) {
                return !forTeacher;
            }

            return true;
        });
    }, [isSignedIn, isTeacher]);
}
