import {request} from './request'

// 获取登陆的账密信息
export function getLogin(mobile,code) {
    return request({
        method: 'post',
        url: '/mp/v1_0/authorizations',
        data: {
            'mobile': mobile,
            'code': code
        }
    })
}