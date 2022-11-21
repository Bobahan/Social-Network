import React from "react"
import { Field, reduxForm } from "redux-form"
import { FormControlSpan } from "../../../Common/FormController/FormControl"
import Contacts from "../Contacts/ProfileContacts"

const Input = FormControlSpan('input')
const Textarea = FormControlSpan('textarea')

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
                <span style={{ 'marginLeft': '5px' }}>{props.profile.userId}</span>
            </div>

            <div style={{ 'display': 'flex' }}>
                <span style={{ 'fontWeight': '700', 'borderRadius': '5%', 'alignSelf': 'center' }}>Looking For A Job Description:</span>
                <Field name="lookingForAJobDescription" component={Input} type="text" placeholder="Yes / No" style={{ 'marginLeft': '10px' }} />
            </div>

            {/* <div style={{ 'display': 'flex' }}>
                <div style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>Looking for a job:</div>
                <span style={{ 'marginLeft': '5px' }}>{!props.profile.lookingForAJob ? 'yes' : 'no'}</span>
                <Field name="lookingForAJob" component={Input} type="text" placeholder="Yes / No" style={{ 'marginLeft': '10px' }}/>
            </div> */}

            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>Contacts:</span> <span>{Object.keys(props.profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}</span></div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({ form: 'profile' })(ProfileDataForm)
export default ProfileDataReduxForm