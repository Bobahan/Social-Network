import { Dispatch } from "redux"
import { chatAPI, ChatMessageType } from "../API/chat-api"
import { InferActionsType, ThunkType } from "./redux-store"

let initialState = {
    messages: [] as ChatMessageType[]
}

type initialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actionsChat = {
    setMessages: (messages: ChatMessageType[]) => ({ type: 'SET_MESSAGES', payload: { messages } } as const)
}

const newMessageHandlerCreator = (dispatch: Dispatch) => (messages: ChatMessageType[]) => {
    dispatch(actionsChat.setMessages(messages))
}

export const startMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType<ActionsType> => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

type ActionsType = InferActionsType<typeof actionsChat>
export default chatReducer 