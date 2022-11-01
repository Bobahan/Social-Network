import React from "react";
import userImg from '../../assets/userImg.png'
import axios from "axios";

// У Классовой Компоненты есть как минимум свойство render()
// и основная задача это вернуть JSX
class Users extends React.Component {
    constructor(props) {
        super(props)
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }
    render() {
        return (
            <div>
                {
                    this.props.users.map(u =>
                        <div key={u.id}>
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