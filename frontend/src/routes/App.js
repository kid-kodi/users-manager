import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  DashboardPage,
  UserListPage,
  UserProfilePage,
  UserEditPage,
  WelcomePage,
} from "../pages";

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="/" element={<DashboardPage />} />

      <Route path="/users">
        <Route path="" element={<UserListPage />}></Route>
        <Route path=":userId" element={<UserProfilePage />}></Route>
        <Route path="new" element={<UserEditPage />}></Route>
        <Route path="edit/:userId" element={<UserEditPage />}></Route>
      </Route>
    </Routes>
  );
}
