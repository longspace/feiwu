<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 10:45:02
-->
<template>
  <div class="slidebar">
    <div class="slidebar-list">
      <div class="slidebar-item">
        <a href="#" class="slide-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <p class="active-img" v-if="slidebarActive">
                <img src="/static/home/images/slide1.png" alt="" />
              </p>
              <p class="inactive-img" v-else>
                <img src="/static/home/images/slide2.png" alt="" />
              </p>
            </div>
            <p>在线客服</p>
          </div>
        </a>
      </div>
      <div class="slidebar-item">
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <p class="active-img" v-if="slidebarActive">
                <img src="/static/home/images/slide3.png" alt="" />
              </p>
              <p class="inactive-img" v-else>
                <img src="/static/home/images/slide4.png" alt="" />
              </p>
            </div>
            <p>电话咨询</p>
          </div>
          <div class="slidebar-hidden">021-36382923</div>
        </div>
      </div>
      <div class="slidebar-item">
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <p class="active-img" v-if="slidebarActive">
                <img src="/static/home/images/slide5.png" alt="" />
              </p>
              <p class="inactive-img" v-else>
                <img src="/static/home/images/slide6.png" alt="" />
              </p>
            </div>
            <p>电子邮箱</p>
          </div>
          <div class="slidebar-hidden">
            xxxxxx@163.com
          </div>
        </div>
      </div>
      <div class="slidebar-item">
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div class="slide-bar-img">
              <p class="active-img" v-if="slidebarActive">
                <img src="/static/home/images/slide7.png" alt="" />
              </p>
              <p class="inactive-img" v-else>
                <img src="/static/home/images/slide8.png" alt="" />
              </p>
            </div>
            <p>关注我们</p>
          </div>
          <div class="slidebar-hidden">
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div class="slidebar-item">
        <div class="slidebar-b">
          <div class="slidebar-text">
            <div id="components-back-top-demo-custom">
              <a-back-top :visibilityHeight="visibilityHeight">
                <p class="active-img" v-if="slidebarActive">
                  <img src="/static/home/images/slide9.png" alt="" />
                </p>
                <p>TOP</p>
              </a-back-top>
            </div>
            <!-- <p>TOP2222</p> -->
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
      visibilityHeight: -1
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
