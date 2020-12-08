<template>
  <div class="product">
    <web-header></web-header>
    <div class="banner">
      <div class="banner-b">
        <banner-text className="product"></banner-text>
      </div>
    </div>
  </div>
</template>

<script>
import WebHeader from "./components/web-header";
import BannerText from "./components/web-banner-text";
export default {
  data() {
    return {
      className: "product"
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: {
    WebHeader,
    BannerText
  }
};
</script>
<style scoped lang="scss">
.banner {
  position: relative;
  width: 100%;
  min-height: 300px;
  background: url("../../../static/home/images/danger1.jpg") no-repeat 50% /
    cover;
  &::before {
    content: "";
    display: block;
    padding-bottom: calc(100% * (300 / 1920));
  }
  .banner-b {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
