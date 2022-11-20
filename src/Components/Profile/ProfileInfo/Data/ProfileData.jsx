import React from "react";
import Contacts from "../Contacts/ProfileContacts";

const ProfileData = (props) => {
    return (
        <div style={{ 'marginTop': '10px' }}>
            <div><span style={{ 'fontWeight': '700', 'borderBottom': '1px solid black' }}>AboutMe: </span><span >{props.profile.aboutMe}</span></div>
            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>FullName:</span> <span>{props.profile.fullName}</span></div>
            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>UserID:</span> <span>{props.profile.userId}</span></div>
            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>Looking for a job:</span> <span>{!props.profile.lookingForAJob ? 'yes' : 'no'}</span></div>
            <div><span style={{ 'fontWeight': '700', 'borderRadius': '5%' }}>Contacts:</span> <span>{Object.keys(props.profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}</span></div>
        </div>
    )
}

export default ProfileData