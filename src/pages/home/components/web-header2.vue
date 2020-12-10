<!--
 * @Author: summer
 * @LastEditTime: 2020-12-10 15:31:51
-->
<template>
  <div class="header">
    <div class="header-logo">
      <img src="/static/home/images/logo.png" alt="" />
    </div>
    <div class="header-right">
      <ul class="nav">
        <router-link
          tag="li"
          :to="navItem.linkName"
          class="nav-item"
          v-for="(navItem, navIndex) in nav"
          :key="navItem.id"
          :class="{ active: navItem.isActive }"
          @click="changeItem(navIndex, navItem)"
        >
          {{ navItem.name }}
          <!-- <router-link :to="navItem.linkName" class="nav-link">{{
            navItem.name
          }}</router-link> -->
        </router-link>
      </ul>
      <div class="header-login">
        <router-link to="/memberLogin" class="login-link">登录</router-link>
        <router-link to="/loginIndex" class="register-link">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "首页",
          id: "1",
          linkName: "/",
          isActive: true
        },
        {
          name: "危险废物交易中心",
          id: "2",
          linkName: "/dangerGarbageTrading",
          isActive: false
        },
        {
          name: "一般固废交易中心",
          id: "3",
          linkName: "/generalGarbageTrading",
          isActive: false
        },
        {
          name: "资讯中心",
          id: "4",
          linkName: "/newsCenter",
          isActive: false,
          tag: [
            {
              secName: "政策解读",
              id: "4.1",
              isActive: false,
              linkName: "policy"
            },
            {
              secName: "行业动态",
              id: "4.2",
              isActive: false,
              linkName: "news"
            },
            {
              secName: "技术进展",
              id: "4.3",
              isActive: false,
              linkName: "technology-progress"
            },
            {
              secName: "国家名录",
              linkName: "national-roll",
              id: "4.4",
              isActive: false
            }
          ]
        },
        {
          name: "关于我们",
          linkName: "/about",
          id: "5",
          isActive: false
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    changeItem(navIndex) {
      this.nav.forEach((item, index) => {
        if (index == navIndex) {
          console.log("nav");
          navItem.isActive = true;
        } else {
          navItem.isActive = false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  .header-right {
    @include fja(space-between);
    .nav {
      width: 686px;
      @include fja(space-between);
      margin-right: 100px;
      .nav-item {
        position: relative;
        color: #333;
        font-size: 16px;
        line-height: 78px;
        border-bottom: 2px solid transparent;
        &:hover {
          border-bottom: 2px solid #4293f4;
          color: #4293f4;
        }
        &.active {
          border-bottom: 2px solid #4293f4;
          color: #4293f4;
        }
        .nav-drop {
          display: none;
          position: absolute;
          top: 80px;
          left: 0;
          // transform: translateX(-50%);
          width: 100%;
          background: #fff;
          text-align: center;
          width: 140px;
          .nav-arop-item {
            &:hover {
              .nav-drop-link {
                color: #4293f4;
              }
            }
            .nav-drop-link {
              display: inline-block;
              font-size: 14px;
              color: #666;
              line-height: 40px;
            }
          }
        }
      }
    }
    .header-login {
      .login-link {
        padding-right: 10px;
        font-size: 16px;
        color: #4293f4;
        border-right: 1px solid #4293f4;
      }
      .register-link {
        padding-left: 10px;
        font-size: 16px;
        color: #4293f4;
      }
    }
  }
}
</style>
