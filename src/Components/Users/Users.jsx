import React from "react";
import userImg from '../../assets/userImg.png'
import axios from "axios";

let Users = (props) => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items)
            })
    }
    return (
        <div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        {u.name}
                        <div>
                            <img alt="userImg" style={{ 'width': '100px' }} src={u.photos.small ? u.photos.small : userImg} />
                        </div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>UNFOLLOW</button>
                            : <button onClick={() => { props.follow(u.id) }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}

export default Users