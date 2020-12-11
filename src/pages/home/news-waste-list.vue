<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 17:18:48
-->
<template>
  <div class="news-waste-list" v-if="wasteList.length">
    <div
      class="news-waste-item"
      v-for="wasteItem in wasteList"
      :key="wasteItem.id"
    >
      <div class="news-waste-top">
        <div class="news-waste-img">
          <div class="img-b">
            <img :src="wasteItem.img" alt="" />
          </div>
        </div>
        <div class="news-waste-name">{{ wasteItem.title }}</div>
        <div class="news-waste-synopsis">{{ wasteItem.synopsis }}</div>
      </div>
      <router-link
        :to="{ path: '/newsWasteList', query: { url: wasteItem.url } }"
        tag="div"
        class="news-waste-read"
      >
        <p>
          <img src="/static/home/images/news17.png" alt="" />
          <span>在线阅读</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wasteList: [
        {
          id: 1,
          title: "国家危险废物名录(2021年版)",
          synopsis:
            "近日，生态环境部、国家发展改革委、公安部、交通运输部和国家卫生健康委修订发布了《国家危险废物名录(2021年版)》。",
          img: "/static/home/images/news15.jpg",
          url: ""
        },
        {
          id: 2,
          title: "国家一般固废名录(2021年版)",
          synopsis:
            "近日，生态环境部、国家发展改革委、公安部、交通运输部和国家卫生健康委修订发布了《国家危险废物名录(2021年版)》。",
          img: "/static/home/images/news16.jpg",
          url: ""
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scroped lang="scss">
@import "../../../static/home/css/index.scss";
.news-waste-list {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1200px;
  margin: 20px auto 168px;
  .news-waste-item {
    flex: 1;
    padding: 30px 26px 52px;
    border: 1px solid #e5e5e5;
    .news-waste-top {
      padding-bottom: 30px;
      border-bottom: 1px solid #e5e5e5;
      .news-waste-img {
        position: relative;
        width: 100%;
        overflow: hidden;

        &::before {
          content: "";
          display: block;
          padding-bottom: calc(100% * (280 / 516));
        }
        .img-b {
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
      .news-waste-name {
        margin-top: 40px;
        font-size: 24px;
        line-height: 26px;
        color: #333;
        text-align: center;
      }
      .news-waste-synopsis {
        margin-top: 24px;
        font-size: 16px;
        line-height: 30px;
        color: #666;
      }
    }
    .news-waste-read {
      margin: 38px auto 0;
      cursor: pointer;
      font-size: 16px;
      color: #fff;
      width: 200px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      border-radius: 3px;
      background: #5ac3af;
      p {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
          margin-right: 8px;
        }
      }
    }
    &:first-child {
      margin-right: 60px;
    }
  }
}
</style>
