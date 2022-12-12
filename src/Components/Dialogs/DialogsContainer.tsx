import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { actionsDialogs, initialStateType } from "../../redux/dialogs-reducer";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Dialogs from "./Dialogs";
class DialogsContainer extends React.Component<DialogsContainerType<mapStateToProps, mapDispatchToProps>> {
    render() {
        return (
            <div>
                <Dialogs {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

type DialogsContainerType<S, D> = S & D
type mapStateToProps = { dialogsPage: initialStateType }
type mapDispatchToProps = { sendMessage: (message: string) => void }

export default compose<React.ComponentType>(
    connect<mapStateToProps, mapDispatchToProps, {}, AppStateType>(mapStateToProps, { sendMessage: actionsDialogs.sendMessage }),
    // withAuthRedirect
)(DialogsContainer)