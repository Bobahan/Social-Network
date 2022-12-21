import React from "react";
import style from './ProfileContacts.module.css';

const Contacts: React.FC<ContactsType> = ({ contactKey, contactValue }) => {
    return (
        <ul className={style.contacts}>
            <li>{contactKey}:<span>{contactValue}</span></li>
        </ul>
    )
}

type ContactsType = { contactKey: string, contactValue: string | undefined }

export default Contacts