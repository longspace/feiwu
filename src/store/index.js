import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeModule: localStorage.getItem("activeModule") || 'console', //默认激活模块
    userInfo: [],
    menuPermission: localStorage.getItem("menuPermission"),
    nodePermission: localStorage.getItem("nodePermission"),
  },
  mutations: {
    setActiveModule(state, val) {
      state.activeModule = val;
      localStorage.setItem("activeModule", val)
    },
    setUserInfo(state, val) {
      state.userinfo = val;
    },
    setMenuPermission(state, val) {
      state.menuPermission = val;
      localStorage.setItem("menuPermission", val)
    },
    setNodePermission(state, val) {
      state.nodePermission = val;
      localStorage.setItem("nodePermission", val)
    }
  },
  actions: {

  }
})
export default store

