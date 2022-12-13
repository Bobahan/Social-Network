export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

let ws: WebSocket

const closeHandler = () => {
    setTimeout(connectChannel, 3000)
}

const connectChannel = () => {
    ws?.removeEventListener('close', closeHandler) // if ws !== null
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // if ws === null
    ws.addEventListener('close', closeHandler)
    /// ЗАСАНДАЛИТЬ ws (новый канал)
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
    }
}

// callbackListener - функция которая возвращает массив сообщений
// subscribers - массив подписчиков, здесь сидят подпичики - функции

// когда происходит подписка мы этого подписчика добавляем в массив подписчиков 