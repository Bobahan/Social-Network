export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('WS CLOSED')
    notifyStatus('pending')
    setTimeout(createChannel, 2000)
}

const openHanlder = () => {
    notifyStatus('ready')
}

const errorHandler = (event: any) => {
    notifyStatus('error')
    console.error('WebSocket error: ', event)
}

const cleanup = () => {
    ws?.removeEventListener('close', closeHandler) // если ws есть то отпишись
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHanlder)
    ws?.removeEventListener('error', errorHandler)
}

const notifyStatus = (status: StatusType) => {
    subscribers['status'].forEach(s => s(status))
}

const createChannel = () => {
    cleanup()
    ws?.close() // если ws есть то закрой канал
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // if ws === null
    notifyStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHanlder)
    ws.addEventListener('error', errorHandler)
}

// добавляем сообщенния
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages'].forEach(s => s(newMessages))
}

type EventsNamesType = 'messages' | 'status'

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesSubscribersType = (messages: ChatMessageType[]) => void
type StatusSubscribersType = (status: StatusType) => void

let subscribers = {
    'messages': [] as MessagesSubscribersType[],
    'status': [] as StatusSubscribersType[]
}

export const chatAPI = {
    subscribe(event: EventsNamesType, callbackListener: MessagesSubscribersType | StatusSubscribersType) {
        //@ts-ignore
        subscribers[event].push(callbackListener)
    },
    unsubscribe(event: EventsNamesType, callbackListener: MessagesSubscribersType | StatusSubscribersType) {
        //@ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callbackListener)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    startChannel() {
        createChannel()
    },
    stopChannel() {
        subscribers['messages'] = []
        subscribers['status'] = []
        cleanup()
        ws?.close()
    }
}

// callbackListener - функция которая возвращает массив сообщений
// subscribers - массив подписчиков, здесь сидят подпичики - функции

// когда происходит подписка мы этого подписчика добавляем в массив подписчиков


// мы начали с функции подписок -> к нам уверенно залетают 2 подписчика - это функция сообщений и функция статуса
// мы этих подписчиков храним в массиве 

let subs = {
    'messages': [{}],
    'status': []
}

// subscribe(event, listener) {
//   subs['messages'].push(listener)
// }