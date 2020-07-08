import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    login,
    getInfo
} from '@/api/user'

// 用户模块的状态管理，暂时存储token和name信息
const state = {
    token: getToken(),
    name: '',
    userId: '',
    avatar: '',
    //introduction: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    // SET_INTRODUCTION: (state, introduction) => {
    //     state.introduction = introduction
    // },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },

}

const actions = {
    login({
        commit
    }, userInfo) {
        const {
            userName,
            password
        } = userInfo
        return new Promise((resolve, reject) => {
            login({
                userName: userName.trim(),
                password: password
            }).then(response => {
                const {
                    data
                } = response
                commit('SET_TOKEN', data.token)
                commit('SET_NAME', data.userName)
                commit('SET_USERID', data.userId)
                commit('SET_AVATAR', data.userAvatar)
                setToken(data.token)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get user info
    getInfo({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {
                    data
                } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const {
                    userName,
                    userId,
                    userAvatar
                } = data

                commit('SET_NAME', userName)
                commit('SET_USERID', userId)
                commit('SET_AVATAR', userAvatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}