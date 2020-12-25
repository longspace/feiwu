<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 14:34:24
-->
<template>
  <div class="news-list" v-if="news.length">
    <router-link
      :to="{ path: '/newsDetail', query: { id: newsItem.id } }"
      tag="div"
      class="news-item"
      v-for="newsItem in news"
      :key="newsItem.id"
    >
      <div class="news-img">
        <div class="news-img-b">
          <img :src="newsItem.img" alt="" />
        </div>
      </div>
      <div class="news-info">
        <div class="news-caption">{{ newsItem.title }}波动情绪</div>
        <div class="news-synopsis">{{ newsItem.synopsis }}</div>
        <div class="news-date">{{ newsItem.date }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    news: {
      type: Array
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
.news-list {
  margin-top: 36px;
  border-top: 1px solid #e5e5e5;
  // border-bottom: 1px solid #e5e5e5;
  .news-item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 40px 24px;
    border-bottom: 1px solid #e5e5e5;
    .news-img {
      position: relative;
      width: 176px;
      &::before {
        content: "";
        display: block;
        padding-bottom: calc(100% * (120 / 176));
      }
      .news-img-b {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .news-info {
      flex: 1;
      padding-left: 26px;
      padding-right: 26px;
      .news-caption {
        font-size: 16px;
        line-height: 22px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .news-synopsis {
        margin-top: 16px;
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 22px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .news-date {
        padding-left: 20px;
        background: url("/static/home/images/product6.png") no-repeat left
          center;
      }
    }
    &:hover {
      background: #eef5fa;
    }
  }
}
</style>
