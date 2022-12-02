import { ProfileType } from './../types/types';
import axios, { AxiosResponse } from "axios"

const instance = axios.create({
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

type AuthMeType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodesForCaptchaEnum
    messages: Array<string>
}

type LogoutType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    authMe: () => {
        return instance.get<AuthMeType>(`auth/me`).then(res => res.data)
    },
    login: (email: string, password: string, rememberMe = false, captcha: string | null = null) => {
        return instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout: () => {
        return instance.delete<LogoutType>(`auth/login`).then(res => res.data)
    }
}

export const profileAPI = {
    getProfile: (userID: number) => {
        return instance.get<ProfileType>(`profile/${userID}`).then(res => res.data)
    },
    getStatus: async (userID: number) => {
        let response = await instance.get(`profile/status/${userID}`)
        return response.data
    },
    updateStatus: (status: string) => {
        return instance.put('profile/status/', { status: status })
    },
    updatePhoto: (photo: any) => {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put('profile', profile)
    }
}

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow: (userID: number) => {
        return instance.post(`follow/${userID}`)
    },
    unfollow: (userID: number) => {
        return instance.delete(`follow/${userID}`)
    }
}

type SecurityAPIType = {
    url: string
}

export const securityAPI = {
    getCapcha: () => {
        return instance.get<SecurityAPIType>('security/get-captcha-url').then(res => res.data)
    }
}