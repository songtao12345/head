import {request} from './request'

// 获取用户图片素材
export function getImageList(params) {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/images',
        params
    })
}

// 收藏图片素材
export function collectImage(imageId,collect) {
    return request({
        method: 'PUT',
        ur: `/mp/v1_0/user/images/${imageId}`,
        data: {
           collect 
        }
    })
}

//上传用户图片
export function submitImage(data) {
    return request({
        method: 'post',
        url: '/mp/v1_0/user/images',
        data
    })
}