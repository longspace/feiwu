<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 14:10:49
-->
<template>
  <div class="header">
    <div class="header-logo">
      <img src="/static/home/images/logo2.png" alt="" />
    </div>
    <div class="header-right">
      <ul class="nav">
        <li class="nav-item" v-for="navItem in nav" :key="navItem.id">
          <router-link :to="navItem.linkName" class="nav-link">{{
            navItem.name
          }}</router-link>
          <!-- <ul class="nav-drop" v-if="navItem.tag">
            <li
              class="nav-arop-item"
              v-for="secodNav in navItem.tag"
              :key="secodNav.id"
            >
              <router-link :to="secodNav.linkName" class="nav-drop-link">
                {{ secodNav.secName }}
              </router-link>
            </li>
          </ul> -->
        </li>
      </ul>
      <div class="header-login">
        <router-link to="/web-login" class="login-link">登录</router-link>
        <router-link to="web-/register" class="register-link">注册</router-link>
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
          linkName: "/index"
        },
        {
          name: "危险废物交易中心",
          id: "2",
          linkName: "/danger-garbage-trading"
        },
        {
          name: "一般固废交易中心",
          id: "3",
          linkName: "/ordinary-garbage-trading"
        },
        {
          name: "咨询中心",
          id: "4",
          linkName: "/advisory-center",
          tag: [
            {
              secName: "政策解读",
              id: "4.1",
              linkName: "policy"
            },
            {
              secName: "行业动态",
              id: "4.2",
              linkName: "news"
            },
            {
              secName: "技术进展",
              id: "4.3",
              linkName: "technology-progress"
            },
            {
              secName: "国家名录",
              linkName: "national-roll",
              id: "4.4"
            }
          ]
        },
        {
          name: "关于我们",
          linkName: "/about",
          id: "5",
          tag: [
            {
              secName: "公司简介",
              id: "5.1",
              linkName: "company"
            },
            {
              secName: "平台介绍",
              id: "5.2",
              linkName: "platform"
            },
            {
              secName: "发展历程",
              id: "5.3",
              linkName: "progress"
            },
            {
              secName: "联系我们",
              id: "5.4",
              linkName: "contact"
            }
          ]
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
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.header {
  @include fja(space-between);
  color: $font-color;
  @include width;
  .header-right {
    @include fja(space-between);
    .nav {
      width: 686px;
      @include fja(space-between);
      margin-right: 100px;
      .nav-item {
        position: relative;
        &:hover {
          .nav-drop {
            display: block;
          }
        }
        .nav-link {
          display: inline-block;
          color: #fff;
          font-size: 16px;
          line-height: 78px;
          border-bottom: 2px solid;
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
        color: #fff;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
      }
      .register-link {
        padding-left: 10px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
