<!--
 * @Author: summer
 * @LastEditTime: 2020-12-10 15:28:19
-->
<template>
  <div class="about">
    关于我们页面
    <web-header-two></web-header-two>
    <div class="company">
      <div class="company-title">
        <p class="company-cn-title">公司介绍</p>
        <div class="compangy-en-title">Company profile</div>
      </div>
      <div class="company-info">
        <div class="company-img">
          <img src="/static/home/images/about1.jpg" alt="" />
        </div>
        <div class="company-r">
          <p>一站式互联网工业废物解决方案</p>
          <p>One stop Internet industrial waste solution</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebHeaderTwo from "./components/web-header2";
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  components: { WebHeaderTwo },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped></style>
