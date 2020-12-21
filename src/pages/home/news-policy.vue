<!--
 * @Author: summer
 * @LastEditTime: 2020-12-15 16:38:51
-->
<template>
  <div class="news-form">
    <div class="news-form-l">
      <div class="hot-news" v-if="hotNews.length">
        <swiper class="swiper hot-swiper" :options="swiperOptionTop">
          <swiper-slide v-for="hotItem in hotNews" :key="hotItem.id">
            <!-- {{ hotItem }} -->
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
      <div class="news-page">
        <a-pagination :default-current="1" :page-size="10" :total="200" />
      </div>
    </div>
    <news-slidebar :latest-news="latestNews"></news-slidebar>
    <!-- <div class="news-slidebar">
        <div class="searchbar">
          <div class="search-title">搜索</div>
          <div class="search-input">
            <a-input-search
              placeholder="search"
              enter-button
              @search="onSearch"
            />
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
      </div> -->
  </div>
</template>

<script>
import NewsSlidebar from "./components/news-slidebar";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: "https://www.antdv.com/",
        title: `ant design vue part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }
    return {
      listData,
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
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
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
      ],
      swiperOptionTop: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  components: { swiper, swiperSlide, NewsSlidebar },
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
                background: url("/static/home/images/product6.png") no-repeat
                  left center;
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
          // .swiper-pagination-bullet {
          //   opacity: 1;
          // }
        }
      }
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
