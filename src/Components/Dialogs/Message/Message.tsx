import React from "react";
import s from './Message.module.css';

const Message: React.FC<{ message: string }> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message