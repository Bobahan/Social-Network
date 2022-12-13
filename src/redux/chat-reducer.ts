import { chatAPI } from './../API/chat-api';
import { ChatMessageType } from "../API/chat-api"
import { InferActionsType, ThunkType } from "./redux-store"
import { Dispatch } from 'redux';

const initialState = {
    messages: [] as ChatMessageType[]
}
type InitialStateType = typeof initialState

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.message]
            }
        default:
            return state
    }
}

const actionsChat = {
    setMessages: (message: ChatMessageType[]) => ({ type: 'SET_MESSAGE', payload: { message } } as const),
}
type ActionsType = InferActionsType<typeof actionsChat>

let _memoizeMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_memoizeMessageHandler === null) {
        _memoizeMessageHandler = (messages) => {
            dispatch(actionsChat.setMessages(messages))
        }
    }
    return _memoizeMessageHandler
}

export const startMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.startChannel()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatAPI.stopChannel()
}

export const sendMessage = (message: string): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.sendMessage(message)
}