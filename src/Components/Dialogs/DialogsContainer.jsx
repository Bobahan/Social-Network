import { addMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import React from "react";
import { withAuthRedirect } from "../HOC/withAuthRedirect";

class DialogsContainer extends React.Component {
    render() {
        return (
            <>
                <Dialogs {...this.props} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMessage: (event) => {
            dispatch(updateMessageActionCreator(event))
        },
        addMessage: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

let DialosAithRedirect = withAuthRedirect(DialogsContainer)

export default connect(mapStateToProps, mapDispatchToProps)(DialosAithRedirect)