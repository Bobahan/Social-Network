export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(connectChannel, 3000)
}

const connectChannel = () => {
    ws?.removeEventListener('close', closeHandler) // if ws !== null
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // if ws === null
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

// добавляем сообщенния
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages)) // -> а для этого проходимся по массиву засандаливаем внутрь подписчика сообщение
}

type SubscribersType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscribersType[]

export const chatAPI = {
    subscribe(callbackListener: SubscribersType) {
        subscribers.push(callbackListener)
    },
    unsubscribe(callbackListener: SubscribersType) { // приходит подписчик
        subscribers = subscribers.filter(s => s !== callbackListener)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    startChannel() {
        connectChannel()
    },
    stopChannel() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    }
}

// callbackListener - функция которая возвращает массив сообщений
// subscribers - массив подписчиков, здесь сидят подпичики - функции

// когда происходит подписка мы этого подписчика добавляем в массив подписчиков 