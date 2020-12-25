<!--
 * @Author: summer
 * @LastEditTime: 2020-12-25 12:10:40
-->
<template>
  <div class="news">
    <div class="banner"></div>
    <div class="news-tab">
      <div
        class="news-tab-item"
        v-for="newsTabItem in newsTabs"
        :key="newsTabItem.id"
        :class="$route.path.indexOf(newsTabItem.link) !== -1 ? 'active' : ''"
        @click="changeTab(newsTabItem)"
      >
        {{ newsTabItem.title }}
      </div>
    </div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNewsDetail: false,
      newsTabs: [
        {
          id: 1,
          title: "政策解读",
          link: "/newsCenter/policy",
          isActive: true
        },
        {
          id: 2,
          title: "行业动态",
          link: "/newsCenter/industryTrends",
          isActive: false
        },
        {
          id: 3,
          title: "技术进展",
          link: "/newsCenter/progress",
          isActive: false
        },
        {
          id: 4,
          title: "国家名录",
          link: "/newsCenter/wasteList",
          isActive: false
        }
      ],
      transitionName: "slide-forward"
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  // watch: {
  //   $route(to, from) {
  //     if (!this.map[to.path]) {
  //       this.map[to.path] = +new Date() + 1;
  //     }
  //     if (!this.map[from.path]) {
  //       this.map[from.path] = +new Date();
  //     }

  //     if (this.map[to.path] > this.map[from.path]) {
  //       this.transitionName = "slide-forward";
  //     } else {
  //       this.transitionName = "slide-back";
  //     }
  //   }
  // },
  methods: {
    // 选项卡切换
    changeTab(newsTabItem) {
      this.$router.push({ path: newsTabItem.link });
      // this.newsTabs.forEach((item, index) => {
      //   if (index === newsTabIndex) {
      //     item.isActive = true;
      //   } else {
      //     item.isActive = false;
      //   }
      // });
    }
  }
};
</script>
<style scoped lang="scss">
.news {
  overflow: hidden;
  .banner {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: 300px;
    // font-size: 36px;
    // color: #fff;
    background: url("/static/home/images/news-banner.jpg") no-repeat 50% / cover;
  }
  .news-tab {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    margin-bottom: 60px;
    .news-tab-item {
      cursor: pointer;
      width: 140px;
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      font-size: 18px;
      color: #333;
      text-align: center;
      border: 1px solid #e5e5e5;
      &:not(:last-child) {
        margin-right: 36px;
      }
      &:hover {
        color: #fff;
        background: #4293f4;
        border: none;
      }
    }
    .active {
      color: #fff;
      background: #4293f4;
      border: none;
    }
  }
}
</style>
<style lang="scss">
.slide-forward-enter {
  transform: translate(100%);
}
.slide-forward-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-forward-leave-active {
  transform: translate(-100%);
  transition: all 0.5s ease-in-out;
}

.slide-back-enter {
  transform: translate(-100%);
}
.slide-back-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-back-leave-active {
  transform: translate(100%);
  transition: all 0.5s ease-in-out;
}
</style>
