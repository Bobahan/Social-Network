import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

let dialogsPage = {
  dialogs: [
    { id: 1, dialog: 'Vladimir' },
    { id: 2, dialog: 'Alex' },
    { id: 3, dialog: 'Andrey' },
  ],
  messages: [
    { id: 1, message: 'I wanna be a best software engineer' },
    { id: 2, message: 'I think that is the good idea' },
  ],
}

let posts = {
  post: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo Yo Yo guys!' },
  ]
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App dialogsPage={dialogsPage} posts={posts}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();