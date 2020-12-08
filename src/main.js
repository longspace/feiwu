/*
 * @Author: summer
 * @LastEditTime: 2020-12-04 20:24:58
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import antdesignvue from "ant-design-vue";
Vue.use(antdesignvue);

// import VueQuillEditor from "vue-quill-editor";
// Vue.use(VueQuillEditor);
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";

import functions from "@/utils/functions/index.js";
Vue.use(functions);

import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title+'_工业废物数字化交易平台V1.0'
  NProgress.start(); // 进度条开始
  if (to.meta.requireAuth) {
    let token = localStorage.getItem("AuthToken");
    if (token !== "" && token != null) {
      next();
    } else {
      next({
        path: "/memberLogin",
        query: { redirect: to.fullPath }
      });
      setTimeout(() => {
        NProgress.done();
      }, 50);
    }
  } else {
    next();
  }
  next();
});
router.afterEach(() => {
  // 后置守卫，导航被确认
  setTimeout(() => {
    NProgress.done();
  }, 50);
  // NProgress.done() // 结束Progress
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
