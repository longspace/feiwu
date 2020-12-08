<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 20:32:16
-->
<template>
  <div class="banner-text">
    <div class="banner-title">固废驿站 - 工业废物一站式交易平台</div>
    <div class="banner-search">
      <div class="search-input">
        <a-input
          placeholder="请输入您要搜索的危废、固废代码或名称"
          :value="searchValue"
          size="large"
          @pressEnter="searchKeywords(searchValue)"
          ><a-icon slot="prefix" type="search"
        /></a-input>
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
      searchValue: "",
      searchClassName: ""
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getClassName();
  },
  props: { className: { type: String } },
  methods: {
    //搜索功能
    searchKeywords(searchValue) {
      this.$router.push({
        path: "/search",
        query: { searchValue: searchValue }
      });
      // getHotKeywords()
      //   .then(res => {
      //     const { data } = res;
      //     if (data.code == 200) {
      //       this.mydialogcfg.visible = false;
      //       this.loadData();
      //       this.$message.success(res.data.msg);
      //     } else {
      //       this.$message.error(res.data.msg);
      //     }
      //   })
      //   .catch(err => {
      //     console.log("新增或更新标签出错：", err);
      //   });
    },
    // 点击关键词标签
    getKeywords(index) {
      let keywords = this.$refs.keywords[index].innerText;
      this.searchValue = keywords;
    },
    getClassName() {
      this.searchClassName = this.className;
      console.log("class Name：", this.searchClassName);
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
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.banner-search .ant-input {
  height: 60px;
  padding-left: 45px;
  font-size: 18px;
}
.banner-search .ant-input-prefix {
  left: 25px;
  font-size: 24px;
  color: #999999;
}
</style>
