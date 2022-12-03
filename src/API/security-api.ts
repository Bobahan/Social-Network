import { instance } from "./API"

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCapcha: () => {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url').then(res => res.data)
    }
}