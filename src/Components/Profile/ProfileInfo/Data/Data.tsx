import React from 'react';
import Contacts from '../Contacts/Contacts';
import style from './Data.module.css';

import { ContactsType, ProfileType } from '../../../../types/types';

const ProfileData: React.FC<ProfileDataType> = (props) => {
  return (
    <div className={style.profileBlock}>
      {props.isOwner && (
        <button className="button button-addmessage" onClick={props.activateEditMode}>
          Edit
        </button>
      )}
      <div>
        <span>About Me:</span>
        <span>{props.profile.aboutMe}</span>
      </div>
      <div>
        <span>Fullname:</span>
        <span>{props.profile.fullName}</span>
      </div>
      <div>
        <span>Looking for a job:</span>
        <span>{props.profile.lookingForAJobDescription}</span>
      </div>
      <div>
        <span>Contacts:</span>
        <span>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <Contacts
                key={key}
                contactKey={key}
                contactValue={props.profile.contacts[key as keyof ContactsType]}
              />
            );
          })}
        </span>
      </div>
    </div>
  );
};

type ProfileDataType = { profile: ProfileType; isOwner: boolean; activateEditMode: () => void };
export default ProfileData;
