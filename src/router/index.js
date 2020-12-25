import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode: "history", // 去掉 #
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    // { path: "/index", redirect: "/" },
    {
      path: "/",
      name: "web",
      component: () => import("@/pages/home/components/web-layout"),
      redirect: "/index",

      children: [
        {
          path: "/index",
          name: "index",
          component: () => import("@/pages/home/index")
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/pages/home/about")
        },
        {
          path: "/support",
          name: "support",
          redirect: "/support/treaty",
          component: () => import("@/pages/home/support"),
          children: [
            // {
            //   path: "", // 空字符串
            //   component: () => import("@/pages/home/treaty"), // 空路由默认显示哪个组件可自行取舍
            // },
            {
              path: "treaty",
              name: "treaty",
              component: () => import("@/pages/home/treaty")
            },
            {
              path: "privacy",
              name: "privacy",
              component: () => import("@/pages/home/privacy")
            },
            {
              path: "notices",
              name: "notices",
              component: () => import("@/pages/home/notices")
            },
            {
              path: "accountManage",
              name: "accountManage",
              component: () => import("@/pages/home/account-manage")
            },
            {
              path: "feedback",
              name: "feedback",
              component: () => import("@/pages/home/feedback")
            }
          ]
        },
        {
          path: "/dangerGarbageTrade",
          name: "dangerGarbageTrade",
          component: () => import("@/pages/home/danger-garbage-trade")
          // 危险废物交易中心
        },
        {
          path: "/generalGarbageTrade",
          name: "generalGarbageTrade",
          component: () => import("@/pages/home/general-garbage-trade")
          // 一般废物交易中心
        },
        {
          path: "/productDetail",
          name: "productDetail",
          component: () => import("@/pages/home/product-detail")
        },
        {
          path: "/newsCenter",
          name: "newsCenter",
          redirect: "/newsCenter/policy",
          component: () => import("@/pages/home/components/news-center"),
          children: [
            // {
            //   path: "", // 空字符串
            //   component: () => import("@/pages/home/news-policy"), // 空路由默认显示哪个组件可自行取舍
            // },
            {
              path: "policy",
              name: "policy",
              component: () => import("@/pages/home/news-policy")
              // 新闻中心详情页面
            },

            {
              path: "wasteList",
              name: "wasteList",
              component: () => import("@/pages/home/news-waste-list")
              // 国家名录
            },
            {
              path: "progress",
              name: "progress",
              component: () => import("@/pages/home/news-progress")
              // 资讯中心-技术进展
            },
            {
              path: "industryTrends",
              name: "industryTrends",
              component: () => import("@/pages/home/news-industry-trends")
              // 资讯中心 行业动态
            }
          ]
        },
        {
          path: "/newsDetail",
          name: "newsDetail",
          component: () => import("@/pages/home/news-detail")
          // 新闻中心详情页面
        },
        {
          path: "/search",
          name: "search",
          component: () => import("@/pages/home/search")
        }
      ]
    },
    {
      path: "/loginIndex",
      name: "loginIndex",
      component: () => import("@/pages/home/web-login/index") // 注册角色选择页面
    },
    // {
    //   path: "/",
    //   name: "index",
    //   component: () => import("@/pages/home/index")
    // },

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
        }
      ]
    }

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
