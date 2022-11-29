import React, { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

const ProfileStatusWithHooks: React.FC<PropsType & StateType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const changeText = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode
                ? <div><span style={{ 'fontWeight': '700' }}>Status: </span><span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span></div>
                : <div><input value={status} onChange={changeText} onBlur={deactivateEditMode} autoFocus={true} /></div>}
        </div>
    )
}

export default ProfileStatusWithHooks