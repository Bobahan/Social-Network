import React from "react"

const Contacts: React.FC<ContactsType> = ({ contactKey, contactValue }) => {
    return (
        <ul style={{ 'margin': '0' }}>
            <li>{contactKey}: <span>{contactValue}</span> </li>
        </ul>
    )
}

type ContactsType = { contactKey: string, contactValue: string }

export default Contacts