import request from '@/utils/request'
export default {
    //提交建议
    insertSuggest(suggest) {
        return request({
            url: `/ucenter/suggest/insertSuggest`,
            method: 'post',
            data: suggest
        })
    },
}