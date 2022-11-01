import React from "react"
import userAvatar from '../../../assets/user.jpeg'
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div style={{ 'margin': '10px' }}>
            <div>
                <img alt="userAvatar" src={userAvatar} className={s.userImg} />
            </div>
            <div>
                <div>Name: Vladimir</div>
                <div>City: Saint-Petersburg</div>
                <div>Education: NEFU</div>
            </div>
        </div>
    )
}

export default ProfileInfo