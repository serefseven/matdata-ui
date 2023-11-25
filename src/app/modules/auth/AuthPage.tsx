import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'
import React from "react";
import {PasswordReset} from "./components/PasswordReset";

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='password-reset/:token/:email' element={<PasswordReset />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
