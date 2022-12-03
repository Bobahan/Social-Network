import { instance } from "./API"

type SecurityAPIType = {
    url: string
}

export const securityAPI = {
    getCapcha: () => {
        return instance.get<SecurityAPIType>('security/get-captcha-url').then(res => res.data)
    }
}