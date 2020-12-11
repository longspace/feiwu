<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 10:54:32
-->
<template>
  <div class="index">
    <div class="banner">
      <div class="banner-b">
        <banner-text className="index-search"></banner-text>
      </div>
    </div>
    <div class="link-tag">
      <div class="link-tag-list">
        <router-link to="/dangerGarbageTrading" tag="div" class="link-tag-item">
          <div class="link-tag-img">
            <img src="/static/home/images/index3.png" alt="" />
          </div>
          <div class="link-tag-name">危险废物交易中心</div>
          <div class="link-tag-desc">
            <router-link
              tag="span"
              :to="'/danger/' + dangerTag"
              class="tag-desc-item trade-link-tag"
              v-for="(dangerTag, index) in dangerTrashTag"
              :key="index"
            >
              {{ dangerTag }}
            </router-link>
          </div>
        </router-link>
        <router-link
          to="/generalGarbageTrading"
          tag="div"
          class="link-tag-item"
        >
          <div class="link-tag-img">
            <img src="/static/home/images/index4.png" alt="" />
          </div>
          <div class="link-tag-name">一般废物交易中心</div>
          <div class="link-tag-desc">
            <router-link
              tag="span"
              :to="'/general/' + generalTag"
              class="tag-desc-item trade-link-tag"
              v-for="(generalTag, index) in generalTrashTag"
              :key="index"
            >
              {{ generalTag }}
            </router-link>
          </div>
        </router-link>
        <router-link to="/newsCenter" tag="div" class="link-tag-item">
          <div class="link-tag-img">
            <img src="/static/home/images/index5.png" alt="" />
          </div>
          <div class="link-tag-name">咨询中心</div>
          <div class="link-tag-desc">
            <span class="tag-desc-item">
              行业热点新闻追踪报道
            </span>
          </div>
        </router-link>
        <router-link tag="div" to="/about" class="link-tag-item">
          <div class="link-tag-img">
            <img src="/static/home/images/index6.png" alt="" />
          </div>
          <div class="link-tag-name">关于固废驿站</div>
          <div class="link-tag-desc">
            <span class="tag-desc-item">
              连接产废和处废两大环节 增效节能环保
            </span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend-title">
        <span>为你</span><span class="recommend-color">推荐</span>
      </div>
      <div class="recommend-list">
        <div class="recommend-item">
          <div class="recommend-item-info">
            <div class="recommend-item-title">危险废物处置需求推荐</div>
            <div class="hot-search-tag" v-if="dangerRecommend.tagList">
              <router-link
                :to="{ path: '/search', query: { searchValue: dangerItem } }"
                class="search-tag-item"
                v-for="(dangerItem, dangerIndex) in dangerRecommend.tagList"
                :key="dangerIndex"
              >
                {{ dangerItem }}
              </router-link>
            </div>
            <router-link to="/search" tag="div" class="hot-search-more">
              <div class="recommend-more-text">
                <span>查看更多</span>
              </div>
              <div class="recommend-more-img">
                <img src="/static/home/images/index9.png" alt="" />
              </div>
            </router-link>
          </div>
          <recommend-card
            :hotGoodsCard="dangerRecommend.recommendItem"
          ></recommend-card>
        </div>
        <div class="recommend-item">
          <div class="recommend-item-info">
            <div class="recommend-item-title">一般固废处置需求推荐</div>
            <div class="hot-search-tag" v-if="generalRecommend.tagList">
              <router-link
                :to="{ path: '/search', query: { searchValue: generalItem } }"
                class="search-tag-item"
                v-for="(generalItem, generalIndex) in generalRecommend.tagList"
                :key="generalIndex"
              >
                {{ generalItem }}
              </router-link>
            </div>
            <router-link to="/search" tag="div" class="hot-search-more">
              <div class="recommend-more-text">
                <span>查看更多</span>
              </div>
              <div class="recommend-more-img">
                <img src="/static/home/images/index9.png" alt="" />
              </div>
            </router-link>
          </div>
          <recommend-card
            :hotGoodsCard="generalRecommend.recommendItem"
          ></recommend-card>
        </div>
      </div>
    </div>
    <div class="index-news">
      <div class="news-title">
        <span>热点</span><span class="news-color">资讯</span>
      </div>
      <div class="news-carousel">
        <a-carousel arrows autoplay dots-class="slick-dots">
          <div
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="left: 10px;zIndex: 1"
          >
            <img src="/static/home/images/index13.png" alt="" />
          </div>
          <div
            slot="nextArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="right: 10px"
          >
            <img src="/static/home/images/index14.png" alt="" />
          </div>
          <div
            class="news-item"
            v-for="newsItem in indexNews"
            :key="newsItem.id"
          >
            <div class="news-info-text">
              <div class="news-caption">
                {{ newsItem.caption }}
              </div>
              <div class="news-date">{{ newsItem.date }}</div>
              <div class="news-synopsis">
                {{ newsItem.synopsis }}
              </div>
              <router-link
                tag="div"
                :to="{ path: '/newsCenter', query: { newsId: newsItem.id } }"
                class="news-more"
              >
                <span>查看更多</span>
                <img src="/static/home/images/index9.png" alt="" />
              </router-link>
            </div>
            <div class="news-info-img">
              <div class="news-img">
                <div class="news-img-b">
                  <img :src="newsItem.img" alt="" />
                </div>
              </div>
            </div>
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendCard from "./components/recommend-card";
import BannerText from "./components/web-banner-text";
import { getNewsList, getHotGoods } from "@/utils/http/index.js";
export default {
  name: "index",
  data() {
    return {
      // keywords: ["硫酸", "片碱", "小苏打", "二氧化钾"],
      searchValue: "",
      dangerTrashTag: ["氢氧化钠", "盐酸", "硫酸"], // 危险废物标签
      generalTrashTag: ["片碱", "纯碱", "氢氧化钠", "小苏打", "亚硫"], // 一般固废标签
      indexNews: [],
      dangerRecommend: {}, // 危险废物推荐
      generalRecommend: {} // 一般废物推荐
    };
  },
  components: {
    BannerText,
    RecommendCard
  },
  created() {},
  mounted() {
    this.initNews();
    this.initHotGoodsCard();
  },
  methods: {
    initNews() {
      getNewsList()
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            this.mydialogcfg.visible = false;
            this.loadData();
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.indexNews = [
            {
              id: "1111",
              caption: "违规排污整改缓慢，一些地区长江生态环保 迫在眉睫",
              date: "2020-12-02",
              synopsis:
                "近几年，长江保护修复取得积极进展，长江流域环境质量持续向好，但仍有一些地方发展理念尚未转变到位，一些地方在长江生态环境保护方面不作为、慢作为。今年6月至10月，中央广播电视总台和生态环境部组成联合调查组",
              img:
                "https://dcdn.it120.cc/2020/12/07/51b53749-572b-4c77-9cb6-17b4e8dd73e2.jpg"
            },
            {
              id: "1111",
              caption: "违规排污整改缓慢，一些地区长江生态环保 迫在眉睫",
              date: "2020-12-02",
              synopsis:
                "近几年，长江保护修复取得积极进展，长江流域环境质量持续向好，但仍有一些地方发展理念尚未转变到位，一些地方在长江生态环境保护方面不作为、慢作为。今年6月至10月，中央广播电视总台和生态环境部组成联合调查组",
              img:
                "https://dcdn.it120.cc/2020/12/07/51b53749-572b-4c77-9cb6-17b4e8dd73e2.jpg"
            },
            {
              id: "1111",
              caption: "违规排污整改缓慢，一些地区长江生态环保 迫在眉睫",
              date: "2020-12-02",
              synopsis:
                "近几年，长江保护修复取得积极进展，长江流域环境质量持续向好，但仍有一些地方发展理念尚未转变到位，一些地方在长江生态环境保护方面不作为、慢作为。今年6月至10月，中央广播电视总台和生态环境部组成联合调查组",
              img:
                "https://dcdn.it120.cc/2020/12/07/51b53749-572b-4c77-9cb6-17b4e8dd73e2.jpg"
            }
          ];
          console.log("新增或更新标签出错：", err);
        });
    },
    initHotGoodsCard() {
      getHotGoods({ type: 1 })
        .then(res => {
          const { data } = res;
        })
        .catch(err => {
          this.dangerRecommend = {
            type: "1",
            id: "1",
            name: "危险废物处置需求推荐",
            tagList: [
              "含钙废物",
              "有机废水污泥",
              "金属氧化物废物废渣",
              "含钙废物",
              "有机废水污泥"
            ], // 推荐需求标签
            recommendItem: [
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/6ca05c0f-4302-4fcd-a116-5bdf4d8f66c5.jpg",
                id: "0555",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              },
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/4e35b187-8ac9-4cda-96fe-36b2033aad3d.jpg",
                id: "0666",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              },
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg",
                id: "0777",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              }
            ]
          };

          console.log("新增或更新标签出错：", err);
        });
      getHotGoods({ type: 2 })
        .then(res => {
          const { data } = res;
        })
        .catch(err => {
          this.generalRecommend = {
            type: "2",
            id: "2",
            name: "一般固废处置需求推荐",
            tagList: [
              "含钙废物",
              "有机废水污泥",
              "金属氧化物废物废渣",
              "含钙废物",
              "有机废水污泥"
            ], // 推荐需求标签
            recommendItem: [
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/6ca05c0f-4302-4fcd-a116-5bdf4d8f66c5.jpg",
                id: "0222",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              },
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/4e35b187-8ac9-4cda-96fe-36b2033aad3d.jpg",
                id: "0333",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              },
              {
                img:
                  "https://dcdn.it120.cc/2020/12/07/5d8b4d14-aa28-49ec-8d8a-193f0de1124b.jpg",
                id: "0444",
                price: "4000", // 单价
                name: "澳甲烷废物",
                stock: "20", // 库存
                introduce: "含氰热处理钡渣，含氰污泥及冷液，热处理渗碳氰渣", // 简介
                category: "HW06", // 类别
                code: "276-006-004" //代码
              }
            ]
          };

          console.log("新增或更新标签出错：", err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../static/home/css/index.scss";
.web-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
.banner {
  position: relative;
  width: 100%;
  background: url("../../../static/home/images/index1.jpg") no-repeat 50% /
    cover;
  &::before {
    content: "";
    display: block;
    padding-bottom: calc(100% * (680 / 1920));
  }
  .banner-b {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
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
  }
}
.link-tag {
  padding-top: 70px;
  padding-bottom: 100px;
  .link-tag-list {
    display: flex;
    justify-content: space-between;
    widows: 96%;
    max-width: 1200px;
    margin: 0 auto;
    .link-tag-item {
      flex: 1;
      text-align: center;
      padding: 28px 50px 22px;
      border: 1px solid #e5e5e5;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 32px;
      }
      .link-tag-name {
        margin-top: 14px;
        font-size: 20px;
        line-height: 2em;
        font-weight: bold;

        color: #666;
        &::after {
          content: "";
          display: block;
          margin: 6px auto 32px;
          width: 42px;
          height: 3px;
          background: linear-gradient(90deg, #de9146, #ffd4a2);
        }
      }
      &:nth-child(2) {
        .link-tag-name {
          &::after {
            background: linear-gradient(90deg, #2c86d2, #8fd4fb);
          }
        }
      }
      &:nth-child(3) {
        .link-tag-name {
          &::after {
            background: linear-gradient(90deg, #36c19f, #9fffec);
          }
        }
      }
      &:nth-child(3) {
        .link-tag-name {
          &::after {
            background: linear-gradient(90deg, #623be1, #9fa6ff);
          }
        }
      }
      .link-tag-desc {
        width: 100%;
        .tag-desc-item {
          font-size: 16px;
          line-height: 30px;
          color: #666;
          &:not(:last-child) {
            margin-right: 16px;
          }
          // white-space: nowrap;
        }
        .trade-link-tag {
          cursor: pointer;
        }
      }
    }
  }
}
.recommend {
  .recommend-title {
    font-size: 34px;
    line-height: 62px;
    font-weight: bold;
    text-align: center;
    color: #333;
    letter-spacing: 4px;
    background: url("../../../static/home/images/index7.png") no-repeat 50%;
    .recommend-color {
      color: #4293f4;
    }
  }
  .recommend-list {
    width: 96%;
    max-width: 1200px;
    margin: 59px auto 0;
    .recommend-item {
      display: flex;
      padding: 60px 56px;
      box-shadow: 0px 0px 10px 0px rgba(149, 167, 178, 0.31);
      &:first-child {
        margin-bottom: 52px;
      }
      .recommend-item-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 25%;
        padding-right: 50px;
        padding-bottom: 26px;
        .recommend-item-title {
          font-size: 22px;
          line-height: 22px;
          font-weight: bold;
          color: #333;
        }
        .hot-search-tag {
          margin-top: 42px;
          .search-tag-item {
            margin-bottom: 20px;
            display: inline-block;
            padding: 0 15px;
            line-height: 30px;
            border-radius: 15px;
            font-size: 13px;

            color: #666;
            background-color: #ecf2f8;
            &:not(:last-child) {
              margin-right: 15px;
            }
          }
        }
        .hot-search-more {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 160px;
          height: 40px;
          border-radius: 20px;
          border: 1px solid #4293f4;
          font-size: 14px;
          line-height: 1em;
          cursor: pointer;
          color: #4293f4;
          recommend-more-img {
            margin-right: 10px;
          }
        }
      }
      .recommend-goods-list {
        display: flex;
        justify-content: space-between;
        width: 75%;
      }
    }
  }
}
.index-news {
  margin-bottom: 98px;
  .news-title {
    margin-top: 88px;
    margin-bottom: 42px;
    font-size: 34px;
    line-height: 62px;
    font-weight: bold;
    text-align: center;
    color: #333;
    letter-spacing: 4px;
    background: url("../../../static/home/images/index7.png") no-repeat 50%;
    .news-color {
      color: #4293f4;
    }
  }
  .news-carousel {
    // display: flex;
    // justify-content: space-between;
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 76px 56px 70px;
    background: #ecf2f8;
    .news-item {
      // display: flex;
      // justify-content: space-between;
      .news-info-text {
        float: left;
        width: 50%;
        padding-right: 42px;
        .news-caption {
          font-size: 22px;
          line-height: 36px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .news-date {
          margin-top: 10px;
          margin-bottom: 24px;
          font-size: 12px;
          line-height: 26px;
          color: #999;
        }
        .news-synopsis {
          width: 100%;
          font-size: 14px;
          color: #666;
          line-height: 26px;
          text-align: justify;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .news-more {
          cursor: pointer;
          margin-top: 64px;
          width: 160px;
          border-radius: 20px;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
          color: #5da7ff;
          border: 1px solid #4293f4;
          img {
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      .news-info-img {
        float: right;
        display: flex;
        justify-content: flex-end;
        width: 50%;
        .news-img {
          position: relative;
          width: 96%;
          max-width: 508px;
          &::before {
            content: "";
            display: block;
            padding-top: calc(100% * (280 / 508));
          }
          .news-img-b {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .slick-dots li button {
      background: #333;
    }
  }
}
</style>
<style lang="scss">
.news-carousel .ant-carousel .slick-dots li button {
  background: #333;
}
.news-carousel .ant-carousel .slick-prev {
  left: -25px;
}
</style>
