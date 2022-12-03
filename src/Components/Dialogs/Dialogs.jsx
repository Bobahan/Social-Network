import React from "react";
import { reduxForm } from "redux-form";
import { actionsDialogs } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.css';
import DialogsForm from "./DialogsForm";
import Message from "./Message/Message";


const Dialogs = (props) => {
    let dialogs = props.dialogsPage.dialogs.map((d, id) => <Dialog key={id} id={d.id} dialog={d.dialog} />)
    let messages = props.dialogsPage.messages.map((m, id) => <Message key={id} message={m.message} />)

    const addMessage = (formData) => {
        props.actionsDialogs.addMessage(formData.message)
    }

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                <div><h2>Dialogs</h2></div>
                {dialogs}
            </div>

            <div className={s.messages}>
                <div><h2>Messages</h2></div>
                {messages}
                <DialogsReduxForm onSubmit={addMessage} />
            </div>
        </div>
    )
}

const DialogsReduxForm = reduxForm({ form: 'dialogs' })(DialogsForm)

export default Dialogs