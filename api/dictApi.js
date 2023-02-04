import request from '@/utils/request'
export default {

    getChildrenArea(cityName) {
        return request({
            url: `/ucenter/dict/searchChildrenArea/` + cityName,
            method: 'post',
        })
    },

}