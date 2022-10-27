import React from "react";
import { NavLink } from "react-router-dom";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.css';
import Message from "./Message/Message";

// map перебирает массив и преобразовывает старый массив. На проекции старого массива создается новый

const Dialogs = () => {
    let dialogsPage = {
        dialogs: [
            { id: 1, dialog: 'Vladimir' },
            { id: 2, dialog: 'Alex' },
            { id: 3, dialog: 'Andrey' },
        ],
        messages: [
            { id: 1, message: 'I wanna be a best software engineer' },
            { id: 2, message: 'I think that is the good idea' },
        ]
    }

    let dialogs = dialogsPage.dialogs.map(d => <Dialog id={d.id} dialog={d.dialog} />)
    let messages = dialogsPage.messages.map(m => <Message message={m.message} />)

    return (
        <div className={s.content}>
            {/* DIALOGS */}
            <div className={s.dialogs}>
                <div><h2>Dialogs</h2></div>
                {dialogs}
            </div>

            {/* MESSAGES */}
            <div className={s.messages}>
                <div><h2>Messages</h2></div>
                {messages}
            </div>
        </div>
    )
}

export default Dialogs