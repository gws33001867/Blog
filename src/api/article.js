import axios from './http'

export function getArticle(pageNo, pageSize, queryBy, articleId) {
    console.log("debug:" + pageNo, +pageSize + queryBy + articleId);
    return axios({
        url: '/article/get',
        method: 'get',
        params: {
            pageNo,
            pageSize,
            queryBy,
            articleId
        }
    })
}
export function addArticle(data) {
    return axios({
        url: '/article/add',
        method: 'post',
        data
    })
}
export function getArticleById(id) {
    return axios({
        url: '/article/getById',
        method: 'get',
        params: {
            id
        }
    })
}

export function getTags(tag) {
    return axios({
        url: '/article/getTags',
        method: 'get',
        params: {
            tag
        }
    })
}

export function addComment(data) {
    return axios({
        url: '/article/comment',
        method: 'post',
        data
    })
}

export function getUserLike(userId, articleId) {
    return axios({
        url: '/article/isUserLike',
        method: 'get',
        params: {
            userId,
            articleId
        }
    })
}
export function addLike(userId, articleId) {
    return axios({
        url: '/article/addLike',
        method: 'post',
        params: {
            userId,
            articleId
        }
    })
}