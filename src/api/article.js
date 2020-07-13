import axios from './http'

//获取文章列表
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

//发布文章
export function addArticle(data) {
    return axios({
        url: '/article/add',
        method: 'post',
        data
    })
}
//通过文章id获取文章信息
export function getArticleById(id) {
    return axios({
        url: '/article/getById',
        method: 'get',
        params: {
            id
        }
    })
}

//获取标签
export function getTags(tag) {
    return axios({
        url: '/article/getTags',
        method: 'get',
        params: {
            tag
        }
    })
}

//评论
export function addComment(data) {
    return axios({
        url: '/article/comment',
        method: 'post',
        data
    })
}

//获取用户是否点赞该文章
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

//点赞
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

//删除文章
export function deleteArticle(articleId) {
    return axios({
        url: '/article/deleteArticle',
        method: 'post',
        params: {
            articleId
        }
    })
}

//文章编辑
export function editArticle(data) {
    return axios({
        url: '/article/editArticle',
        method: 'post',
        data
    })
}