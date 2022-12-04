import { PhotosType } from './../types/types';
import { ProfileType } from "../types/types"
import { instance, ResponseType } from "./API"

export const profileAPI = {
    getProfile: (userID: number) => {
        return instance.get<ProfileType>(`profile/${userID}`).then(res => res.data)
    },
    getStatus: async (userID: number) => {
        return await instance.get<string>(`profile/status/${userID}`).then(res => res.data)
    },
    updateStatus: async (status: string) => {
        return await instance.put<ResponseType>('profile/status/', { status: status }).then(res => res.data)
    },
    updatePhoto: async (photo: any) => {
        let formData = new FormData()
        formData.append('image', photo)
        return await instance.put<ResponseType<SavePhotoResponseType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile: async (profile: ProfileType) => {
        return await instance.put<ResponseType>('profile', profile).then(res => res.data)
    }
}

type SavePhotoResponseType = { photos: PhotosType }