import { ProfileType } from "../types/types"
import { instance, ResponseType } from "./API"

export const profileAPI = {
    getProfile: (userID: number) => {
        return instance.get<ProfileType>(`profile/${userID}`).then(res => res.data)
    },
    getStatus: async (userID: number) => {
        let response = await instance.get(`profile/status/${userID}`)
        return response.data
    },
    updateStatus: (status: string) => {
        return instance.put<ResponseType>('profile/status/', { status: status })
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