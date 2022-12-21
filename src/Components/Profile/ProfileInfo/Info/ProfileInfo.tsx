import React, { useState } from "react";
import Preloader from "../../../Common/Preloader/Preloader";
import style from './ProfileInfo.module.css';
import userPhoto from '../../../../assets/userImg.png';
import ProfileDataReduxForm from "../Data/ProfileDataForm";
import { ProfileData } from "../Data/ProfileData";
import { ProfileStatus } from "../Status/ProfileStatus";
import { saveProfile, updatePhoto } from "../../../../redux/profile-reducer";
import { DispatchType } from "../../../../redux/redux-store";
import { useDispatch } from "react-redux";

import { ProfileType } from "../../../../types/types"

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch<DispatchType>()

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onSelectedPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            //@ts-ignore
            dispatch(updatePhoto(event.target.files[0]))
        }
    }

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        setEditMode(false);
    }

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={style.profileInfo}>
            <div>
                <img alt="userPhoto" src={props.profile.photos.large || userPhoto} className={style.userImg} />
            </div>
            <label className={style.inputFile}>
                {props.isOwner ? <input type={'file'} name='file' onChange={(event) => { onSelectedPhoto(event) }} /> : null}
                <span>Выберите файл</span>
            </label>
            {editMode ?
                <ProfileDataReduxForm initialValues={props.profile} {...props} onSubmit={onSubmit} />
                : <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={activateEditMode} />}
            <ProfileStatus status={props.status} />
        </div>
    )
}

type ProfileInfoType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updatePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => void
}