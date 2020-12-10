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
      path: "/forget",
      name: "forget",
      component: () => import("@/pages/home/web-login/forget")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/pages/home/about")
    },
    {
      path: "/generalGarbageTrading",
      name: "generalGarbageTradingt",
      component: () => import("@/pages/home/general-garbage-trading")
      // 一般废物交易中心
    },
    {
      path: "/dangerGarbageTrading",
      name: "dangerGarbageTradingt",
      component: () => import("@/pages/home/danger-garbage-trading")
      // 危险废物交易中心
    },
    {
      path: "/newsCenter",
      name: "newsCenter",
      component: () => import("@/pages/home/news-center")
      // 危险废物交易中心
    },

    {
      path: "/memberRegisterProduct",
      name: "memberRegisterProduct",
      component: () => import("@/pages/home/web-login/member-register-product")
    },
    {
      path: "/memberRegisterHandle",
      name: "memberRegisterHandle",
      component: () => import("@/pages/home/web-login/member-register-handle")
    },
    {
      path: "/memberLogin",
      name: "memberLogin",
      component: () => import("@/pages/home/web-login/memberLogin")
    },
    {
      path: "/product",
      name: "product",
      component: () => import("@/pages/home/product")
    },
    {
      path: "/productDetail",
      name: "productDetail",
      component: () => import("@/pages/home/product-detail")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/pages/home/search")
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
          meta: { title: "订单列表", requireAuth: true ,userType:[1]}
        },
        {
          path: "booklist",
          name: "booklist",
          component: () => import("@/pages/member/orders/book"),
          meta: { title: "预购清单", requireAuth: true }
        },
        {
          path: "goodslist",
          name: "goodslist",
          component: () => import("@/pages/member/goods/list"),
          meta: { title: "商品列表", requireAuth: true }
        },
        {
          path: "goodsform",
          name: "goodsform",
          component: () => import("@/pages/member/goods/form"),
          meta: { title: "商品添加", requireAuth: true }
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
