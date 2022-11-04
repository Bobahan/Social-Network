import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, setUsers, changePage, setTotalUsersCount, toogleIsFetching } from "../../redux/users-reducer";
import Users from "./Users";
import axios from "axios";
import Preloader from "../Common/Preloader";
class UsersContainerAPI extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    changeCurrentPage = (page) => {
        this.props.changePage(page)
        this.props.toogleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }



    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    changeCurrentPage={this.changeCurrentPage.bind(this)}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    users={this.props.users}
                    isFetching={this.props.isFetching}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    changePage,
    setTotalUsersCount,
    toogleIsFetching
})(UsersContainerAPI)


// post запрос - когда мы отправляем что-то на сервер
// когда мы отправляем нагрузку (payload) с клиента на сервер
// это может быть формой, картинкой и тд