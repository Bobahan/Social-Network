import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) => {
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

    const changeText = (event) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            {!editMode
                ? <div><span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span></div>
                : <div><input value={status} onChange={changeText} onBlur={deactivateEditMode} autoFocus={true} /></div>}
        </div>
    )
}

export default ProfileStatusWithHooks