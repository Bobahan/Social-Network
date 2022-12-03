import React from "react";
import { reduxForm } from "redux-form";
import { initialStateType } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.css';
import DialogsForm from "./DialogsForm";
import Message from "./Message/Message";

type PropsType = {
    dialogsPage: initialStateType
    sendMessage: (message: string) => void
}

type OwnProps = {}

export type DialogsFormType = {
    message: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let dialogs = props.dialogsPage.dialogs.map((d, id) => <Dialog key={id} id={d.id} dialog={d.dialog} />)
    let messages = props.dialogsPage.messages.map((m, id) => <Message key={id} message={m.message} />)

    const addMessage = (formData: DialogsFormType) => {
        props.sendMessage(formData.message)
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

const DialogsReduxForm = reduxForm<DialogsFormType, OwnProps>({ form: 'dialogs' })(DialogsForm)

export default Dialogs