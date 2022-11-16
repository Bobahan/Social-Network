import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e01547c5-945f-413f-9374-0c81df120f42"
    }
})

export const authAPI = {
    authMe: () => {
        return instance.get(`auth/me`)
    },
    login: (email, password, rememberMe = false) => {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout: () => {
        return instance.delete(`/auth/login`)
    }
}

export const profileAPI = {
    setProfile: (userID) => {
        return instance.get(`profile/${userID}`)
    },
    getStatus: async (userID) => {
        let response = await instance.get(`profile/status/${userID}`)
        return response.data
    },
    updateStatus: (status) => {
        return instance.put('profile/status/', { status: status })
    }
}

export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow: (userID) => {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
    unfollow: (userID) => {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    }
}