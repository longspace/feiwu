<!--
 * @Author: summer
 * @LastEditTime: 2020-12-27 18:29:36
-->
<template>
  <div class="product-detail">
    <div class="banner">
      <div class="banner-b">
        <web-banner-text></web-banner-text>
      </div>
    </div>
    <div class="product-info">
      <div class="product-info-top">
        <div class="product-carousel" v-if="productInfo.carousel.length">
          <div class="gallery">
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                class="slide-1"
                v-for="galleryItem in productInfo.carousel"
                :key="galleryItem.id"
              >
                <div class="slide-img">
                  <div class="slide-img-b">
                    <img :src="galleryItem.bigUrl" alt="" />
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <div class="thumbs">
            <swiper
              class="swiper gallery-thumbs"
              :options="swiperOptionThumbs"
              ref="swiperThumbs"
            >
              <swiper-slide
                class="slide-1"
                v-for="thumbsItem in productInfo.carousel"
                :key="thumbsItem.id"
              >
                <div class="slide-img">
                  <div class="slide-img-b">
                    <img :src="thumbsItem.smallUrl" alt="" />
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
          </div>
        </div>
        <div class="product-r">
          <div class="product-attr">
            <span class="product-name">{{
              this.productInfo.producTopInfo.name
            }}</span>
            <span class="product-stock">{{
              this.productInfo.producTopInfo.stock
            }}</span>
          </div>
          <div class="product-synopsis">
            {{ this.productInfo.producTopInfo.synopsis }}
          </div>
          <div class="product-color-info">
            <div class="product-color-item product-color-price">
              <div class="product-color-label">预估价：</div>
              <div class="product-color-text">
                <span class="num">
                  {{ this.productInfo.producTopInfo.price }}</span
                >元/吨
              </div>
            </div>
            <div class="product-color-item">
              <div class="product-color-label">废物信息：</div>
              <div class="product-color-text">
                <span>{{ productInfo.producTopInfo.type }}</span>
                <span>{{ productInfo.producTopInfo.code }}</span>
              </div>
            </div>
            <div class="product-color-item product-color-area">
              <div class="product-color-label">产地区域：</div>
              <div class="product-color-text">
                <span>{{ productInfo.producTopInfo.area }}</span>
              </div>
            </div>
            <div class="product-color-item">
              <div class="product-color-label">数量：</div>
              <div class="product-color-text">
                <span>{{ productInfo.producTopInfo.stock }}</span>
              </div>
            </div>
            <div class="product-color-item">
              <div class="product-color-label">发布时间：</div>
              <div class="product-color-text">
                <span>{{ productInfo.producTopInfo.date }}</span>
              </div>
            </div>
          </div>
          <div class="product-link">
            <!-- 预购清单跳转后台 -->
            <router-link to="/booklist" tag="div" class="product-cart">
              <img src="/static/home/images/detail3.png" alt="" />
              <span>加入预购清单</span>
            </router-link>
            <div class="product-customer" @click="openVipModal">
              <img src="/static/home/images/detail13.png" alt="" />
              <span>咨询商品</span>
            </div>
          </div>
          <div class="product-toast">
            提示：您可以把您需要的商品加入预购清单；
            <span class="vip">成为我们的VIP会员后，</span>
            可以获取第一手报价信息和商品信息，并有更多其他福利！
          </div>
          <div class="product-service">
            <div class="service-item">
              <img src="/static/home/images/detail4.png" alt="" />
              <span>预购商品</span>
            </div>
            <div class="service-item">
              <img src="/static/home/images/detail5.png" alt="" />
              <span>待签约</span>
            </div>
            <div class="service-item">
              <img src="/static/home/images/detail6.png" alt="" />
              <span>咨询客服</span>
            </div>
            <div class="service-item">
              <img src="/static/home/images/detail7.png" alt="" />
              <span>线下签约</span>
            </div>
            <div class="service-item">
              <img src="/static/home/images/detail8.png" alt="" />
              <span>完成订单</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <div class="product-tabs">
          <a-tabs default-active-key="1" @tabClick="changeTabs">
            <a-tab-pane key="1" tab="商品详情">
              <div
                v-if="productInfo.productDetail.length"
                class="detail-info-list"
              >
                <div
                  class="detail-info-item"
                  v-for="detailItem in productInfo.productDetail"
                  :key="detailItem.id"
                >
                  {{ detailItem.value }}：{{ detailItem.title }}
                </div>
              </div>
              <div class="product-img-list" v-if="productInfo.detailImg">
                <div
                  class="product-img-item"
                  v-for="urlItem in productInfo.detailImg.url"
                  :key="urlItem.id"
                >
                  <img :src="urlItem.name" alt="" />
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="检测报告" force-render>
              <div
                class="report-img-list"
                v-if="productInfo.productReport"
                ref="reportImgList"
              >
                <div
                  class="report-img-item"
                  v-for="reportItem in productInfo.productReport.imgs"
                  :key="reportItem.id"
                >
                  <img :src="reportItem.url" alt="" />
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="detail-flow-window">
          <div class="flow-window">
            <img src="/static/home/images/product5.jpg" alt="" />
          </div>
          <div class="hot-product">
            <div class="hot-product-title">热门推荐</div>
            <div
              class="hot-product-list"
              v-if="hotProduct.productList.length > 0"
            >
              <router-link
                tag="div"
                :to="{
                  path: '/productDetail',
                  query: { productId: hotItem.id }
                }"
                class="hot-product-item"
                v-for="hotItem in hotProduct.productList"
                :key="hotItem.id"
              >
                <div class="hot-product-name">{{ hotItem.name }}</div>
                <div class="hot-product-synopsis">{{ hotItem.synopsis }}</div>
                <div class="hot-product-tag" v-if="hotItem.tag.length">
                  <div
                    class="tag-item"
                    v-for="(tagItem, tagIndex) in hotItem.tag"
                    :key="tagIndex"
                  >
                    {{ tagItem }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vip-modal">
      <a-modal
        width="400px"
        v-model="vipVisible"
        title="加入VIP会员"
        :footer="null"
        @ok="handleOk"
      >
        <p @click="handleContact" class="contact-button">
          联系电话：021-36382923
        </p>
      </a-modal>
    </div>
    <div class="vip-report-modal">
      <a-modal
        width="400px"
        v-model="vipReportVisible"
        title="您还不是VIP,不能查看检测报告"
        :footer="null"
        cancel-text=""
        @ok="handleContact"
      >
        <p>
          成为固废驿站VIP会员，不但能第一时间
          查看产废单位检测报告和报价信息，还能享受 平台更多福利！
        </p>
        <p @click="handleContact" class="contact-button">
          联系客服：021-36382923
        </p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import WebBannerText from "./components/web-banner-text";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      type: 1,
      isInit: 1,
      vipVisible: false, // vip对话框
      vipReportVisible: false, // vip对话框
      permission: 0, // 权限，0 表示游客，1为会员,2为VIP
      hotProduct: {
        type: 1,
        productList: [
          {
            id: 1,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 2,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 3,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 4,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          },
          {
            id: 5,
            name: "澳甲烷废物",
            synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣", // 产品简介
            tag: ["HW06", "276-006-004"] // 产品标签类别
          }
        ]
      },
      productInfo: {
        id: "12346567989",
        productDetail: [
          { id: 1, value: "名称", title: "澳甲烷废物" },
          { id: 2, value: "代码", title: "841-0001-01" },
          { id: 3, value: "物理状态", title: "固体" },
          { id: 4, value: "危废特性", title: "T/C/I/R" },
          { id: 5, value: "商品分类", title: "HW01" },
          { id: 6, value: "重量", title: "20吨" },
          { id: 7, value: "包装形式", title: "罐装" },
          {
            id: 8,
            value: "主要成分",
            title:
              "利用生物技术生产生物化学药品、基因工程药物（不包括利用生物技术合成氨基酸、维生素、他汀类降脂药物、降糖类药 物）过程中产生的废脱色过滤介质"
          }
        ],
        productReport: {
          id: 11,
          value: "检测报告",
          imgs: [
            {
              id: "100",
              value: "100",
              url:
                "https://dcdn.it120.cc/2020/12/09/38789594-a056-413b-a343-196004941468.jpg"
            }
          ]
        },
        producTopInfo: {
          name: "澳甲烷废物",
          synopsis: "含氰热处理钡渣，含氰污泥及冷却液，热处理渗碳氰渣",
          stock: "20吨",
          price: "4000",
          type: "HW01",
          code: "841-0001-01",
          area: "上海市",
          date: "2020-12-03"
        },
        detailImg: {
          id: 1,
          url: [
            {
              id: 1,
              value: "",
              name:
                "https://dcdn.it120.cc/2020/12/09/38789594-a056-413b-a343-196004941468.jpg"
            }
          ]
        },
        carousel: [
          {
            id: 1111111111,
            value: "1111111111",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/148589a9-2b92-4602-8139-432956d94f09.jpg"
          },
          {
            id: 2222222222,
            value: "2222222222",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/4c80491c-04b8-4c08-9091-8020904f6111.jpg"
          },
          {
            id: 3333333333,
            value: "3333333333",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/0d5e3f8f-fbc4-4541-99a1-9ef3a97f6f2c.jpg"
          },
          {
            id: 4444444444444444,
            value: "4444444444444444",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/148589a9-2b92-4602-8139-432956d94f09.jpg"
          },
          {
            id: 5555555555555,
            value: "5555555555555",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/4c80491c-04b8-4c08-9091-8020904f6111.jpg"
          },
          {
            id: 666666666666,
            value: "666666666666",
            bigUrl:
              "https://dcdn.it120.cc/2020/12/09/15320d2b-ae56-4d30-ab41-e982646e7d7c.jpg",
            smallUrl:
              "https://dcdn.it120.cc/2020/12/09/0d5e3f8f-fbc4-4541-99a1-9ef3a97f6f2c.jpg"
          }
        ]
      },
      swiperOptionTop: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 13,
        slidesPerView: 3,
        slideToClickedSlide: true
      }
    };
  },
  components: { WebBannerText, swiper, swiperSlide },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
    console.log("this.$refs.mySwiper.swiper", this.$refs.swiperTop);
  },
  methods: {
    openVipModal() {
      this.vipVisible = true;
    },

    handleCancel() {
      this.vipVisible = false;
    },
    handleOk() {
      console.log();
      this.$router.push({ path: "/memberLogin" });
    },
    changeTabs(key) {
      // console.log("thid.key", key);
      if (key == 2 && this.permission !== 2) {
        this.$refs.reportImgList.style.display = "none";
        this.vipReportVisible = true;
      }
    },
    handleContact() {
      console.log("联系客服");
    }
  }
};
</script>
<style scoped lang="scss">
// @import "swiper/swiper-bundle.css";
.banner {
  position: relative;
  height: 300px;
  background: url("../../../static/home/images/product1.jpg") no-repeat 50% /
    cover;
  .banner-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.product-info {
  padding-top: 30px;
  padding-bottom: 30px;
  background: #f2f5f8;
  .product-info-top {
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0;
    background: #fff;
    .product-carousel {
      // position: relative;
      width: 300px;
      margin-right: 30px;
      .gallery-top {
        .swiper-slide {
          width: 100%;
          .slide-img {
            position: relative;
            width: 100%;
            overflow: hidden;
            &::before {
              content: "";
              display: block;
              padding-bottom: 100%;
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
        }
      }
      .thumbs {
        position: relative;
        width: 240px;
        margin: 0 auto;
        .gallery-thumbs {
          margin-top: 20px;
          .slide-img {
            position: relative;
            width: 100%;
            &:before {
              content: "";
              display: block;
              padding-bottom: 100%;
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
        }
        .swiper-button-prev {
          left: -20px;
          width: 10px;
          height: 20px;
          background-size: 10px 20px;
          margin-top: -10px;
          color: #999;
          outline: none;
        }
        .swiper-button-next {
          right: -20px;
          width: 10px;
          height: 20px;
          background-size: 10px 20px;
          margin-top: -10px;
          outline: none;
          color: #999;
        }
        .swiper-slide-active {
          border: 1px solid #4293f4;
        }
      }
    }
    .product-r {
      flex: 1;
      .product-attr {
        font-size: 28px;
        color: #333;
      }
      .product-synopsis {
        font-size: 14px;
        color: #666;
      }
      .product-color-info {
        display: flex;
        flex-wrap: wrap;
        margin-top: 24px;
        margin-bottom: 34px;
        padding: 22px 24px 22px 24px;
        // justify-content: space-between;
        background: #f2f5f8;
        .product-color-item {
          display: flex;
          justify-content: center;
          width: calc(100% / 3);
          font-size: 16px;
          color: #333;
          .product-color-label {
            width: 80px;
            text-align: right;

            color: #666;
          }
          .product-color-text {
            flex: 1;
          }
        }
      }
      .product-link {
        display: flex;
        font-size: 16px;
        margin-bottom: 90px;
        color: #fff;
        .product-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 24px;
          width: 180px;
          height: 56px;
          cursor: pointer;
          border-radius: 3px;
          background: #4293f4;
          img {
            margin-right: 9px;
          }
        }
        .product-customer {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 56px;
          border-radius: 3px;
          font-size: 16px;
          border: none;
          color: #fff;
          cursor: pointer;
          background: #ff9833;
          img {
            margin-right: 8px;
          }
        }
      }
      .product-toast {
        padding-bottom: 14px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #e9eef3;
        .vip {
          color: #ff9833;
        }
      }
      .product-service {
        display: flex;
        padding-top: 32px;
        padding-bottom: 38px;
        .service-item {
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          color: #666;
          &::after {
            content: ">";
            display: block;
            margin-left: 22px;
            margin-right: 22px;
            font-size: 20px;
            color: #dcdcdc;
          }
          img {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .detail-info {
    width: 96%;
    max-width: 1200px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    .product-tabs {
      width: 880px;
      padding-bottom: 236px;
      background: #fff;

      .detail-info-list {
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 60px;
        .detail-info-item {
          margin-bottom: 10px;
          width: 25%;
          font-size: 14px;
          line-height: 24px;
          color: #666;
          &:last-child {
            width: 100%;
            margin-top: 20px;
          }
        }
      }
      .product-img-list {
        padding-left: 30px;
        padding-right: 30px;
        text-align: center;
      }
      .report-img-list {
        padding: 30px;
        text-align: center;
      }
    }
    .detail-flow-window {
      width: 300px;
      margin-left: 20px;
      .flow-window {
        margin-bottom: 20px;
      }
      .hot-product {
        // margin-top: 20px;
        background: #fff;
        .hot-product-title {
          width: 100%;
          line-height: 70px;
          padding-left: 30px;
          padding-right: 30px;
          font-size: 18px;
          border-bottom: 1px solid #eee;
          color: #666;
        }
        .hot-product-item {
          cursor: pointer;
          padding: 18px 30px;
          &:not(:last-child) {
            border-bottom: 1px solid #e5e5e5;
          }
          .hot-product-name {
            font-size: 18px;
            line-height: 26px;
            color: #333;
          }
          .hot-product-synopsis {
            margin-top: 4px;
            font-size: 14px;
            color: #666;
            line-height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .hot-product-tag {
            margin-top: 10px;
            .tag-item {
              display: inline-block;
              padding: 0 10px;
              font-size: 12px;
              line-height: 26px;
              color: #666;
              background: #ecf2f8;
              &:not(:last-child) {
                margin-right: 8px;
              }
            }
          }
          &:hover {
            background: #f7fbfe;
          }
        }
      }
    }
  }
}
.contact-button {
  margin: 0 auto;
  width: 280px;
  height: 54px;
  line-height: 54px;
  font-size: 20px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  background: #ff9833;
}
</style>
<style lang="scss">
.ant-tabs-nav .ant-tabs-tab {
  padding: 24px 0;
  margin: 0 30px;
  font-size: 18px;
}
.ant-tabs-nav .ant-tabs-tab-active {
  padding: 24px 0;
  margin: 0 30px;
}
.ant-modal-footer {
  border-top: none;
  display: none;
}
.ant-modal-header {
  border-bottom: none;
  padding: 36px 60px 0;
  font-size: 18px;
  color: #333;
}
.ant-modal-title {
  text-align: center;
}
.ant-modal-body {
  padding: 20px 60px;
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  color: #666;
}
</style>
