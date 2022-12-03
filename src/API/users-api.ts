import { GetItemsType, instance } from "./API"

type FollowType = {
    
}

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
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