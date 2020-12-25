<!--
 * @Author: summer
 * @LastEditTime: 2020-12-23 14:46:23
-->
<!--
 * @Author: summer
 * @LastEditTime: 2020-12-15 16:38:51
-->
<template>
  <div class="news-form">
    <div class="news-form-l">
      <news-hot-swiper :hotNews="hotNews"></news-hot-swiper>
      <news-list :news="news"></news-list>
      <div class="news-page">
        <a-pagination :default-current="1" :page-size="10" :total="200" />
      </div>
    </div>
    <news-slidebar :latest-news="latestNews"></news-slidebar>
  </div>
</template>

<script>
import NewsSlidebar from "./components/news-slidebar";
import NewsHotSwiper from "./components/news-hot-swiper";
import NewsList from "./components/news-list";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      newsTabs: [
        {
          id: 1,
          title: "政策解读",
          isActive: true
        },
        {
          id: 2,
          title: "行业动态",
          isActive: false
        },
        {
          id: 3,
          title: "技术进展",
          isActive: false
        },
        {
          id: 4,
          title: "国家名录",
          isActive: false
        }
      ],
      news: [
        {
          id: 1,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 2,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 3,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 4,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 5,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 6,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 7,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 8,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 9,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 10,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        }
      ],
      hotNews: [
        {
          id: 1,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/ee55b5ee-7b2f-44fb-a50d-22c1911c9adf.jpg"
        },
        {
          id: 2,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/ee55b5ee-7b2f-44fb-a50d-22c1911c9adf.jpg"
        },
        {
          id: 3,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/ee55b5ee-7b2f-44fb-a50d-22c1911c9adf.jpg"
        }
      ],
      latestNews: [
        {
          id: 1,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 2,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 3,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        },
        {
          id: 4,
          title:
            "全国危废处置能力比十二五末增长一点六倍环境风险防范能力持续提升",
          synopsis:
            "我国危险废物监管能力、利用处置能力和环境风险防范能力持续提升，截至2019年底，全国危险废物集中利用处置能力超...",
          date: "2020-12-07",
          img:
            "https://dcdn.it120.cc/2020/12/11/3aa64d19-fd28-44bb-af07-4b617fa9b632.jpg"
        }
      ]
    };
  },
  components: { swiper, swiperSlide, NewsSlidebar, NewsHotSwiper, NewsList },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.news {
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 36px;
    color: #fff;
    background: url("../../../static/home/images/news-banner.jpg") no-repeat 50% /
      cover;
  }
  .news-tab {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    margin-bottom: 60px;
    .news-tab-item {
      cursor: pointer;
      width: 140px;
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      font-size: 18px;
      color: #333;
      text-align: center;
      border: 1px solid #e5e5e5;
      &:not(:last-child) {
        margin-right: 36px;
      }
      &:hover {
        color: #fff;
        background: #4293f4;
        border: none;
      }
    }
    .active {
      color: #fff;
      background: #4293f4;
      border: none;
    }
  }
  .news-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
    .news-form-l {
      width: 900px;
      .news-page {
        margin-top: 38px;
        margin-bottom: 108px;
        display: flex;
        justify-content: center;
      }
    }
    .news-slidebar {
      width: 240px;
      margin-left: 60px;
    }
  }
}
</style>
