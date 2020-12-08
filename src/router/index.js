import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode: "history", // 去掉 #
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/pages/home/index")
    },
    {
      path: "/loginIndex",
      name: "loginIndex",
      component: () => import("@/pages/home/web-login/index")
    },
    {
      path: "/webRegisterProduct",
      name: "webRegisterProduct",
      component: () => import("@/pages/home/web-login/web-register-product")
    },
    {
      path: "/webRegisterManage",
      name: "webRegisterManage",
      component: () => import("@/pages/home/web-login/web-register-manage")
    },
    {
      path: "/webLogin",
      name: "weblLogin",
      component: () => import("@/pages/home/web-login/web-login")
    },
    {
      path: "/product",
      name: "product",
      component: () => import("@/pages/home//product")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/home/user/login")
    },
    {
      path: "/member",
      name: "member",
      component: () => import("@/pages/member/layout/index"),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/pages/member/dashboard/index"),
          meta: { title: "首页", requireAuth: true }
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/pages/member/dashboard/profile"),
          meta: { title: "修改密码", requireAuth: true }
        },
        {
          path: "company",
          name: "company",
          component: () => import("@/pages/member/company/index"),
          meta: { title: "修改资料", requireAuth: true }
        },
        {
          path: "orderlist",
          name: "orderlist",
          component: () => import("@/pages/member/orders/list"),
          meta: { title: "订单列表", requireAuth: true }
        },
        {
          path: "booklist",
          name: "booklist",
          component: () => import("@/pages/member/orders/book"),
          meta: { title: "预购清单", requireAuth: true }
        },
      ]
    },

    // {
    //   path: '/page404',
    //   component: () => import('@/pages/error/404'),
    //   meta:{title:'页面走丢了',requireAuth:true}
    // },
    // {
    //   path: '/*',
    //   redirect: "/page404",
    //   component: () => import('@/pages/error/404'),
    // },
  ]
});
