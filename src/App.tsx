import './App.css';
import React, { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UsersPage } from './pages/Users/UsersPage';
import { Login } from './Components/Login/Login';
import Preloader from './Components/Common/Preloader/Preloader';
import { AppStateType, DispatchType } from './redux/redux-store';
import { withSuspense } from './Components/HOC/withSuspense';
import { initializeApp } from './redux/app-reducer';
import { Header } from './Components/Header/Header';
import { withAuthRedirect } from './Components/HOC/withAuthRedirect';
import Navbar from './Components/Navbar/Navbar';
import { NotFound } from './Components/NotFound';

const ProfileContainer = withSuspense(
  React.lazy(() => import('./Components/Profile/ProfileContainer')),
);
const ChatPage = withSuspense(withAuthRedirect(React.lazy(() => import('./pages/Chat/ChatPage'))));

export const App: React.FC = () => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to={'/profile'} />} />
            <Route path="/profile" element={<ProfileContainer />}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
