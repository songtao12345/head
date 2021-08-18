import {request} from './request'

// 获取文章列表数据
export function getArticle(status,page,per_page,channel_id,begin_pubdate,end_pubdate) {
    return request({
        method: 'get',
        url: '/mp/v1_0/articles',
        params: {
            status,
            page,
            per_page,
            channel_id,
            begin_pubdate,
            end_pubdate
        }
    })
}

// 获取文章频道
export function getArticleChannel() {
    return request({
        method: 'get',
        url: '/mp/v1_0/channels'
    })
}

// 删除文章
export function deleteArticle(target) {
    return request({
        method: 'delete',
        url: `/mp/v1_0/articles/${target}`,
        params: {
            target
        }
    })
}

//发表文章
export function publishArticle(title,content,cover,channel_id,draft = false) {
    return request({
        method: 'post',
        url: '/mp/v1_0/articles',
        params:{
            draft
        },
        data: {
            title,
            content,
            cover,
            channel_id
        }
        
    })
}

//获取指定文章
export function getArticleById(target) {
    return request({
        method: 'get',
        url: `/mp/v1_0/articles/${target}`,
        params: {
            target
        }
    })
}

// 编辑文章
// export function editArticle(target,title,content,cover,channel_id) {
//     return request({
//         method: 'put',
//         url: `/mp/v1_0/articles/${target}`,
//         data: {
//             target,
//             title,
//             content,
//             cover,
//             channel_id
//         }
//     })
// }

export function editArticle(target,data) {
    return request({
        method: 'put',
        url: `/mp/v1_0/articles/${target}`,
        data
    })
}