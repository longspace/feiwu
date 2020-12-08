<!--
 * @Author: summer
 * @LastEditTime: 2020-12-08 18:09:50
-->
<template>
  <div class="dangerCenter">
    <div class="header">
      <web-header></web-header>
    </div>
    <div class="banner">
      <div class="banner-b">
        <web-banner-text></web-banner-text>
      </div>
    </div>
    <div class="product-center"><sift-condition></sift-condition></div>
  </div>
</template>

<script>
import WebHeader from "./components/web-header";
import WebBannerText from "./components/web-banner-text";
import SiftCondition from "./components/sift-condition";
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    WebHeader,
    WebBannerText,
    SiftCondition
  }
};
</script>
<style scoped lang="scss">
@import "../../../static/home/css/index.scss";
.banner {
  position: relative;
  background: url("../../../static/home/images/danger1.jpg") no-repeat 50% /
    cover;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    padding-top: calc(100% * (300 / 1920));
  }
  .banner-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}
.product-center {
  padding-top: 30px;
  background: #f2f5f8;
}
</style>
