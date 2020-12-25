<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 17:47:17
-->
<template>
  <div class="support">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>帮助中心</a-breadcrumb-item>
        <a-breadcrumb-item>用户协议</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="support-list">
      <div class="support-menu">
        <div class="support-menu-title">帮助中心</div>
        <ul class="menu-list">
          <li
            v-for="(menuItem, index) in menu"
            :key="menuItem.id"
            class="menu-item"
            @click="gotoAddress(menuItem.link, index)"
            :class="$route.path.indexOf(menuItem.link) !== -1 ? 'active' : ''"
          >
            <p>{{ menuItem.title }}</p>
          </li>
        </ul>
      </div>
      <div class="support-content">
        <transition name="slide-back">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          id: 1,
          title: "用户协议",
          isActive: true,
          value: "用户协议",
          link: "treaty"
        },
        {
          id: 2,
          title: "隐私政策",
          isActive: false,
          value: "隐私政策",
          link: "privacy"
        },
        {
          id: 3,
          title: "法律声明",
          isActive: false,
          value: "法律声明",
          link: "notices"
        },
        {
          id: 4,
          title: "账户管理",
          isActive: false,
          value: "账户管理",
          link: "accountManage"
        },
        {
          id: 5,
          title: "问题反馈",
          isActive: false,
          value: "问题反馈",
          link: "feedback"
        },
        {
          id: 6,
          title: "联系客服",
          isActive: false,
          value: "联系客服",
          link: "service"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    gotoAddress(name, index) {
      this.menu.forEach((item, key) => {
        if (key == index) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      console.log("哈哈哈");
      this.$router.push({ name: name });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../static/home/css/index.scss";
.support {
  padding-top: 10px;
  padding-bottom: 44px;
  background: #f2f5f8;
  .breadcrumb {
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .support-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 96%;
    max-width: 1200px;
    margin: 10px auto 0;
    overflow: hidden;
    .support-menu {
      width: 200px;
      margin-right: 30px;
      text-align: center;
      background-color: #fff;
      .support-menu-title {
        text-align: center;
        font-size: 20px;
        line-height: 70px;
        color: #fff;
        background: url("/static/home/images/support1.jpg") no-repeat 50% /
          cover;
      }

      .menu-list {
        .menu-item {
          cursor: pointer;
          padding-left: 30px;
          padding-right: 30px;
          font-size: 16px;
          line-height: 60px;
          color: #333;
          &:last-child {
            p {
              border-top: 1px solid #e5e5e5;
            }
          }
          &.active {
            color: #4293f4;
            border-right: 3px solid #4293f4;
          }
        }
      }

      //   .contact-service {
      //     line-height: 60px;
      //     padding-left: 30px;
      //     padding-right: 30px;
      //   }
    }
    .support-content {
      flex: 1;

      background: #fff;
    }
  }
}
</style>
<style lang="scss">
.support .breadcrumb .ant-breadcrumb {
  font-size: 12px;
}
.fade-enter-active {
  transition: all 0.2s ease;
}
.fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.children {
  padding-left: 44px;
  padding-right: 44px;
  .children-title {
    padding-top: 22px;
    padding-bottom: 22px;
    font-size: 22px;
    line-height: 1em;
    color: #333;
    border-bottom: 1px solid #e5e5e5;
  }
  .children-text {
    padding-top: 32px;
    padding-bottom: 70px;
    font-size: 14px;
    line-height: 26px;
    color: #333;
    .children-part {
      .children-part-title {
        margin-top: 14px;
        margin-bottom: 6px;
        font-size: 16px;
        line-height: 28px;
        color: #333;
        font-weight: bold;
      }
    }
  }
}
</style>
