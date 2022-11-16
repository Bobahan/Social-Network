import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
class DialogsContainer extends React.Component {
    render() {
        return (
            <div>
                <Dialogs {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(DialogsContainer)
