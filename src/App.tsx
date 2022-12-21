import './App.css';
import React, { useEffect } from 'react';

import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UsersPage } from './Components/Users/UsersContainer';
import { Login } from './Components/Login/Login';
import Preloader from './Components/Common/Preloader/Preloader';
import { AppStateType, DispatchType } from './redux/redux-store';
import { withSuspense } from './Components/HOC/withSuspense';
import { initializeApp } from './redux/app-reducer';

import { Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from './Components/Header/Header';
import { withAuthRedirect } from './Components/HOC/withAuthRedirect';


const DialogsContainer = withSuspense(React.lazy(() => import('./Components/Dialogs/DialogsContainer')))
const ProfileContainer = withSuspense(React.lazy(() => import('./Components/Profile/ProfileContainer')))
const ChatPage = withSuspense(withAuthRedirect(React.lazy(() => import('./pages/Chat/ChatPage'))))

const { Content, Sider } = Layout;

export const MainApp: React.FC = () => {
  const { token: { colorBgContainer }, } = theme.useToken()
  const initialized = useSelector((state: AppStateType) => state.app.initialized)

  const dispatch = useDispatch<DispatchType>()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider width={200} >
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} >
            <SubMenu key='sub1' title='My Profile'>
              <MenuItem key='1'><Link to={"/profile"}>Profile</Link></MenuItem>
              <MenuItem key='2'><Link to={"/dialogs"}>Dialogs</Link></MenuItem>
              <MenuItem key='3'><Link to={"/chat"}>Chat</Link></MenuItem>
            </SubMenu>
            <MenuItem key='4'><Link to={"/news"}>News</Link></MenuItem>
            <MenuItem key='5'><Link to={"/users"}>Users</Link></MenuItem>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, background: colorBgContainer, }}>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<div className='error'>404 NOT FOUND</div>} />
              <Route path='/chat' element={<ChatPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}