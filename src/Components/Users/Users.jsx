import React from "react";
import userImg from '../../assets/userImg.png'

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            { id: 1, name: 'Vladimir', img: false, isFollowed: false },
            { id: 2, name: 'Alex', img: false, isFollowed: true },
            { id: 3, name: 'Dima', img: false, isFollowed: true },
        ])
    }
    return (
        <div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        {u.name}
                        <div>
                            {!u.img ? <img src={userImg} style={{ 'width': '100px' }} /> : null}
                        </div>
                        {u.isFollowed
                            ? <button onClick={() => { props.unfollow(u.id) }}>UNFOLLOW</button>
                            : <button onClick={() => { props.follow(u.id) }}>FOLLOW</button>}
                    </div>
                )
            }
        </div>
    )
}



export default Users