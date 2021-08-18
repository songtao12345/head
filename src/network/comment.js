import {request} from './request'


// 获取评论
export function getCommentList(page,per_page,response_type) {
    return request({
        method: 'get',
        url: '/mp/v1_0/articles',
        params: {
            // status,
            page,
            per_page,
            // channel_id,
            // begin_pubdate,
            // end_pubdate,
            response_type
        }
     
    })
}

//修改评论状态
export function changeCommentStatus(article_id, allow_comment) {
    return request({
        method: 'put',
        url: '/mp/v1_0/comments/status',
        params: {
            article_id
        },
        data: {
            allow_comment
        }
    })
}