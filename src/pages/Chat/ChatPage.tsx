import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ws } from "../../API/chat-api";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppStateType, DispatchType } from "../../redux/redux-store";
import Preloader from "../../Components/Common/Preloader/Preloader";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch<DispatchType>()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' ? <div>Some error occured. Please refresh the page</div> :
                <>
                    <Messages />
                    <AddMessageForm />
                </>
            }
        </div>
    )
}

const Messages: React.FC<{}> = ({ }) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    return (
        <div style={{ 'height': '300px', 'overflowY': 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div style={{ 'margin': '10px 10px' }}>
            <img style={{ 'width': '70px' }} src={message.photo} />
            <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                <div>{message.userName}</div>
                <div style={{ 'marginLeft': '10px' }}>{message.message}</div>
            </div>
            <hr style={{ 'width': '95%' }} />
        </div>
    )
}

const AddMessageForm: React.FC<{}> = ({ }) => {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch<DispatchType>()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <div><input onChange={(e) => setMessage(e.currentTarget.value)} value={message} /></div>
            <div><button onClick={sendMessageHandler}>Send</button></div>
        </div>
    )
}

// задизейбли если readyState не OPEN
// true буолуохтаах disable
// readyState 1 !=== 0 

export default ChatPage