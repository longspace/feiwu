<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .pages{ padding: 15px 0; text-align: right;}
  .ant-drawer-close{ left:0; color: #1890FF; }
  .ant-drawer-title{ padding-left: 25px;}
  ul,li{ list-style: none; margin: 0; padding: 0;}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
