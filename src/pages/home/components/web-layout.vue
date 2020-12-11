<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 09:58:28
-->
<template>
  <div class="web-layout">
    <web-header />
    <slide-bar></slide-bar>
    <router-view />
    <web-footer />
  </div>
</template>

<script>
import WebHeader from "./web-header";
import WebFooter from "./web-footer";
import SlideBar from "./slidebar";
export default {
  data() {
    return {};
  },
  components: { WebHeader, WebFooter, SlideBar },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
.web-layout {
  .ant-layout-header {
    padding: 0;
    height: auto;
    width: 100%;
  }
  .ant-layout-footer {
    padding: 0;
  }
}
</style>
