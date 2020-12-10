<!--
 * @Author: summer
 * @LastEditTime: 2020-12-10 15:16:01
-->
<template>
  <div class="search">
    搜索
    <web-header></web-header>
  </div>
</template>

<script>
import WebHeader from "./components/web-header";
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: { WebHeader }
};
</script>
<style scoped></style>
