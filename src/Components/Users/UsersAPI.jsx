import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, setUsers, changePage, setTotalUsersCount, toogleIsFetching } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import { usersAPI } from "../../API/API";

class UsersContainerAPI extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(response.items)
                this.props.setTotalUsersCount(response.totalCount)
            })
    }

    changeCurrentPage = (page) => {
        this.props.changePage(page)
        this.props.toogleIsFetching(true)
        usersAPI.getUsers(page, this.props.pageSize)
            .then(response => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(response.items)
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


// post запрос - когда мы отправляем что-то на сервер с клиентаа
// когда мы отправляем нагрузку (payload) с клиента на сервер
// это может быть формой, картинкой и тд


// Промис - это обещание которое говорит о том что когда асинхронная операция закончится через промис можно будет обратиться к результату запроса. 
// Он хранит результат будущей завершенной асинхронной функции 