import { getNavsData, getSwiperData } from '../../../api/index'

export default {
  namespaced: true,
  state: {
    navs: [],
    swipers: []
  },
  mutations: {
    ['SET_NAVS'](state, payload) {
      state.navs = payload.navs
      // console.log(state.navs);
    },
    ['SET_SWIPER'](state, payload) {
      state.swipers = payload.swipers
      console.log(state.swipers)
    }
  },
  actions: {
    getNavs(conText) {
      getNavsData().then(res => {
        // console.log(res);
        if (res.code === 200) {
          conText.commit('SET_NAVS', { navs: res.data })
        }
      })
    },
    getSwiper(conText, payload) {
      getSwiperData().then(res => {
        console.log(res.data)
        if (res.code === 200) {
          conText.commit('SET_SWIPER', { swipers: res.data })
          if (payload.success) {
            payload.success()
          }
        }
      })
    }
  }
}
