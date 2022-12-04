import React from "react"
import { NavLink } from "react-router-dom"
import s from './Dialog.module.css'

type DialogType = { id: number, dialog: string }

const Dialog: React.FC<DialogType> = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={`/dialogs/${props.id}`}><div className={s.userName}>{props.dialog}</div></NavLink>
        </div>
    )
}

export default Dialog