import { ProfileType, UsersType } from './../types/types';
import axios, { AxiosResponse } from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e01547c5-945f-413f-9374-0c81df120f42"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptchaEnum {
    CaptchaIsRequied = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, C = ResultCodesEnum> = {
    data: D
    resultCode: C
    messages: Array<string>
}