import request from '@/utils/request'
export default {

    //首页轮播图
    getBanner() {
        return request({
            url: `/ucenter/banner/getIndexBanner`,
            method: 'get',
        })
    },

}