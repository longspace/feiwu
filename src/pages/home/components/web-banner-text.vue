<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 14:27:52
-->
<template>
  <div class="banner-text">
    <div class="banner-title">固废驿站 - 工业废物一站式交易平台</div>
    <div class="banner-search">
      <div class="search-input">
        <a-input
          placeholder="请输入您要搜索的危废、固废代码或名称"
          allow-clear
          size="large"
          :value="searchValue"
          @pressEnter="searchKeywords(searchValue)"
          ><p slot="prefix">
            <img src="../../../../static/home/images/index2.png" alt="" /></p
        ></a-input>
      </div>
      <div class="search-button">
        <a-button type="primary" @click="searchKeywords(searchValue)"
          >搜一下</a-button
        >
      </div>
    </div>
    <div class="banner-keywords">
      <span>热搜关键词：</span>
      <ul class="keywords-list">
        <li
          ref="keywords"
          class="keywords-tag"
          v-for="(item, index) in keywords"
          :key="index"
          @click="getKeywords(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ["硫酸", "片碱", "小苏打", "二氧化钾"],
      searchValue: ""
      // dangerTrashTag: ["氢氧化钠", "盐酸", "硫酸"], // 危险废物标签
      // generalTrashTag: ["片碱", "纯碱", "氢氧化钠", "小苏打", "亚硫"] // 一般固废标签
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //搜索功能
    searchKeywords(value) {
      console.log("点击搜索");
    },
    // 点击关键词标签
    getKeywords(index) {
      let keywords = this.$refs.keywords[index].innerText;
      this.searchValue = keywords;
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.banner-text {
  .banner-title {
    font-size: 36px;
    line-height: 2em;
    text-align: center;
    color: #fff;
    margin-bottom: 42px;
  }
  .banner-search {
    display: flex;
    justify-content: space-between;
    width: 836px;
    height: 60px;
    .search-input {
      flex: 1;
      margin-right: 13px;

      .ant-input {
        height: 60px;
        padding-left: 45px;
      }
    }
    .search-button {
      width: 160px;
      height: 60px;
      .ant-btn {
        font-size: 20px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner-keywords {
    display: flex;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
    .keywords-list {
      display: flex;
      .keywords-tag {
        margin-left: 17px;
      }
    }
  }
}
</style>
