import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'

import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import UserManagementPage from "../pages/user-management/UserManagementPage";
import {DashboardWrapper} from "../pages/dashboard/DashboardWrapper";
import MatdataPage from "../pages/mat-data/MatdataPage";
import {useAuth} from "../modules/auth";
import AccountPage from "../modules/accounts/AccountPage";

const PrivateRoutes = () => {
    const {currentUser} = useAuth()
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>

                <Route
                    path='/account/*'
                    element={
                        <SuspensedView>
                            <AccountPage />
                        </SuspensedView>
                    }
                />

                {currentUser?.type === 1 ? (<>
                    {/* Lazy Modules */}
                    <Route
                        path='user-management/*'
                        element={
                            <SuspensedView>
                                <UserManagementPage/>
                            </SuspensedView>
                        }
                    />

                    <Route
                        path='*'
                        element={
                            <SuspensedView>
                                <MatdataPage/>
                            </SuspensedView>
                        }
                    />
                </>) : (null)}

                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
