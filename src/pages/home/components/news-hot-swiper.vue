<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 14:41:14
-->
<template>
  <div class="hot-news" v-if="hotNews.length">
    <swiper class="swiper hot-swiper" :options="swiperOption">
      <swiper-slide v-for="hotItem in hotNews" :key="hotItem.id">
        <div class="slide-img">
          <div class="slide-img-b">
            <img :src="hotItem.img" alt="" />
          </div>
        </div>
        <div class="slide-info">
          <div class="hot-news-title">
            {{ hotItem.title }}
          </div>
          <div class="hot-news-synopsis">
            {{ hotItem.synopsis }}
          </div>
          <div class="hot-news-bottom">
            <router-link
              :to="{ path: '/newsDetail', query: { id: hotItem.id } }"
              tag="div"
              class="hot-news-more"
            >
              <span>查看详情</span>
              <span>></span>
            </router-link>
            <div class="hot-news-date">{{ hotItem.date }}</div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  components: { swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  props: {
    hotNews: {
      default: Array
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
.hot-news {
  padding: 30px;
  width: 100%;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  .swiper-slide {
    display: flex;
    justify-content: space-between;

    width: 100%;
    .slide-img {
      position: relative;
      width: 454px;
      &::before {
        content: "";
        display: block;
        padding-bottom: calc(100% * (250 / 454));
      }
      .slide-img-b {
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
    .slide-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding-left: 30px;
      .hot-news-title {
        font-size: 18px;
        line-height: 30px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .hot-news-synopsis {
        font-size: 14px;
        line-height: 26px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .hot-news-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .hot-news-more {
          cursor: pointer;
          width: 120px;
          line-height: 40px;
          border: 1px solid;
          border-radius: 20px;
          text-align: center;
          font-size: 14px;
          color: #4293f4;
        }
        .hot-news-date {
          padding-left: 20px;
          font-size: 12px;
          // line-height: 22px;
          color: #999;
          background: url("/static/home/images/product6.png") no-repeat left
            center;
        }
      }
    }
  }
  .swiper-pagination {
    width: 454px;
    .swiper-pagination-bullet {
      width: 26px;
      height: 3px;
      background: #fff;
      opacity: 1;
    }
  }
}
</style>
<style lang="scss">
.hot-swiper .swiper-pagination .swiper-pagination-bullet {
  width: 26px;
  height: 3px;
  border-radius: 0;
  background: #fff;
  opacity: 1;
  margin: 0;
}
.hot-swiper .swiper-pagination .swiper-pagination-bullet:not(:last-child) {
  margin-right: 10px;
}
.hot-swiper .swiper-pagination .swiper-pagination-bullet-active {
  background: #4293f4;
}
</style>
