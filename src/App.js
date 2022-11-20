import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import UsersContainer from './Components/Users/UsersContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { withRouter } from './Components/HOC/withRouter';
import { compose } from 'redux';
import Preloader from './Components/Common/Preloader/Preloader';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import { withSuspense } from './Components/HOC/withSuspense';

const DialogsContainer = withSuspense(React.lazy(() => import('./Components/Dialogs/DialogsContainer')));
const ProfileContainer = withSuspense(React.lazy(() => import('./Components/Profile/ProfileContainer')));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile' element={<ProfileContainer />}>
              <Route path=':userId' element={<ProfileContainer />} />
            </Route>
            <Route path='/dialogs*' element={<DialogsContainer />}>
            </Route>
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

export const MainApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}