import React, { useState } from 'react';

import { DispatchType } from '../../../src/redux/redux-store';
import { useDispatch } from 'react-redux';
import { ProfileType } from '../../../src/types/types';

import Preloader from '../../../src/Components/Common/Preloader/Preloader';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../src/assets/userImg.png';
import ProfileDataReduxForm from './ProfileInfo/Data/DataForm';
import ProfileData from './ProfileInfo/Data/Data';
import { saveProfile, updatePhoto } from '../../../src/redux/profile-reducer';
import ProfileStatus from './Status';

const Profile: React.FC<ProfileInfoType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch<DispatchType>();

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onSelectedPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      //@ts-ignore
      dispatch(updatePhoto(event.target.files[0]));
    }
  };

  const onSubmit = (formData: ProfileType) => {
    dispatch(saveProfile(formData));
    setEditMode(false);
  };

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className={style.profileInfo}>
      <div>
        <img
          alt="userPhoto"
          src={props.profile.photos.large || userPhoto}
          className={style.userImg}
        />
      </div>
      <label className={style.inputFile}>
        {props.isOwner ? (
          <input
            type={'file'}
            name="file"
            onChange={(event) => {
              onSelectedPhoto(event);
            }}
          />
        ) : null}
        <span>Choose the image</span>
      </label>
      {editMode ? (
        <ProfileDataReduxForm initialValues={props.profile} {...props} onSubmit={onSubmit} />
      ) : (
        <ProfileData
          profile={props.profile}
          isOwner={props.isOwner}
          activateEditMode={activateEditMode}
        />
      )}
      <ProfileStatus status={props.status} />
    </div>
  );
};

type ProfileInfoType = {
  profile: ProfileType | any;
  isOwner: boolean;
  status: string | null;
};

export default Profile;
