
import request from "@/utils/request"
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
// 限制：每个手机号每分钟一次
export const sendSms = mobile => {
    return request({
        method: 'Get',
        url: '/v1_0/sms/codes/' + mobile,
    })
}

// 获取用户自己的信息
export const getUserInfo = () => {
    return request({
        method: 'Get',
        url: '/v1_0/user',

        // 以下内容在拦截器就可以完成 所以可以省略
        //用来发送请求头数据
        // token的数据格式 Bearer token数据  注意Bearer后有一个空格
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 获取用户的频道列表
export const getUserChannels = () => {
    return request({
        method: 'Get',
        url: '/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        method: 'post',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: '/v1_0/user/followings/' + target,
    })
}

// 获取当前登录用户的个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
    })
}

// 修改用户资料
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}


// 修改用户照片
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}