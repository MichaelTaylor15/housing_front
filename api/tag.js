import request from '@/utils/request'
export default {

    //获取所有配套信息
    getAllTags() {
        return request({
            url: `/ucenter/tag/getAllTags`,
            method: 'get',
        })
    },
    //获取指定房子的配套信息
    getTagsById(id) {
        return request({
            url: `/ucenter/tag/getTagsById/` + id,
            method: 'get',
        })
    },
}