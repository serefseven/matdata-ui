import { Outlet, Route, Routes} from "react-router-dom";

import React, {lazy} from "react";
import UserPageWrapper from "./users/UserPage";
import UserCreateFormWrapper from "./users/UserCreateFormWrapper";
import UserGroupPageWrapper from "./user-group/UserGroupPage";
import UserEditFormWrapper from "./users/UserEditFormWrapper";

const UserManagementPage = () => {
    //const UserPageWrapper = lazy(() => import('./users/UserPage'));
    //const UserCreateFormWrapper = lazy(() => import('./users/UserCreateFormWrapper'));
    //const UserEditFormWrapper = lazy(() => import('./users/UserEditFormWrapper'));
    //const UserGroupPageWrapper = lazy(() => import('./user-group/UserGroupPage'));

    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route path='users' element={ <UserPageWrapper/> } />
                <Route path='users/form' element={ <UserCreateFormWrapper/> } />
                <Route path='users/form/:userId' element={ <UserEditFormWrapper /> } />

                <Route path='usergroups' element={ <UserGroupPageWrapper/> } />
            </Route>
            {/*<Route index element={<Navigate to='/apps/user-management/users' />} />*/}
        </Routes>
    )
}

export default UserManagementPage;