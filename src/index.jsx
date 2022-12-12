import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MainApp } from './App';
import './index.css';
import store from './redux/redux-store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter >
        <Provider store={store}>
            <MainApp />
        </Provider>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// нужно вернуть середину слова
// если длина слова нечетное вернуть средний символ
// если длина слова четное то вернуть два средних символа

// test => es
// testing => t

// arr.slice([start], [end])
// slice - возвращает новый массив в который копирует элементы с индекса start и end не включая end 

// ['VOVA'] => OV // slice(1, 2)
// ['SASHA'] => S // slice(1, 2)

const getMiddle = (s) => {
    let middle = Math.floor(s.length / 2)
    return s.length % 2 === 0 ? s.slice(middle - 1, middle + 1) : s.slice(middle, middle + 1)
}

const finishedHomework = () => {
    console.log('2. Finished my homework')
}

const doHomework = (subject, fn) => {
    console.log(`1. I am doing my ${subject}`)
    fn()
}

doHomework('math', finishedHomework)


// функция высшего порядка
// замыкание
// колбэк
// setTimeout
// clearTimeout
// контекст вызова this

// сохранять значение между вызовами. только innerWrapper будет доступно свое замыкание\