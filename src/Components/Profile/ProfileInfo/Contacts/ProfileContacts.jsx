import React from "react"

const Contacts = ({ contactTitle, contactValue }) => {
    return (
        <ul style={{ 'margin': '0' }}>
            <li>{contactTitle}: <span>{contactValue}</span> </li>
        </ul>
    )
}

export default Contacts