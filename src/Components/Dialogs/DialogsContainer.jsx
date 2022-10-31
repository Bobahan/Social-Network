import { addMessageActionCreator, updateMessageActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import Dialogs from "./Dialogs";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
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

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs)