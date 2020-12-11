<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 09:26:20
-->
<template>
  <div
    class="web-header"
    ref="webHeader"
    :class="$route.path.indexOf('/index') !== -1 ? 'index-header' : ''"
  >
    <div class="header-menu">
      <div class="header-logo">
        <div
          class="index-logo"
          v-if="this.$route.path === '/' || this.$route.path === '/index'"
        >
          <img src="/static/home/images/logo2.png" alt="" />
        </div>
        <div class="other-logo" v-else>
          <img src="/static/home/images/logo.png" alt="" />
        </div>
      </div>
      <div class="header-right">
        <ul class="nav" v-if="nav.length">
          <!-- :to="navItem.linkName" -->
          <router-link
            :to="navItem.linkName"
            tag="li"
            class="nav-item"
            v-for="(navItem, navIndex) in nav"
            :key="navItem.id"
            :class="
              $route.path.indexOf(navItem.linkName) !== -1 ? 'active' : ''
            "
            @click="getRouter(navIndex)"
          >
            {{ navItem.name }}
            <!-- <router-link :to="navItem.linkName" class="nav-link">{{
            navItem.name
          }}</router-link> -->
          </router-link>
        </ul>
        <div class="header-login">
          <div class="header-avatar" v-if="userInfo.isLogin">
            <a-popover
              v-model="userPopVisible"
              placement="bottomRight"
              trigger="hover"
              class="userPopover"
            >
              <!-- <a slot="content" @click="hide">Close</a> -->
              <div class="user" slot="content" @click="hide">
                <div class="user-info">
                  <div class="user-avatar">
                    <div class="user-avatar-b">
                      <img :src="userInfo.avatarUrl" alt="" />
                    </div>
                  </div>
                  <div class="user-r">
                    <div class="user-name">
                      <span>{{ userInfo.name }}</span>
                      <img
                        src="/static/home/images/vip2.png"
                        alt=""
                        v-if="userInfo.isVip"
                      />
                    </div>
                    <p class="identity-description">
                      {{ userInfo.identityDescription }}
                    </p>
                  </div>
                </div>
                <div class="user-bottom">
                  <router-link to="/login" class="user-admin"
                    >进入管理后台>></router-link
                  >
                  <div class="logout">退出</div>
                </div>
              </div>
              <div class="avatar">
                <div class="small-avatar">
                  <img :src="userInfo.avatarUrl" alt="" />
                </div>

                <div class="vip-icon" v-if="userInfo.isVip">
                  <img src="/static/home/images/vip.png" alt="" />
                </div>
              </div>
            </a-popover>
          </div>
          <div class="header-visitor" v-else>
            <router-link to="/memberLogin" class="login-link">登录</router-link>
            <router-link to="/loginIndex" class="register-link"
              >注册</router-link
            >
          </div>
        </div>
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
          linkName: "/index",
          isActive: true
        },
        {
          name: "危险废物交易中心",
          id: "2",
          linkName: "/dangerGarbageTrade",
          isActive: false
        },
        {
          name: "一般固废交易中心",
          id: "3",
          linkName: "/generalGarbageTrade",
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
      ],
      isIndex: true,
      other: "",
      userInfo: {
        id: "1111",
        isLogin: true,
        isVip: true,
        identityDescription: "您当前是尊贵的VIP会员",
        name: "测试账号01",
        avatarUrl:
          "https://dcdn.it120.cc/2020/12/10/630b4cf5-765c-4142-a128-19907a177974.png"
      },
      userPopVisible: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getIndex();
    // this.getRouter();
  },
  methods: {
    getIndex() {
      console.log("isIndex", this.isIndex);
      if (this.$route.path.indexOf("/index")) {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
    },
    // getRouter(navIndex) {
    //   console.log("当前页面", this.$route.path);
    //   if (this.$route.path === "/index") {
    //     this.$refs.webHeader.classList.add("index-header");
    //     console.log("首页链接");
    //   }
    //   this.nav.forEach((navItem, index) => {
    //     console.log("索引", index);
    //     if (index === navIndex) {
    //       navItem.isActive = true;
    //       this.$router.push({ path: navItem.linkName });
    //       console.log("当前页面", this.$route.path);
    //       console.log("活跃");
    //     } else {
    //       navItem.isActive = false;
    //       console.log("不活跃");
    //     }
    //   });
    //   if (this.$route.path === "/index") {
    //     this.$refs.webHeader.classList.add("index-header");
    //     console.log("首页才添加");
    //   }
    // },
    hide() {
      console.log(111);
      this.userPopVisible = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.web-header {
  background: #fff;
  .header-menu {
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
          color: #333;
          font-size: 16px;
          line-height: 78px;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          &:hover {
            border-bottom: 2px solid #4293f4;
          }
          &.active {
            border-bottom: 2px solid #4293f4;
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
        .header-avatar {
          position: relative;
          .avatar {
            position: relative;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            &::before {
              content: "";
              display: block;
              padding-bottom: 100%;
            }
            .small-avatar {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .vip-icon {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
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
}
.index-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  background: transparent;
  .header-menu {
    .header-right {
      .nav {
        .nav-item {
          color: #fff;
          &:hover {
            border-bottom: 2px solid #fff;
          }
          &.active {
            border-bottom: 2px solid #fff;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ant-popover-inner-content {
  padding: 0;
}
.user {
  width: 248px;
  .user-info {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    .user-avatar {
      position: relative;
      margin-right: 11px;
      width: 52px;
      border-radius: 50%;
      overflow: hidden;
      &::before {
        content: "";
        display: block;
        padding-top: 100%;
        border-radius: 50%;
      }
      .user-avatar-b {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .user-r {
      .user-name {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        color: #333;
        img {
          margin-left: 10px;
        }
      }
      .identity-description {
        font-size: 13px;
        line-height: 22px;
        color: #999;
      }
    }
  }
  .user-bottom {
    display: flex;
    justify-content: space-between;
    padding: 12px 15px;
    .logout {
      cursor: pointer;
      width: 68px;
      height: 28px;
      line-height: 28px;
      border-radius: 3px;
      font-size: 14px;
      text-align: center;
      color: #333;
      border: 1px solid #d2d2d2;
    }
  }
}
</style>
