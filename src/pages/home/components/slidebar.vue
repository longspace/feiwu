<!--
 * @Author: summer
 * @LastEditTime: 2020-12-21 14:34:03
-->
<template>
  <div class="slidebar">
    <div class="slidebar-list">
      <div
        class="slidebar-item"
        v-for="slideItem in slideBar.slice(0, 4)"
        :key="slideItem.id"
      >
        <div class="slide-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <img :src="slideItem.inactiveUrl" alt="" />
            </div>
            <p>{{ slideItem.title }}</p>
          </div>
        </div>
      </div>
      <div
        class="slidebar-item"
        v-for="backSlideItem in slideBar.slice(4, 5)"
        :key="backSlideItem.id"
      >
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div id="components-back-top-demo-custom">
              <a-back-top :visibilityHeight="visibilityHeight">
                <p class="inactive-img">
                  <img :src="backSlideItem.inactiveUrl" alt="" />
                </p>
                <p>{{ backSlideItem.title }}</p>
              </a-back-top>
            </div>
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
      slidebarActive: false,
      visibilityHeight: -1,
      slideBar: [
        {
          id: 1,
          inactiveUrl: "/static/home/images/slide1.png",
          title: "在线客服",
          activeUrl: "/static/home/images/slide2.png"
        },
        {
          id: 2,
          inactiveUrl: "/static/home/images/slide3.png",
          title: "电话资讯",
          activeUrl: "/static/home/images/slide4.png"
        },
        {
          id: 3,
          inactiveUrl: "/static/home/images/slide5.png",
          title: "电子邮箱",
          activeUrl: "/static/home/images/slide6.png"
        },
        {
          id: 4,
          inactiveUrl: "/static/home/images/slide7.png",
          title: "关注我们",
          activeUrl: "/static/home/images/slide8.png"
        },
        {
          id: 5,
          inactiveUrl: "/static/home/images/slide9.png",
          title: "TOP",
          activeUrl: "/static/home/images/slide10.png"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.arrayTest();
  },
  methods: {
    arrayTest() {
      const cities = [
        { name: "在线客服", visited: "no" },
        { name: "电话资讯", visited: "no" },
        { name: "电子邮箱", visited: "no" },
        { name: "关注我们", visited: "no" }
      ];
      const cityNames = Array.from(cities, ({ name }) => {
        console.log("name:", name);
        return name;
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.slidebar {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 99;
  .slidebar-list {
    padding-left: 9px;
    padding-right: 9px;
    width: 72px;
    color: #333;
    border-radius: 3px;
    box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.35);
    background: #fff;
    .slidebar-item {
      padding-top: 18px;
      padding-bottom: 18px;
      font-size: 12px;
      line-height: 34px;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      .slidebar-hidden {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss">
#components-back-top-demo-custom .ant-back-top {
  position: static;
  width: 100%;
  height: auto;
}
</style>
