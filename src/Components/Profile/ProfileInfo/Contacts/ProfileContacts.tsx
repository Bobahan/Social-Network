import React from "react"

type ContactsType = { contactKey: string, contactValue: string }

const Contacts: React.FC<ContactsType> = ({ contactKey, contactValue }) => {
    return (
        <ul style={{ 'margin': '0' }}>
            <li>{contactKey}: <span>{contactValue}</span> </li>
        </ul>
    )
}

export default Contacts