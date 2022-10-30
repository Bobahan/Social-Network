import React from "react";
import StoreContext from "../../ContextAPI";
import { addMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                const updateMessage = (event) => {
                    store.dispatch(updateMessageActionCreator(event))
                }
                const addMessage = () => {
                    store.dispatch(addMessageActionCreator())
                }

                return (
                    <Dialogs
                        updateMessage={updateMessage}
                        addMessage={addMessage}
                        dialogsPage={store.getState().dialogsPage} />
                )
            }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer