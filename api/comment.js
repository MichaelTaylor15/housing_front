import request from '@/utils/request'
export default {

    //获取评论信息
    getComment(id, current, limit) {
        return request({
            url: `/ucenter/comment/getQuestionComment/${id}/${current}/${limit}`,
            method: 'get',
        })
    },
    //插入评论
    insertComment(commentVo) {
        return request({
            url: `/ucenter/comment/insertComment`,
            method: 'post',
            data: commentVo
        })
    }

}