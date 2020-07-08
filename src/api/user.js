import request from './http'
import axios from 'axios'
import {
    getToken
} from '@/utils/auth'
const register = data => {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}
const login = data => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

const getInfo = token => {
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            token
        }
    })
}

const changeName = (name, userId) => {
    return request({
        url: '/user/changeName',
        method: 'POST',
        params: {
            name,
            userId
        }
    })
}
// 待修改,整合到同一个axios实例当中
let config = {
    baseURL: 'http://localhost:8888',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
const postAvatar = (formData) => {
    const token = getToken();
    if (token) {
        config.headers['token'] = token
    }
    return axios.post('/user/changeAvatar', formData, config)
}

const getArticleListByUser = (userId) => {
    return request({
        url: '/article/getByUserId',
        method: 'get',
        params: {
            userId
        }
    })
}


export {
    register,
    login,
    getInfo,
    postAvatar,
    changeName,
    getArticleListByUser
}