import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FormControlSpan } from "../../../Common/FormController/FormControl";
import styles from '../../../Common/FormController/FormControl.module.css';
import style from './ProfileData.module.css';

import { ProfileType } from "../../../../types/types";

const Input = FormControlSpan('input')
const Textarea = FormControlSpan('textarea')

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormType> & ProfileDataFormType> = ({ handleSubmit, error, profile }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={style.saveButtton}><button>Save</button></div>

            <div className={style.profileSave}>
                <div className={style.aboutMe}>About Me:</div>
                <Field name="aboutMe" component={Textarea} type="text" placeholder="About Me" style={{ 'marginLeft': '10px' }} />
            </div>

            <div className={style.profileSave}>
                <div>Fullname:</div>
                <Field name="fullName" component={Input} type="text" placeholder="Full Name" style={{ 'marginLeft': '10px' }} />
            </div>

            <div className={style.profileSave}>
                <div>UserID:</div>
                <span className={style.userID}>{profile.userId}</span>
            </div>

            <div className={style.profileSave}>
                <span className={style.lookingForAJob}>Looking for a job:</span>
                <Field name="lookingForAJobDescription" component={Input} type="text" placeholder="Yes / No" style={{ 'marginLeft': '10px' }} />
            </div>

            <div className={style.contactsBlock}>
                <span>Contacts:</span>
                <span>{Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}: <Field name={`contacts.` + key} placeholder={key} component={Input} type="text" /></b>
                        </div>
                    )
                })}</span></div>
            {error && <div className={styles.formControlSummaryError} style={{ 'margin': '10px 10px' }}>{error}</div>}
        </form>
    )
}

type ProfileDataFormType = { profile: ProfileType }

export default reduxForm<ProfileType, ProfileDataFormType>({ form: 'profile' })(ProfileDataForm)