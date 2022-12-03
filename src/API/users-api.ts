import { GetItemsType, instance, ResponseType } from "./API"

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow: (userID: number) => {
        return instance.post<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unfollow: (userID: number) => {
        return instance.delete<ResponseType>(`follow/${userID}`).then(res => res.data)
    }
}