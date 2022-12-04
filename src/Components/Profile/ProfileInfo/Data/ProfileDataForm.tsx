import React from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { ProfileType } from "../../../../types/types"
import { FormControlSpan } from "../../../Common/FormController/FormControl"
import styles from '../../../Common/FormController/FormControl.module.css'

const Input = FormControlSpan('input')
const Textarea = FormControlSpan('textarea')

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormType> & ProfileDataFormType> = ({ handleSubmit, error, profile }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ 'marginTop': '10px' }}><button>Save</button></div>
            <div style={{ 'display': 'flex' }}>
                <div style={{ 'fontWeight': '700', 'borderBottom': '1px solid black', 'alignSelf': 'center' }}>AboutMe: </div>
                <Field name="aboutMe" component={Textarea} type="text" placeholder="About Me" style={{ 'marginLeft': '10px' }} />
            </div>

            <div style={{ 'display': 'flex' }}>
                <div style={{ 'fontWeight': '700', 'borderRadius': '5%', 'alignSelf': 'center' }}>FullName:</div>
                <Field name="fullName" component={Input} type="text" placeholder="Full Name" style={{ 'marginLeft': '10px' }} />
            </div>

            <div style={{ 'display': 'flex' }}>
                <div style={{ 'fontWeight': '700', 'borderRadius': '5%', 'alignSelf': 'center' }}>UserID:</div>
                <span style={{ 'marginLeft': '5px' }}>{profile.userId}</span>
            </div>

            <div style={{ 'display': 'flex' }}>
                <span style={{ 'fontWeight': '700', 'borderRadius': '5%', 'alignSelf': 'center' }}>Looking For A Job Description:</span>
                <Field name="lookingForAJobDescription" component={Input} type="text" placeholder="Yes / No" style={{ 'marginLeft': '10px' }} />
            </div>

            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>Contacts:</span> <span>{Object.keys(profile.contacts).map(key => {
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