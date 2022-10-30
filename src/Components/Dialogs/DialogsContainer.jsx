import React from "react";
import { addMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    const updateMessage = (event) => {
        props.dispatch(updateMessageActionCreator(event))
    }

    const addMessage = () => {
        props.dispatch(addMessageActionCreator())
    }

    return (
        <Dialogs updateMessage={updateMessage} addMessage={addMessage} dialogsPage={props.dialogsPage} dispatch={props.dispatch} />
    )
}

export default DialogsContainer