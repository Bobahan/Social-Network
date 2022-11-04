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
                    <div>aboutMe: <span>{props.profile.aboutMe}</span></div>
                    <div>fullName: <span>{props.profile.fullName}</span></div>
                    <div>userID: <span>{props.profile.userId}</span></div>
                </>
            </div>
        </div>
    )
}
export default ProfileInfo