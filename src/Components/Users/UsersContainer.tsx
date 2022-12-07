import React from "react";
import { connect } from "react-redux";
import { getCurrentPage, getFilteredUsers, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { actionsUsers, FilterType, follow, requestUsers, unfollow } from "../../redux/users-reducer";

class UsersContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onPageChange = (page: number) => {
        this.props.getUsers(page, this.props.pageSize, this.props.filter)
    }

    onSearchUsers = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
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
                    onSearchUsers={this.onSearchUsers.bind(this)}
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
        followingInProgress: getFollowingInProgress(state),
        filter: getFilteredUsers(state)
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        getUsers: (page: number, pageSize: number, filter: FilterType) => {
            dispatch(requestUsers(page, pageSize, filter))
        },
        isFollowingProgress: (isDisabling: boolean, userID: number) => {
            dispatch(actionsUsers.isFollowingProgress(isDisabling, userID))
        },
        follow: (userID: number) => {
            dispatch(follow(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollow(userID))
        }
    }
}

type MapStatePropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    isFollowingProgress: (isDisabling: boolean, userID: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer)