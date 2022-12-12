import './App.css';
import React, { useState } from 'react';

import { Routes, Route, BrowserRouter, Navigate, NavLink, useParams, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Navbar from './Components/Navbar/Navbar';
import { UsersPage } from './Components/Users/UsersContainer';
import { Login } from './Components/Login/Login';
import { withRouter } from './Components/HOC/withRouter';
import Preloader from './Components/Common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { withSuspense } from './Components/HOC/withSuspense';
import { actionsApp } from './redux/app-reducer';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from './Components/Header/Header';
import { withAuthRedirect } from './Components/HOC/withAuthRedirect';
// import ProfileContainer from './Components/Profile/ProfileContainer';
// import { ChatPage } from './pages/Chat/ChatPage';

const DialogsContainer = withSuspense(React.lazy(() => import('./Components/Dialogs/DialogsContainer')))
const ProfileContainer = withSuspense(React.lazy(() => import('./Components/Profile/ProfileContainer')))
const ChatPage = withSuspense(withAuthRedirect(React.lazy(() => import('./pages/Chat/ChatPage'))))

// class App extends React.Component<MapStateToPropsType & MapDispatchToProps> {
//   componentDidMount() {
//     this.props.initializeApp()
//   }

//   render() {
//     if (!this.props.initialized) {
//       return <Preloader />
//     }
//     return (
//       <div className='app-wrapper'>
//         <HeaderContainer />
//         <Navbar />
//         <div className='app-wrapper-content'>
//           <Routes>
//             <Route path='/' element={<Navigate to={'/profile'} />} />
//             <Route path='/profile' element={<ProfileContainer />}>
//               <Route path=':userId' element={<ProfileContainer />} />
//             </Route>
//             <Route path='/dialogs' element={<DialogsContainer />} />
//             <Route path='/users' element={<UsersPage />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='*' element={<div style={{ 'display': 'flex', "justifyContent": 'center', 'alignItems': 'center', 'height': '100%', 'fontWeight': '700' }}>404 NOT FOUND</div>} />
//           </Routes>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//   return {
//     initialized: state.app.initialized,
//   }
// }

// const AppContainer = compose<React.ComponentType>(
//   withRouter,
//   connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, { initializeApp: actionsApp.initializeApp })
// )(App)

// type MapStateToPropsType = { initialized: boolean }
// type MapDispatchToProps = { initializeApp: () => void }

// export const MainApp: React.FC = () => {
//   return (
//     <BrowserRouter >
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     </BrowserRouter>
//   )
// }

const { Content, Sider } = Layout;

//@ts-ignor
export const MainApp: React.FC = () => {
  const { token: { colorBgContainer }, } = theme.useToken()
  const login = useSelector((state: AppStateType) => state.auth.login)
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
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, background: colorBgContainer, }}>
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<div style={{ 'display': 'flex', "justifyContent": 'center', 'alignItems': 'center', 'height': '100%', 'fontWeight': '700' }}>404 NOT FOUND</div>} />
              <Route path='/chat' element={<ChatPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}