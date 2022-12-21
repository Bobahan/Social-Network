import { chatAPI, StatusType } from './../API/chat-api';
import { ChatMessageType } from "../API/chat-api"
import { InferActionsType, ThunkType } from "./redux-store"
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

const initialState = {
    messages: [] as ChatMessageIDType[],
    status: 'pending' as StatusType
}

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.message.map(m => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - 10)
            }
        case 'CHANGE_STATUS':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

let _memoizeMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_memoizeMessageHandler === null) {
        _memoizeMessageHandler = (messages) => {
            dispatch(actionsChat.setMessages(messages))
        }
    }
    return _memoizeMessageHandler
}

let _memoizeStatusHandler: ((status: StatusType) => void) | null = null
const statusHandlerCreator = (dispatch: Dispatch) => {
    if (_memoizeStatusHandler === null) {
        _memoizeStatusHandler = (status) => {
            dispatch(actionsChat.changeStatus(status))
        }
    }
    return _memoizeStatusHandler
}

export const startMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.startChannel()
    chatAPI.subscribe('messages', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status', statusHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.unsubscribe('messages', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status', statusHandlerCreator(dispatch))
    chatAPI.stopChannel()
}

export const sendMessage = (message: string): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.sendMessage(message)
}

const actionsChat = {
    setMessages: (message: ChatMessageType[]) => ({ type: 'SET_MESSAGE', payload: { message } } as const),
    changeStatus: (status: StatusType) => ({ type: 'CHANGE_STATUS', payload: { status } } as const)
}

type ActionsType = InferActionsType<typeof actionsChat>
type InitialStateType = typeof initialState
type ChatMessageIDType = ChatMessageType & { id: string }