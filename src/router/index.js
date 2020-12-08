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
      path: "/webIndex",
      name: "webIndex",
      component: () => import("@/pages/home/web-index/index")
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
      path: "/admin",
      name: "admin",
      component: () => import("@/pages/admin/layout/index"),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/pages/admin/dashboard/index"),
          meta: { title: "首页", requireAuth: true }
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/pages/admin/dashboard/profile"),
          meta: { title: "个人资料", requireAuth: true }
        },
        {
          path: "content/form",
          name: "contentform",
          component: () => import("@/pages/admin/content/form"),
          meta: { title: "文章编辑", requireAuth: true }
        },
        {
          path: "content/articleList",
          name: "articleList",
          component: () => import("@/pages/admin/content/list"),
          meta: { title: "文章列表", requireAuth: true }
        },
        {
          path: "content/category",
          name: "contentcategory",
          component: () => import("@/pages/admin/content/category"),
          meta: { title: "文章分类", requireAuth: true }
        },
        {
          path: "content/attrlist",
          name: "contenttag",
          component: () => import("@/pages/admin/content/attrlist"),
          meta: { title: "文章标签", requireAuth: true }
        },
        {
          path: "goods/form",
          name: "goodsform",
          component: () => import("@/pages/admin/goods/form"),
          meta: { title: "商品编辑", requireAuth: true }
        },
        {
          path: "goods/goodsList",
          name: "goodsList",
          component: () => import("@/pages/admin/goods/list"),
          meta: { title: "商品列表", requireAuth: true }
        },
        {
          path: "goods/category",
          name: "goodscategory",
          component: () => import("@/pages/admin/goods/category"),
          meta: { title: "商品分类", requireAuth: true }
        },
        {
          path: "orders/list",
          name: "ordersList",
          component: () => import("@/pages/admin/orders/list"),
          meta: { title: "订单列表", requireAuth: true }
        },
        {
          path: "company/productList",
          name: "companyProductList",
          component: () => import("@/pages/admin/company/productlist"),
          meta: { title: "产废企业列表", requireAuth: true }
        },
        {
          path: "company/handleList",
          name: "companyHandleList",
          component: () => import("@/pages/admin/company/handlelist"),
          meta: { title: "处废企业列表", requireAuth: true }
        },
        {
          path: "configs/userList",
          name: "userList",
          component: () => import("@/pages/admin/system/user/list"),
          meta: { title: "用户列表", requireAuth: true }
        },
        {
          path: "configs/roleAuth",
          name: "roleAuth",
          component: () => import("@/pages/admin/system/user/roleauth"),
          meta: { title: "角色权限", requireAuth: true }
        },
        {
          path: "configs/global",
          name: "global",
          component: () => import("@/pages/admin/system/global"),
          meta: { title: "全局设置", requireAuth: true }
        },
        {
          path: "model/field",
          name: "field",
          component: () => import("@/pages/admin/model/field"),
          meta: { title: "字段管理", requireAuth: true }
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
