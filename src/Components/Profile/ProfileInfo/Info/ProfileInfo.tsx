import React, { useState } from "react"
import Preloader from "../../../Common/Preloader/Preloader"
import s from './ProfileInfo.module.css'
import userPhoto from '../../../../assets/userImg.png'
import ProfileData from "../Data/ProfileData"
import ProfileStatusWithHooks from "../Status/ProfileStatusWithHook"
import ProfileDataReduxForm from "../Data/ProfileDataForm"
import { ProfileType } from "../../../../types/types"

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onSelectedPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            props.updatePhoto(event.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData)
        setEditMode(false);
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
                ? <ProfileDataReduxForm initialValues={props.profile} {...props} onSubmit={onSubmit} />
                : <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={activateEditMode} />}
            <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status} />
        </div>
    )
}

type ProfileInfoType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    updatePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => void
}

export default ProfileInfo