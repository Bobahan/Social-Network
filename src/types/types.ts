export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string,
    contacts: ContactsType
    photos: PhotosType
}

// type Nullable<T> = null | T

// const initialState = {
//     age: 10,
//     name: 'Vladimir',
//     photo: null as Nullable<PhotosType>
// }

// type initialStateType = typeof initialState

// const reducer = (state = initialState, action: ActionType): initialStateType => {
//     switch (action.type) {
//         case 'SET_AGE':
//             return {
//                 ...state,
//                 age: 123
//             }
//         case 'SET_NAME':
//             return {
//                 ...state,
//                 name: action.firstName + ' ' + action.lastName
//             }
//         default:
//             return state
//     }
// }

// type InferFn<T> = T extends { [key: string]: infer R } ? R : never

// const actions = {
//     AC1: (age: number) => ({ type: 'SET_AGE', age } as const),
//     AC2: (firstName: string, lastName: string) => ({ type: 'SET_NAME', firstName, lastName } as const)
// }

// type ActionType = ReturnType<InferFn<typeof actions>>