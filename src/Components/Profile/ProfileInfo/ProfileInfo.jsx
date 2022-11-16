import React from "react"
import Preloader from "../../Common/Preloader"
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from "./ProfileStatusWithHook"
class ProfileInfo extends React.Component {
    render() {
        if (!this.props.profile) {
            return <Preloader />
        }
        return (
            <div style={{ 'margin': '10px' }}>
                <div>
                    <img alt="userAvatar" src={this.props.profile.photos.small} className={s.userImg} />
                </div>
                <div>
                    <>
                        <div>aboutMe: <span>{this.props.profile.aboutMe}</span></div>
                        <div>fullName: <span>{this.props.profile.fullName}</span></div>
                        <div>userID: <span>{this.props.profile.userId}</span></div>
                        <ProfileStatusWithHooks updateStatus={this.props.updateStatus} status={this.props.status} />
                    </>
                </div>
            </div>
        )
    }
}

export default ProfileInfo