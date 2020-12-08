import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: [],
    menuPermission: localStorage.getItem("menuPermission"),
  },
  mutations: {
    setUserInfo(state, val) {
      state.userinfo = val;
    },
    setMenuPermission(state, val) {
      state.menuPermission = val;
      localStorage.setItem("menuPermission", val)
    },
  },
  actions: {

  }
})
export default store

