<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="layout-logo" >{{logoTitle}}</div>
      <a-menu
			mode="inline"
      :defaultSelectedKeys="defaultSelectedKeys"
			:openKeys="currentOpenKeys"
			:style="{  borderRight: 0 }"
			@click="clickMenu"
			@openChange="openChange">
      <template v-for="(item,index) in menuItem">
        <template v-if="item.children.length == 0">
        <a-menu-item :key="item.path">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
        </template>
        <template v-else>
        <a-sub-menu :key="item.key">
          <span slot="title"><a-icon :type="item.icon" /> <span>{{item.title}}</span></span>
          <a-menu-item v-for="(items,itemsindex) in item.children" :key="items.path" style="padding-left: 55px; height: 35px; line-height: 35px; border-bottom: 1px solid #efecec; margin-bottom: 0;">{{items.title}}</a-menu-item>
        </a-sub-menu>
        </template>

      </template>
      </a-menu>
    </a-layout-sider>

    <a-layout>
		<a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerMenu" />
        <!-- @click="() => (collapsed = !collapsed)" -->
		<a-dropdown style="float:right;margin-right:12px;" placement="bottomRight">
			<a class="ant-dropdown-link" @click="e => e.preventDefault()">
			<a-icon type="user" /> admin，你好 <a-icon type="down" />
			</a>
			<a-menu slot="overlay" @click="onHeaderClick">
				<a-menu-item key="1"  @click="profile"><a-icon type="edit" />修改资料</a-menu-item>
				<a-menu-item key="2"  @click="logout"><a-icon type="close" />退出系统</a-menu-item>
			</a-menu>
		</a-dropdown>

      </a-layout-header>

      <!-- <a-breadcrumb style="margin: 0 10px; padding: 8px 10px; background: #FFFFFF; border-bottom:#e6e6e7 solid 1px ;">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>系统设置</a-breadcrumb-item>
        <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      </a-breadcrumb> -->

      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <a-layout-footer style="textAlign: center;color: #999999;">
        ©2020 技术支持：<a href="http://www.forsite.cn" target="_blank" style="color: #999999;">上海页溪网络科技有限公司</a>
      </a-layout-footer>
    </a-layout>

  </a-layout>
