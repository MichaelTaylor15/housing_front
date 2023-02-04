import request from '@/utils/request'
export default {

    //搜索
    searchHouseList(searchObj, current, limit) {

        return request({
            url: `/ucenter/house/searchHouse/${current}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },

    //发布房源信息
    publishOrUpdateHouseInfo(houseObj, tags) {
        return request({
            url: `/ucenter/house/insertOrUpdateHouseInfo/` + tags,
            method: 'post',
            data: houseObj
        })
    },

    //查询房子信息
    getHouseInfoById(id) {
        return request({
            url: `/ucenter/house/getHouseInfoById/` + id,
            method: 'get',
        })
    },

    //根据地址获取坐标信息
    getLocation(city, address) {
        return request({
            url: `/ucenter/house/getLocation/${city}/${address}`,
            method: 'get',
        })
    },

    //获取类似房源
    getsimilarHouses(house) {
        return request({
            url: `/ucenter/house/getSimilarHouse`,
            method: 'post',
            data: house
        })
    },
    //获取房子的标签数组、床卫数量
    getHouseTags(houseId) {
        return request({
            url: `/ucenter/housetag/getHouseTags/${houseId}`,
            method: 'get',
        })
    },
}