<!--
 * @Author: summer
 * @LastEditTime: 2020-12-08 10:14:59
-->
<template>
  <div class="welcome-index">
    <div class="welcome-header">
      <div class="header">
        <div class="header-logo">
          <img src="/static/home/images/logo.png" alt="" />
        </div>
        <div class="header-login">
          <div class="header-login-toast">
            <span>已有账号，</span>
            <router-link to="web-login">马上登录</router-link>
            <router-link to="index" class="back-home">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="welcome-title">欢迎注册</div>
    <div class="welcome-desc">
      欢迎来到固废驿站，请选择您的账号角色，请注意，一旦选定角色无法更改！
    </div>
    <div class="role-list">
      <router-link to="webRegisterManage" tag="div" class="role-item">
        <div class="role-img">
          <img src="/static/home/images/login1.png" alt="" />
        </div>
        <div class="role-name">我是产废企业</div>
        <div class="role-item-desc">产生危险废物需要处置</div>
        <div class="role-register">注册账号</div>
      </router-link>
      <router-link to="webRegisterProduct" tag="div" class="role-item">
        <div class="role-img">
          <img src="/static/home/images/login2.png" alt="" />
        </div>
        <div class="role-name">我是产废企业</div>
        <div class="role-item-desc">处置利用危险废物的持证单位</div>
        <div class="role-register">注册账号</div>
      </router-link>
    </div>
    <router-link to="weblogin" tag="div" class="button-login"
      >已有账号，立即登录</router-link
    >
    <div class="copy">
      @Copyingright 中合润一科技有限公司 版权所有 沪ICP备xxxxxxxx号
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.welcome-header {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    widows: 96%;
    max-width: 1200px;
    margin: 0 auto;
    .header-login-toast {
      color: #999;
      .back-home {
        margin-left: 32px;
        color: #333;
      }
    }
  }
}
.welcome-title {
  padding-top: 96px;
  font-size: 34px;
  line-height: 1em;
  color: #333;
  text-align: center;
  font-weight: bold;
  &::after {
    content: "";
    display: block;
    margin: 26px auto 26px;
    width: 55px;
    height: 3px;
    background: linear-gradient(90deg, #3888e7, #9fc3f8);
  }
}
.welcome-desc {
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #999;
}
.role-list {
  display: flex;
  justify-content: center;
  width: 96%;
  max-width: 730px;
  margin: 50px auto 0;
  .role-item {
    cursor: pointer;
    flex: 1;
    padding: 40px 36px 55px;
    text-align: center;
    color: #fff;
    background-color: #4293f4;
    .role-name {
      margin-top: 24px;
      font-size: 20px;
      line-height: 26px;
    }
    .role-item-desc {
      font-size: 14px;
      line-height: 26px;
      margin-bottom: 42px;
    }
    .role-register {
      margin: 0 auto;
      width: 230px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      border: 1px solid #fff;
    }
    &:last-child {
      margin-left: 30px;
      background-color: #f3a824;
    }
  }
}
.button-login {
  width: 246px;
  margin: 84px auto;
  line-height: 48px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #4293f4;
  color: #4293f4;
  cursor: pointer;
}
.copy {
  padding-bottom: 58px;
  font-size: 14px;
  line-height: 2em;
  text-align-last: center;
  color: #666;
}
</style>
