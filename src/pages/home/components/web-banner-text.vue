<!--
 * @Author: summer
 * @LastEditTime: 2020-12-14 12:11:19
-->
<template>
  <div class="banner-text">
    <div class="banner-title">固废驿站 - 工业废物一站式交易平台</div>
    <div class="banner-search" :class="className">
      <div class="search-input">
        <a-input
          placeholder="请输入您要搜索的危废、固废代码或名称"
          size="large"
          allowClear
          v-model="hotKeywords"
          @pressEnter="searchKeywords(hotKeywords)"
          ><a-icon slot="prefix" type="search"
        /></a-input>
      </div>
      <div class="search-button">
        <a-button type="primary" @click="searchKeywords(hotKeywords)"
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
import { getHotKeywords } from "@/utils/http/index.js";
export default {
  data() {
    return {
      keywords: [],
      hotKeywords: "",
      searchClassName: ""
    };
  },
  props: {
    className: {
      type: String
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.initHotKeywords();
  },
  props: { className: { type: String } },
  methods: {
    initHotKeywords() {
      getHotKeywords()
        .then(res => {
          const { data } = res;
        })
        .catch(err => {
          this.keywords = ["硫酸", "片碱", "小苏打", "二氧化钾"];
          console.log("新增或更新标签出错：", err);
        });
    },
    //搜索功能
    searchKeywords(value) {
      console.log("搜一下", value);
      this.$router.push({
        path: "/search",
        query: { hotKeywords: value }
      });
    },

    // 点击关键词标签
    getKeywords(index) {
      this.hotKeywords = this.$refs.keywords[index].innerText;
      console.log("index", this.hotKeywords);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.banner-text {
  display: inline-block;
  .banner-title {
    font-size: 36px;
    line-height: 2em;
    text-align: center;
    color: #fff;
  }
  .banner-search {
    display: flex;
    justify-content: space-between;
    width: 836px;
    margin: 22px auto 24px;
    .search-input {
      flex: 1;
      margin-right: 13px;
    }
    .search-button {
      width: 160px;
    }
  }
  .banner-keywords {
    display: flex;

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
  .index-search {
    margin: 42px auto 24px;
  }
}
</style>
<style>
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.banner-search .ant-input {
  height: 54px;
  padding-left: 45px;
  font-size: 16px;
}
.index-search .ant-input {
  height: 60px;
  font-size: 18px;
}
.banner-text .banner-search .search-button .ant-btn {
  height: 54px;
  font-size: 20px;
  width: 100%;
  background-color: #4293f4;
  border-color: #4293f4;
}
.banner-text .index-search .search-button .ant-btn {
  height: 60px;
  background-color: #4293f4;
  border-color: #4293f4;
}
.banner-search .ant-input-prefix {
  left: 25px;
  font-size: 24px;
  color: #999999;
}
</style>
