import router from './router'
import store from './store'
import {
    getToken
} from '@/utils/auth'

// router.beforeEach((to, from, next) => {
//     const hasToken = getToken()
//     console.log(1)
//     if (hasToken) {
//         const {
//             userName
//         } = await store.dispatch("user/getInfo", hasToken);
//         console.log(store)
//     }
//     console.log(hasToken)
// })