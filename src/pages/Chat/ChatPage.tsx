import React, { useEffect, useState } from "react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let websocket: WebSocket // undefined

        const closeHandler = () => {
            console.log('CLOSED WS')
            setTimeout(connectChannel, 3000)
        }

        const connectChannel = () => {
            websocket?.removeEventListener('close', closeHandler)
            websocket?.close()
            websocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            websocket.addEventListener('close', closeHandler)
            setWsChannel(websocket)
        }

        connectChannel()

        return () => {
            websocket.removeEventListener('close', closeHandler)
            websocket.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevState) => [...prevState, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [channelStatus, setChannelStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setChannelStatus('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <div><input onChange={(e) => setMessage(e.currentTarget.value)} value={message} /></div>
            <div><button disabled={wsChannel === null || channelStatus !== 'ready'} onClick={sendMessage}>Send</button></div>
        </div>
    )
}

export default ChatPage