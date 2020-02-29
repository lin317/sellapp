//所有请求封装文件(方便后期维护)
import axios from 'axios'
import qs from 'qs'

//创建一个请求对象
// axios.defaults.baseURL='http://localhost:3000'
let req = axios.create({
    baseURL: 'http://192.168.0.103:3000', //基本路径
    timeout: 10000 //ms 请求10s，如果10s还没有请求，则超时（一般8-12s）
})
export function getSeller() {
    return req.get('/api/seller', qs.stringify())
}
export function getGoods() {
    return req.get('/api/goods', qs.stringify())
}
export function getRatings() {
    return req.get('/api/ratings', qs.stringify())
}