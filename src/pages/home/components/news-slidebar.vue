<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 14:45:11
-->
<template>
  <div class="news-slidebar">
    <div class="searchbar">
      <div class="search-title">搜索</div>
      <div class="search-input">
        <a-input-search placeholder="search" enter-button @search="onSearch" />
      </div>
    </div>
    <div class="latest-news">
      <div class="latest-news-title">最新资讯</div>
      <div class="latest-news-list" v-if="latestNews.length">
        <router-link
          tag="div"
          :to="{ path: '/newsDetail', query: { id: latestNewsItem.id } }"
          class="latest-news-item"
          v-for="latestNewsItem in latestNews"
          :key="latestNewsItem.id"
        >
          <div class="news-title">
            新版《危废名录》来了；河南规 范废旧家电处理
          </div>
          <div class="news-date">2020-12-08</div>
        </router-link>
      </div>
    </div>
    <div class="about">
      <div class="about-title">关于固废驿站</div>
      <div class="company-profile">
        <span>
          固废驿站是一家工业废物一站式交易平台，作为产废单位和处废单位的桥梁，固废驿站凭借良好的口碑和可靠的服务质量，赢得了业内广大企事业单位的信任
        </span>
        <router-link to="/about" class="color-blue">
          MORE +
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    latestNews: {
      type: Array
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 搜索框搜索
    onSearch(value) {
      this.$router.push({ name: "search", query: { hotKeywords: value } });
      console.log(value);
    }
  }
};
</script>
<style scoped lang="scss">
.news-slidebar {
  .searchbar {
    padding: 20px 20px 30px;
    background: #e4edf4;
    .search-title {
      margin-bottom: 18px;
      padding-left: 24px;
      font-size: 20px;
      color: #333;
      background: url("/static/home/images/news12.png") no-repeat left center;
    }
  }
  .latest-news {
    padding: 30px 22px;
    margin-top: 22px;
    margin-bottom: 22px;
    background: #e4edf4;
    .latest-news-title {
      padding-left: 20px;
      font-size: 20px;
      line-height: 20px;
      color: #333;
      background: url("/static/home/images/news13.png") no-repeat left center;
    }
    .latest-news-list {
      margin-top: 20px;
      .latest-news-item {
        cursor: pointer;
        .news-title {
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 22px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &:not(:last-child) {
          margin-bottom: 26px;
        }
      }
      .news-date {
        font-size: 13px;
        line-height: 1em;
        color: #999;
      }
    }
  }
  .about {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
    .about-title {
      padding-left: 22px;
      height: 56px;
      font-size: 26px;
      line-height: 56px;
      color: #fff;
      background: url("/static/home/images/news14.jpg") no-repeat 50% / cover;
    }
    .company-profile {
      padding: 20px 22px;
      font-size: 13px;
      color: #999;
      line-height: 2em;
      .color-blue {
        cursor: pointer;
        color: #4293f4;
      }
    }
  }
}
</style>
<style lang="scss">
.news-slidebar .search-input .ant-input {
  height: 42px;
}
.news-slidebar .search-input .ant-btn {
  height: 42px;
}
</style>
