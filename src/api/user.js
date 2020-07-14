import request from './http'
import axios from 'axios'
import {
    getToken
} from '@/utils/auth'

//注册
const register = data => {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

//登录
const login = data => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

//获取用户信息
const getInfo = token => {
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            token
        }
    })
}

//修改用户名
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

const getArticleListByUser = (pageNo, pageSize, userId) => {
    return request({
        url: '/article/getByUserId',
        method: 'get',
        params: {
            pageNo,
            pageSize,
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