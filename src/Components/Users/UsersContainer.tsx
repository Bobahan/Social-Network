import React from "react";
import { connect } from "react-redux";
import { changePage, isFollowingProgress, follow, unfollow, getUsersTC } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    changePage: (page: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    isFollowingProgress: (isDisabling: boolean, userID: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

type TOwnProps = {}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (page: number) => {
        this.props.changePage(page)
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    users={this.props.users}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    followingInProgress={this.props.followingInProgress}
                    onPageChange={this.onPageChange.bind(this)}
                    isFollowingProgress={this.props.isFollowingProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        changePage: (currentPage: number) => {
            dispatch(changePage(currentPage))
        },
        getUsers: (page: number, pageSize: number) => {
            dispatch(getUsersTC(page, pageSize))
        },
        isFollowingProgress: (isDisabling: boolean, userID: number) => {
            dispatch(isFollowingProgress(isDisabling, userID))
        },
        follow: (userID: number) => {
            dispatch(follow(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollow(userID))
        }
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, TOwnProps, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer)