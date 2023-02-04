import request from '@/utils/request'
export default {
    //登录验证
    loginSubmit(userInfo) {
        return request({
            url: `/ucenter/login`,
            method: 'post',
            data: userInfo,
        })
    },
    //根据token获取用户信息
    getUserInfoByToken() {
        return request({
            url: `/ucenter/getUserInfo`,
            method: 'get',
        })
    },
    //注册
    registerUser(userInfo) {
        return request({
            url: `/ucenter/register`,
            method: 'post',
            data: userInfo
        })
    },
    //发送短信验证码
    sendPhoneMessage(username, registerMode) {
        return request({
            url: `/ucenter/sendPhoneMessage/${username}/${registerMode}`,
            method: 'post',
        })
    },
    //点击收藏房屋功能
    favoriteHouse(str) {
        return request({
            url: `/ucenter/userfavorite/favorite/${str}`,
            method: 'post',
        })
    },
    //获取用户收藏的房源信息
    getfavoriteHouse(uid, current, limit) {
        return request({
            url: `/ucenter/userfavorite/getFavoriteHouse/${uid}/${current}/${limit}`,
            method: 'get',
        })
    },
    //获取用户房源浏览记录
    getUserHistory(uid) {
        return request({
            url: `/ucenter/browse/getHistory/${uid}`,
            method: 'get',
        })
    },
    //删除浏览记录
    deleteHistory(ids) {
        return request({
            url: `/ucenter/browse/deleteHistory`,
            method: 'post',
            data: ids
        })
    },
    //发送消息给用户
    sendMessage(message) {
        return request({
            url: `/ucenter/message/sendMessage`,
            method: 'post',
            data: message
        })
    },
    //统计用户未查看的消息数量
    getMessageNum(uid) {
        return request({
            url: `/ucenter/message/getMessageNum/${uid}`,
            method: 'get',
        })
    },
    //获取用户 已读/未读消息
    getUserMessage(current, limit, status, uid) {
        return request({
            url: `/ucenter/message/getUserMessage/${current}/${limit}/${status}/${uid}`,
            method: 'get',
        })
    },
    //将未读消息设置为已读
    setMessageRed(userMessageDtos) {
        return request({
            url: `/ucenter/message/setMessageRed`,
            method: 'post',
            data: userMessageDtos
        })
    },
    //获取用户发布的房源
    getUserHouse(uid, current, limit) {
        return request({
            url: `/ucenter/getMyHouse/${uid}/${current}/${limit}`,
            method: 'get',
        })
    },
}