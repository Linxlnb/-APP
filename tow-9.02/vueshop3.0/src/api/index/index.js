import config from '../../assets/js/conf/config'
import { request } from '../../assets/js/utils/request'
//首页快速导航
export function getNavsData() {
  return request(config.baseApi + '/home/index/nav?token=' + config.token)
}
//首页轮播图
export function getSwiperData() {
  return request(config.baseApi + '/home/index/slide?token=' + config.token)
}
