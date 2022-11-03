import React from "react"
import Preloader from "../../Common/Preloader"
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div style={{ 'margin': '10px' }}>
            <div>
                <img alt="userAvatar" src={props.profile.photos.small} className={s.userImg} />
            </div>
            <div>
                <>
                    <div>{props.profile.aboutMe}</div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.userId}</div>
                </>
            </div>
        </div>
    )
}
export default ProfileInfo