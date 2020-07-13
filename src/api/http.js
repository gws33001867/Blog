import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
    getToken,
    removeToken
} from '@/utils/auth'
import {
    message
} from 'ant-design-vue'
const instance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 6000
})
// request拦截器
instance.interceptors.request.use(config => {
    // Do something before request is sent
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    //console.log(config)
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if (response.data.code == 2003 || response.data.code == 2000 || response.data.code == 2004) {
                return Promise.resolve(response.data)
            }
            //console.log(response.data)

            message.success(
                response.data.msg,
                2,
            );
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        // console.log(error.response.data.code) // for debug
        if (error.response.data.code == 4008 || error.response.data.code == 4007 || error.response.data.code == 4006) {

            removeToken();
            router.push('/')
        } else if (error.response.data.code == 5001) {
            //console.log(error.response.data.errors[0].field + error.response.data.errors[0].message)
            message.error(
                error.response.data.errors[0].message,
                2
            )
        } else {
            message.error(
                error.response.data.msg,
                2
            )
        }

        return Promise.reject(error.response)
    })

export default instance