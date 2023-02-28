const closeHandler = () => {
  console.log('WebSocket is CLOSED');
  notifyStatus('pending');
  setTimeout(createChannel, 2000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages'].forEach((s) => s(newMessages));
};

const openHandlder = () => {
  notifyStatus('ready');
};

const errorHandler = () => {
  console.log('WebSocket error');
};

const cleanup = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandlder);
  ws?.removeEventListener('error', errorHandler);
};

const notifyStatus = (status: StatusType) => {
  subscribers['status'].forEach((s) => s(status));
};

const createChannel = () => {
  cleanup();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifyStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandlder);
  ws.addEventListener('error', errorHandler);
};

const subscribers = {
  messages: [] as MessageSubscribersType[],
  status: [] as StatusSubscribeType[],
};

export const chatAPI = {
  subscribe(event: EventType, callbackListener: MessageSubscribersType | StatusSubscribeType) {
    //@ts-ignore
    subscribers[event].push(callbackListener);
  },
  unsubscribe(event: EventType, callbackListener: MessageSubscribersType | StatusSubscribeType) {
    //@ts-ignore
    subscribers[event] = subscribers[event].filter((s) => s !== callbackListener);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
  startChannel() {
    createChannel();
  },
  stopChannel() {
    subscribers['messages'] = [];
    subscribers['status'] = [];
    cleanup();
    ws?.close();
  },
};

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export let ws: WebSocket | null = null;

export type StatusType = 'pending' | 'ready' | 'error';

type EventType = 'messages' | 'status';

type MessageSubscribersType = (messages: ChatMessageType[]) => void;
type StatusSubscribeType = (status: StatusType) => void;
