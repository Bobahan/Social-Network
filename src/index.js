import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { state } from './redux/state';
import { addPost } from './redux/state';
import { changePost } from './redux/state';
import { subscribe } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderTree = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} addPost={addPost} changePost={changePost} />
      </BrowserRouter>
    </React.StrictMode>
  );
}
rerenderTree()

subscribe(rerenderTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();