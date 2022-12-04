import { instance } from "./API"

export const securityAPI = {
    getCapcha: () => {
        return instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url').then(res => res.data)
    }
}

type GetCaptchaUrlResponseType = { url: string }