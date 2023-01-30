import { Routes, Route, Navigate } from 'react-router-dom';

import { useUserContext } from '@store/UserDetails';
import { PATHS } from '@utils/paths';
import { pages } from '@shared/constants';

const pagesUnderLogin = pages.filter(({ isPublic }) => !isPublic);
const pagesForEveryone = pages.filter(({ isPublic }) => isPublic);

export function AuthenticatedRoutes() {
    const {
        userDetails: { isSignedIn }
    } = useUserContext();

    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={<Navigate to={PATHS.profile} replace={true} />}
                />
                {pagesForEveryone.map(({ path, Element }) => {
                    return (
                        <Route key={path} path={path} element={<Element />} />
                    );
                })}
                {isSignedIn &&
                    pagesUnderLogin.map(({ path, Element }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Element />}
                            />
                        );
                    })}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={isSignedIn ? PATHS.profile : PATHS.signin}
                            replace={true}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}
