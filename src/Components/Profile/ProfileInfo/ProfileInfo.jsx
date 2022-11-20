import React from "react"
import Preloader from "../../Common/Preloader/Preloader"
import s from './ProfileInfo.module.css'
import userPhoto from '../.././../assets/userImg.png'
import ProfileData from "./Data/ProfileData"
import ProfileStatusWithHooks from "./ProfileStatusWithHook"
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
                <label className={s.inputFile}>
                    {this.props.isOwner ? <input type={'file'} name='file' onChange={(event) => { this.onSelectedPhoto(event) }} /> : null}
                    <span>Выберите файл</span>
                </label>
                <ProfileData {...this.props} />
                <ProfileStatusWithHooks updateStatus={this.props.updateStatus} status={this.props.status} />
            </div>
        )
    }
}




export default ProfileInfo