</template>
<script>
import {doLogin} from "@/utils/http/index.js"
export default {
	name:'layout',
		data() {
		return {
			logoTitle:'页溪后台管理中心',
			collapsed: false,
      currentOpenKeys:[1], // 重点 当前展开的菜单
      defaultSelectedKeys:['dashboard'], // 默认选中的菜单
      menuItem:[
        {key:1,title:'仪表盘','path':'dashboard',icon:'global',children:[]},
        // {key:2,title:'活动报名管理','path':'action',icon:'flag',children:[{key:21,title:'活动报名',icon:'','path':'actionRegForm'},{key:22,title:'报名列表',icon:'','path':'actionRegList'}]},
        // {key:3,title:'客户关系管理','path':'customer',icon:'apartment',children:[{key:31,title:'新增客户',icon:'','path':'customerForm'},{key:32,title:'客户管理',icon:'','path':'customerList'}]},
        // {key:4,title:'爱心捐款管理','path':'money',icon:'dollar',children:[{key:41,title:'新增捐款',icon:'','path':'moneyForm'},{key:42,title:'捐款管理',icon:'','path':'moneyList'}]},
        // {key:8,title:'附件管理','path':'fujian',icon:'folder',children:[{key:81,title:'文件',icon:'','path':'file'},{key:82,title:'图片',icon:'','path':'image'},{key:83,title:'视频',icon:'','path':'vedio'}]},
        {key:7,title:'文章管理','path':'article',icon:'form',children:[{key:71,title:'添加文章',icon:'','path':'articleForm'},{key:72,title:'文章列表',icon:'','path':'articleList'},{key:73,title:'分类管理',icon:'','path':'articleClass'},{key:74,title:'标签管理',icon:'','path':'articleTag'},{key:74,title:'附件管理',icon:'','path':'source'}]},
         {key:77,title:'产品管理','path':'fujian',icon:'shop',children:[{key:71,title:'添加产品',icon:'','path':'file'},{key:72,title:'产品列表',icon:'','path':'image'},{key:73,title:'分类管理',icon:'','path':'vedio'},{key:74,title:'产品属性',icon:'','path':'vedio'},{key:74,title:'规格管理',icon:'','path':'vedio'},{key:74,title:'导入导出',icon:'','path':'vedio'}]},
        {key:81,title:'订单管理','path':'order',icon:'dollar',children:[{key:81,title:'订单列表',icon:'','path':'orderList'},{key:82,title:'退款订单 ',icon:'','path':'orderBack'}]},
        {key:82,title:'会员管理','path':'member',icon:'team',children:[{key:81,title:'会员列表',icon:'','path':'memberList'},{key:82,title:'积分等级 ',icon:'','path':'score'},{key:83,title:'注册设置',icon:'','path':'register'}]},
        {key:83,title:'营销活动','path':'action',icon:'deployment-unit',children:[{key:81,title:'留言管理',icon:'','path':'message'},{key:82,title:'公告通知 ',icon:'','path':'notice'},{key:83,title:'友情链接',icon:'','path':'flink'}]},
        {key:9,title:'系统设置','path':'configs',icon:'setting',children:[{key:94,title:'全局设置',icon:'','path':'global'},{key:91,title:'用户管理',icon:'','path':'userList'},{key:92,title:'角色权限',icon:'','path':'roleAuth'},{key:93,title:'数据备份',icon:'','path':'backup'},{key:93,title:'操作日志',icon:'','path':'logs'}]},
      ]
		};
	 },
	methods:{
		triggerMenu(){
			this.collapsed = !this.collapsed
			if(this.collapsed){
				this.logoTitle ='页溪网络'
			}else{
				this.logoTitle ='页溪后台管理中心'
			}
		},
		clickMenu(obj){
		  console.log("clickMenu",obj)
		  // this.$message.info('你点击了'+obj.key);
      this.$router.push(obj.key)
		},
		openChange(openKeys){
			console.log("openChange:",openKeys)
      if (openKeys.length !== 0) {
        this.currentOpenKeys = [openKeys[1]]
      } else {
        this.currentOpenKeys = ['']
      }
		},
		onHeaderClick(obj){
			console.log(obj)
		},
    logout(){
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
    profile(){
      this.$router.push('/profile')
    }
  },
  mounted() {
    doLogin()
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar-track-piece {
  background-color:#f8f8f8;
}
::-webkit-scrollbar {
  width:9px;
  height:9px;
}
::-webkit-scrollbar-thumb {
  background-color:#dcdcdc;
  background-clip:padding-box;
  min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color:#bbb;
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
  line-height: 50px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: center;
  border-bottom: #e6e6e7 solid 1px;
}
.ant-layout{ height: calc(100vh); background-color: #f0f2f5;}
.ant-layout-sider{ height: calc(100vh -50px);overflow-y: auto;overflow-x: hidden;box-shadow: 0 1px 3px 0 #e3eaefe0, 0 0 0 1px #e1e7ea;}
.ant-menu-inline .ant-menu-submenu-title{border-top: 1px solid #efecec;}

.ant-layout-header{
  height: 50px;
  line-height: 50px;
  background-color: #FFFFFF;
  width: calc(100%); //calc(100vh - 50px)
  z-index: 100;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}
.ant-layout-content{margin:0 10px 10px 10px; padding: 10px; background: #fff; min-height: 280px; height: auto; overflow-y: auto;box-shadow: 0 1px 3px 0 #e3eaefe0, 0 0 0 1px #e1e7ea;}
.ant-layout-footer{padding:0px 0 8px 0;}
.ant-layout-sider-dark{ background: #ffffff;}

.ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title{margin-top: 0px;}


</style>
