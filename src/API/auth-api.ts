import { instance, ResultCodesEnum, ResultCodesForCaptchaEnum } from "./API"

type ResponseType<D = {}, C = ResultCodesEnum> = {
    data: D
    resultCode: C
    messages: Array<string>
}

type AuthMeType = { id: number, email: string, login: string }
type LoginType = { userId: number }

export const authAPI = {
    authMe: () => {
        return instance.get<ResponseType<AuthMeType, ResultCodesEnum>>(`auth/me`).then(res => res.data)
    },
    login: (email: string, password: string, rememberMe = false, captcha: string | null = null) => {
        return instance.post<ResponseType<LoginType, ResultCodesEnum | ResultCodesForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout: () => {
        return instance.delete<ResponseType>(`auth/login`).then(res => res.data)
    }
}