import React, { ChangeEvent, useEffect, useState } from "react";

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
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

type PropsType = { status: string, updateStatus: (status: string) => void }

export default ProfileStatusWithHooks