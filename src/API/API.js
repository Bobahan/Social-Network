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
    login: (email, password, rememberMe = false, captcha) => {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout: () => {
        return instance.delete(`auth/login`)
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
    },
    updatePhoto: (photo) => {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile: (profile) => {
        return instance.put('profile', profile)
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
    },
    unfollow: (userID) => {
        return instance.delete(`follow/${userID}`)
    }
}

export const securityAPI = {
    getCapcha: () => {
        return instance.get('security/get-captcha-url')
    }
}