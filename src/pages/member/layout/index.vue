<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="layout-logo"><img src="/static/images/logo.png" /></div>
      <a-menu mode="inline" :defaultSelectedKeys="defaultSelectedKeys" :openKeys="currentOpenKeys" :style="{  borderRight: 0 }"
        @click="clickMenu" @openChange="openChange">
        <template v-for="(item,index) in menuItem">
          <template v-if="item.children.length == 0">
            <a-menu-item :key="item.path">
              <a-icon :type="item.icon" />
              <span>{{item.title}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item.key">
              <span slot="title">
                <a-icon :type="item.icon" /> <span>{{item.title}}</span></span>
              <a-menu-item v-for="(items,itemsindex) in item.children" :key="items.path" style="padding-left: 55px; height: 35px; line-height: 35px; border-bottom: 1px solid #efecec; margin-bottom: 0;">{{items.title}}</a-menu-item>
            </a-sub-menu>
          </template>

        </template>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerMenu" /> -->
        <span style="padding: 0 0 0 12px;"><a-icon type="info-circle" style="font-size: 16px; padding-right: 10px;" />

        <template v-if="userInfo.business_license_expire_day < 180 ">
        <span style="color: red;">您的企业经营许可证还有 {{ userInfo.business_license_expire_day }} 天到期</span>
        </template>
        <template v-else>今天是 {{today}}</template>
         类型：{{userInfo.type}}
        </span>
        <div style="float:right;margin-right:12px;">
          <a href="/" target="_blank" style="color: #666; padding-right: 10px;">访问首页</a>
          <!-- <router-link to="/" target="_blank">访问首页</router-link> -->
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-icon type="user" /> {{userInfo.company_name}}，你好
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onHeaderClick">
              <a-menu-item key="1" @click="profile">
                <a-icon type="edit" />修改资料</a-menu-item>
              <a-menu-item key="2" @click="logout">
                <a-icon type="close" />退出系统</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- <a-breadcrumb style="margin: 0 10px; padding: 8px 10px; background: #FFFFFF; border-bottom:#e6e6e7 solid 1px ;">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>系统设置</a-breadcrumb-item>
        <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      </a-breadcrumb> -->

      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer style="textAlign: center;color: #999999;">
        ©2020 技术支持：<a href="http://www.forsite.cn" target="_blank" style="color: #999999;">上海页溪网络科技有限公司</a>
      </a-layout-footer>
    </a-layout>

  </a-layout>
</template>
<script>
  import {
    doLogin
  } from "@/utils/http/index.js"
  export default {
    name: 'layout',
    data() {
      return {
        userInfo:{
          company_name:'',
          type:'',
          business_license_expire_day:0
        },
        today:'',
        collapsed: false,
        currentOpenKeys: [1], // 重点 当前展开的菜单
        defaultSelectedKeys: ['dashboard'], // 默认选中的菜单
        menuItem: []
      };
    },
    methods: {
      triggerMenu() {
        this.collapsed = !this.collapsed
        if (this.collapsed) {
          this.logoTitle = '页溪网络'
        } else {
          this.logoTitle = '页溪后台管理中心'
        }
      },
      clickMenu(obj) {
        console.log("clickMenu", obj)
        this.$router.push(obj.key)
      },
      openChange(openKeys) {
        console.log("openChange:", openKeys)
        if (openKeys.length !== 0) {
          this.currentOpenKeys = [openKeys[1]]
        } else {
          this.currentOpenKeys = ['']
        }
      },
      onHeaderClick(obj) {
        console.log(obj)
      },
      logout() {
        let that = this;
        this.$confirm({
          title: '温馨提示',
          content: '您确定要退出吗',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            console.log('OK');
            localStorage.clear();
            that.$router.push('/')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      profile() {
        this.$router.push('/profile')
      }
    },
    mounted() {
      let obj = new Date();
      let objdate = {y:obj.getFullYear(),m:obj.getMonth()+1,d:obj.getDate()}
      this.today = objdate.y+"年"+objdate.m+"月"+objdate.d+'日';

      let userInfo = localStorage.getItem("userInfo");
      console.log("userInfo",userInfo)
      if(userInfo == null || userInfo == undefined){
        this.$message.error("您尚未登录或登录超时!");
        this.$router.push("/memberLogin")
      }
      userInfo = JSON.parse(userInfo);
      this.userInfo = userInfo
      if(userInfo.type == 2){
        this.menuItem = [{
            key: 1,
            title: '仪表盘',
            'path': 'dashboard',
            icon: 'global',
            children: []
          },
          {
            key: 2,
            title: '订单管理',
            'path': 'orders',
            icon: 'dollar',
            children: [{
              key: 21,
              title: '订单列表',
              icon: '',
              'path': 'orderlist'
            }, {
              key: 22,
              title: '预购清单',
              icon: '',
              'path': 'booklist'
            }]
          },
          {
            key: 3,
            title: '个人中心',
            'path': 'companySet',
            icon: 'user',
            children: [{
              key: 31,
              title: '企业资料',
              icon: '',
              'path': 'company'
            }, {
              key: 32,
              title: '修改密码',
              icon: '',
              'path': 'profile'
            }]
          },
        ];
      }else{
        this.menuItem = [{
            key: 1,
            title: '工作台',
            'path': 'dashboard',
            icon: 'global',
            children: []
          },
          {
            key: 2,
            title: '商品管理',
            'path': 'goods',
            icon: 'shopping-cart',
            children: [ {
              key: 21,
              title: '商品添加',
              icon: '',
              'path': 'goodsform'
            },{
              key: 22,
              title: '商品列表',
              icon: '',
              'path': 'goodslist'
            }]
          },
          {
            key: 3,
            title: '订单管理',
            'path': 'orders',
            icon: 'dollar',
            children: [{
              key: 31,
              title: '订单列表',
              icon: '',
              'path': 'orderlist'
            },
            {
              key: 32,
              title: '订单报表',
              icon: '',
              'path': 'orderreport'
            }]
          },
          {
            key: 9,
            title: '个人中心',
            'path': 'companySet',
            icon: 'user',
            children: [{
              key: 91,
              title: '企业资料',
              icon: '',
              'path': 'company'
            }, {
              key: 92,
              title: '修改密码',
              icon: '',
              'path': 'profile'
            }]
          },
        ]
      }
      doLogin()
    }
  };
</script>
<style lang="scss">
  ::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #dcdcdc;
    background-clip: padding-box;
    min-height: 28px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }
</style>
<style scoped lang="scss" rel="stylesheet/scss">
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 50px;
    padding: 0 10px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  .layout-logo {
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    font-size: 18px;
    text-align: center;
    border-bottom: #e6e6e7 solid 1px;
  }
  .layout-logo img{ height:40px; width: 160px; margin-top: 5px;}

  .ant-layout {
    height: calc(100vh);
    background-color: #f0f2f5;
  }

  .ant-layout-sider {
    height: calc(100vh -50px);
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 1px 3px 0 #e3eaefe0, 0 0 0 1px #e1e7ea;
  }

  .ant-menu-inline .ant-menu-submenu-title {
    border-top: 1px solid #efecec;
  }

  .ant-layout-header {
    height: 50px;
    line-height: 50px;
    background-color: #FFFFFF;
    width: calc(100%); //calc(100vh - 50px)
    z-index: 100;
    margin-bottom: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
  }

  .ant-layout-content {
    margin: 0 10px 10px 10px;
    padding: 10px;
    background: #fff;
    min-height: 280px;
    height: auto;
    overflow-y: auto;
    box-shadow: 0 1px 3px 0 #e3eaefe0, 0 0 0 1px #e1e7ea;
  }

  .ant-layout-footer {
    padding: 0px 0 8px 0;
  }

  .ant-layout-sider-dark {
    background: #ffffff;
  }

  .ant-menu-vertical .ant-menu-item,
  .ant-menu-vertical-left .ant-menu-item,
  .ant-menu-vertical-right .ant-menu-item,
  .ant-menu-inline .ant-menu-item,
  .ant-menu-vertical .ant-menu-submenu-title,
  .ant-menu-vertical-left .ant-menu-submenu-title,
  .ant-menu-vertical-right .ant-menu-submenu-title,
  .ant-menu-inline .ant-menu-submenu-title {
    margin-top: 0px;
  }
</style>
