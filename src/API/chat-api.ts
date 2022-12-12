

let subscribers = [] as SubscribersType[]

let websocket: WebSocket

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

const closeHandler = () => {
    console.log('CLOSED WS')
    setTimeout(connectChannel, 3000)
}

const connectChannel = () => {
    websocket?.removeEventListener('close', closeHandler)
    websocket?.close()
    websocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    websocket.addEventListener('close', closeHandler)
}

export const chatAPI = {
    subscribe(observer: SubscribersType) {
        subscribers.push(observer)
    },
    unsubscribe(observer: SubscribersType) {
        subscribers = subscribers.filter(s => s !== observer)
    }
}

type SubscribersType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}