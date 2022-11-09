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
            .then(response => {
                return response.data
            })
    },
    loginMe: (email, password) => {
        return instance.post(`auth/login`, { email: email, password: password })
    }
}

export const profileAPI = {
    setProfile: (userID) => {
        return instance.get(`profile/${userID}`)
    },
    getStatus: (userID) => {
        return instance.get(`profile/status/${userID}`)
            .then(response => {
                return response.data
            })
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