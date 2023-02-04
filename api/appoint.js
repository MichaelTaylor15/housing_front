import request from '@/utils/request'
export default {
    //插入预约
    insertAppoint(appointment) {
        return request({
            url: `/ucenter/appointment/insert`,
            method: 'post',
            data: appointment
        })
    },
    //获取预约：待处理、已处理、我的预约
    getUserAppointment(current, limit, handle) {
        return request({
            url: `/ucenter/appointment/getUserAppointment/${current}/${limit}/${handle}`,
            method: 'get',
        })
    },
    //同意或忽略预约
    agreeOrIgnoreAppoint(appointId, status) {
        return request({
            url: `/ucenter/appointment/agreeOrIgnoreAppoint/${appointId}/${status}`,
            method: 'post',
        })
    },
}