import React from "react"
import Preloader from "../../Common/Preloader/Preloader"
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from "./ProfileStatusWithHook"
import userPhoto from '../.././../assets/userImg.png'
class ProfileInfo extends React.Component {

    onSelectedPhoto(event) {
        if (event.target.files.length) {
            this.props.updatePhoto(event.target.files[0])
        }
    }

    render() {
        if (!this.props.profile) {
            return <Preloader />
        }
        return (
            <div style={{ 'margin': '10px' }}>
                <div>
                    <img alt="userAvatar" src={this.props.profile.photos.large || userPhoto} className={s.userImg} />
                </div>
                {this.props.isOwner ? <input type={'file'} onChange={(event) => { this.onSelectedPhoto(event) }} /> : null}
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