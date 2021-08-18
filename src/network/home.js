import {request} from './request'

export function getMenusList() {
    return request({
        method: 'get',
        url: ''
    })
}

// 获取用户信息
export function getUserInfo() {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/profile',
        // headers: {
        //     Authorization: ''
        // }
    })
}

//编辑用户信息
export function editUserInfo(data) {
    return request({
        method: 'patch',
        url: '/mp/v1_0/user/profile',
        data
    })
}

// 编辑用户头像
export function editUserPhoto(data) {
    return request({
        method: 'patch',
        url: '/mp/v1_0/user/photo',
        data
    })
}