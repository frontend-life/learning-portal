import { Routes, Route, Navigate } from 'react-router-dom';

import { useUserContext } from '@store/UserDetails';
import { PATHS } from '@utils/paths';
import { pages } from '@shared/constants';

const pagesUnderLogin = pages.filter(({ isPublic }) => !isPublic);
const pagesForEveryone = pages.filter(({ isPublic }) => isPublic);

export function AuthenticatedRoutes() {
    const user = useUserContext();
    // const isTeacher = user.userDetails.roles.includes(Roles.TEACHER);

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
                {pagesUnderLogin.map(({ path, Element }) => {
                    if (!user.userDetails.isSignedIn) {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <Navigate
                                        to={PATHS.signin}
                                        replace={true}
                                    />
                                }
                            />
                        );
                    }
                    return (
                        <Route key={path} path={path} element={<Element />} />
                    );
                })}
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Route>
        </Routes>
    );
}
