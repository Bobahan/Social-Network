import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { actionsDialogs } from "../../redux/dialogs-reducer";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import Dialogs from "./Dialogs";

class DialogsContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    render() {
        return (
            <div>
                <Dialogs {...this.props} />
            </div>
        )
    }
}

type MapStateToPropsType = {
    dialogsPage: {}
}

type MapDispatchToPropsType = {
    addMessage: (message: string) => void
}

type TOwnProps = {}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addMessage: (message: string) => {
            dispatch(actionsDialogs.addMessage(message))
        }
    }
}

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, TOwnProps, AppStateType>(mapStateToProps, mapDispatchToProps), withAuthRedirect)(DialogsContainer)