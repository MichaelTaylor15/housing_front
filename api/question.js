import request from '@/utils/request'
export default {

    //问题主页包含热门、常见、未解决问题
    getAllQuestions() {
        return request({
            url: `/ucenter/question/getAllQuestion`,
            method: 'get',
        })
    },
    getQuestionById(id) {
        return request({
            url: `/ucenter/question/getQuestionInfoById/` + id,
            method: 'get',
        })
    },
    //所有的问题/搜索

    getAllQuestionsByContent(searchVo) {
        return request({
            url: `/ucenter/question/getAllQuestionsByContent`,
            method: 'post',
            data: searchVo
        })
    },
    //获取相关问题
    getSimilarQuestion(tags, questionId) {
        return request({
            url: `/ucenter/question/getSimilarQuestion/${tags}/${questionId}`,
            method: 'get',
        })
    },
    //用户发起提问
    insertQuestion(question) {
        return request({
            url: `/ucenter/question/insertQuestion`,
            method: 'post',
            data: question
        })
    },

    //获取用户提问的问题
    getUserQuestion(current, limit) {
        return request({
            url: `/ucenter/question/getUserQuestion/${current}/${limit}`,
            method: 'get',
        })
    }
}