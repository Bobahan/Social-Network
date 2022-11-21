import React, { useState } from "react"
import Preloader from "../../../Common/Preloader/Preloader"
import s from './ProfileInfo.module.css'
import userPhoto from '../../../../assets/userImg.png'
import ProfileData from "../Data/ProfileData"
import ProfileStatusWithHooks from "../Status/ProfileStatusWithHook"
import ProfileDataReduxForm from "../Data/ProfileDataForm"

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onSelectedPhoto = (event) => {
        if (event.target.files.length) {
            props.updatePhoto(event.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
    }

    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div style={{ 'margin': '10px' }}>
            <div>
                <img alt="userPhoto" src={props.profile.photos.large || userPhoto} className={s.userImg} />
            </div>
            <label className={s.inputFile}>
                {props.isOwner ? <input type={'file'} name='file' onChange={(event) => { onSelectedPhoto(event) }} /> : null}
                <span>Выберите файл</span>
            </label>
            {editMode
                ? <ProfileDataReduxForm profile={props.profile} {...props} onSubmit={onSubmit} />
                : <ProfileData profile={props.profile} {...props} activateEditMode={activateEditMode} />}
            <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status} />
        </div>
    )
}

export default ProfileInfo