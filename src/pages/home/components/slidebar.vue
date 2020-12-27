<!--
 * @Author: summer
 * @LastEditTime: 2020-12-27 17:42:09
-->
<template>
  <div class="slidebar">
    <div class="slidebar-list">
      <div
        class="slidebar-item"
        v-for="fontItem in slideBar.slice(0, 1)"
        :key="fontItem.id"
        @mouseover="fontItem.isActive = true"
        @mouseleave="fontItem.isActive = false"
      >
        <div class="slide-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <img :src="fontItem.activeUrl" alt="" v-if="fontItem.isActive" />
              <img :src="fontItem.inactiveUrl" alt="" v-else />
            </div>
            <p>{{ fontItem.title }}</p>
          </div>
        </div>
      </div>
      <div
        class="slidebar-item"
        v-for="slideItem in slideBar.slice(1, 3)"
        :key="slideItem.id"
        @mouseover="slideItem.isActive = true"
        @mouseleave="slideItem.isActive = false"
      >
        <div class="slide-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <img
                :src="slideItem.activeUrl"
                alt=""
                v-if="slideItem.isActive"
              />
              <img :src="slideItem.inactiveUrl" alt="" v-else />
            </div>
            <p>{{ slideItem.title }}</p>
          </div>
          <div class="slidebar-hidden">
            {{ slideItem.hideText }}
          </div>
        </div>
      </div>
      <div
        class="slidebar-item"
        v-for="followItem in slideBar.slice(3, 4)"
        :key="followItem.id"
        @mouseover="followItem.isActive = true"
        @mouseleave="followItem.isActive = false"
      >
        <div class="slide-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <img
                :src="followItem.activeUrl"
                alt=""
                v-if="followItem.isActive"
              />
              <img :src="followItem.inactiveUrl" alt="" v-else />
            </div>
            <p>{{ followItem.title }}</p>
          </div>
          <div class="slidebar-hidden">
            <div class="slidebar-hidden-img">
              <p>微信公众号</p>
              <p>
                <img :src="followItem.wechatImg" alt="" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="slidebar-item"
        v-for="backSlideItem in slideBar.slice(4, 5)"
        :key="backSlideItem.id"
        @mouseover="backSlideItem.isActive = true"
        @mouseleave="backSlideItem.isActive = false"
      >
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div id="components-back-top-demo-custom">
              <a-back-top :visibilityHeight="visibilityHeight">
                <p class="inactive-img">
                  <img
                    :src="backSlideItem.activeUrl"
                    alt=""
                    v-if="backSlideItem.isActive"
                  />
                  <img :src="backSlideItem.inactiveUrl" alt="" v-else />
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
          isActive: false,
          inactiveUrl: "/static/home/images/slide1.png",
          title: "在线客服",
          activeUrl: "/static/home/images/slide2.png"
        },
        {
          id: 2,
          isActive: false,
          inactiveUrl: "/static/home/images/slide3.png",
          title: "电话资讯",
          activeUrl: "/static/home/images/slide4.png",
          hideText: "021-1234567"
        },
        {
          id: 3,
          isActive: false,
          inactiveUrl: "/static/home/images/slide5.png",
          title: "电子邮箱",
          activeUrl: "/static/home/images/slide6.png",
          hideText: "xxxxxx@163.com"
        },
        {
          id: 4,
          isActive: false,
          inactiveUrl: "/static/home/images/slide7.png",
          title: "关注我们",
          activeUrl: "/static/home/images/slide8.png",
          weiboImg: "/static/home/images/weibocode.jpg",
          wechatImg: "/static/home/images/wechatcode.jpg"
        },
        {
          id: 5,
          isActive: false,
          inactiveUrl: "/static/home/images/slide9.png",
          title: "TOP",
          activeUrl: "/static/home/images/slide10.png"
        }
      ]
    };
  },
  methods: {}
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
      position: relative;
      padding-top: 18px;
      padding-bottom: 18px;
      font-size: 12px;
      line-height: 34px;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      .slidebar-hidden {
        position: absolute;
        right: 0;
        top: 50%;
        opacity: 0;
        width: 130px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-50%);
        font-size: 14px;
        text-align: center;
        pointer-events: none;
        min-height: 40px;
        white-space: nowrap;
        border-radius: 3px;
        background: #fff;
        img {
          width: 100px;
          height: 100px;
        }
        // display: none;
      }
      &:hover {
        color: #4293f4;
        .slidebar-hidden {
          right: 72px;
          opacity: 1;
          transition: all ease-in 0.5s;
          .slidebar-hidden-img {
            &:nth-child(2) {
              margin-top: 4px;
            }
          }
        }
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
.slidebar-item {
  &:hover {
    #components-back-top-demo-custom .ant-back-top p {
      color: #4293f4;
    }
  }
}
</style>
