import { addMessageActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import React from "react";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

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
        addMessage: (message) => {
            dispatch(addMessageActionCreator(message))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(DialogsContainer)