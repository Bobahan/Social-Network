import React from "react";
import userImg from '../../assets/userImg.png'
import axios from "axios";
import s from './Users.module.css'

let totalUsers

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                totalUsers = response.data.totalCount
            })
    }

    onChangePage = (page) => {
        this.props.changePage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let totalPages = Math.ceil(totalUsers / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {
                        pages.map(p => {
                            return <button className={this.props.currentPage === p ? s.selectedPage : ''} onClick={() => this.onChangePage(p)}>{p}</button>
                        })
                    }
                </div>
                {
                    this.props.users.map((u, id) =>
                        <div key={id}>
                            {u.name}
                            <div>
                                <img alt="userImg" style={{ 'width': '100px' }} src={u.photos.small ? u.photos.small : userImg} />
                            </div>
                            {u.followed
                                ? <button onClick={() => { this.props.unfollow(u.id) }}>UNFOLLOW</button>
                                : <button onClick={() => { this.props.follow(u.id) }}>FOLLOW</button>}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Users