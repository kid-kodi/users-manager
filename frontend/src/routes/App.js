import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import FlashMessage from "../components/FlashMessage";
import PrivateRoute from "../components/PrivateRoute";
import ApiProvider from "../contexts/ApiProvider";
import FlashProvider from "../contexts/FlashProvider";
import UserProvider from "../contexts/UserProvider";
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
  UserImportPage,
  UserExportPage,
} from "../pages";

export default function App() {
  return (
    <FlashProvider>
      <ApiProvider>
        <UserProvider>
          <FlashMessage />
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="users">
                      <Route path="" element={<UserListPage />}></Route>
                      <Route path="import" element={<UserImportPage />}></Route>
                      <Route path="export" element={<UserExportPage />}></Route>
                      <Route
                        path=":userId"
                        element={<UserProfilePage />}
                      ></Route>
                      <Route path="new" element={<UserEditPage />}></Route>
                      <Route
                        path="edit/:userId"
                        element={<UserEditPage />}
                      ></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </UserProvider>
      </ApiProvider>
    </FlashProvider>
  );
}
