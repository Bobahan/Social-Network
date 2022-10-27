import React from "react";
import { NavLink } from "react-router-dom";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.css';
import Message from "./Message/Message";

// map перебирает массив и преобразовывает старый массив. На основе старого массива создается новый массив

const Dialogs = (props) => {
    let dialogs = props.dialogsPage.dialogs.map((d, id) => <Dialog key={id} id={d.id} dialog={d.dialog} />)
    let messages = props.dialogsPage.messages.map((m, id) => <Message key={id} message={m.message} />)

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                <div><h2>Dialogs</h2></div>
                {dialogs}
            </div>

            <div className={s.messages}>
                <div><h2>Messages</h2></div>
                {messages}
                <input />
                <div>
                    <button >Add Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs