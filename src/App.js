import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Dialogs from './Components/Dialogs/Dialogs';

function App(props) {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<Profile profilePage={props.state.profilePage} changePost={props.changePost} addPost={props.addPost}/>} />
          <Route path='/dialogs*' element={<Dialogs dialogsPage={props.state.dialogsPage} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;