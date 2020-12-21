<!--
 * @Author: summer
 * @LastEditTime: 2020-12-21 11:56:14
-->
<template>
  <div class="about">
    <div class="banner"></div>
    <div class="company">
      <div class="company-title">
        <p class="company-cn-title">公司介绍</p>
        <p class="compangy-en-title">Company profile</p>
      </div>
      <div class="company-info">
        <div class="company-img">
          <img src="/static/home/images/about1.jpg" alt="" />
        </div>
        <div class="company-r">
          <div class="company-synopsis">
            <p class="company-cn-synopsis">一站式互联网工业废物解决方案</p>
            <p class="company-en-synopsis">
              One stop Internet industrial waste solution
            </p>
          </div>
          <div class="company-introduce">
            固废驿站是中合润一科技有限公司开发的工业废物一站式交易平台，作为国内第一个固废交易平台，以互联网为基础汇聚固废产业链上下游各种资源，为固废行业提供了一站式互联网工业废物解决方案，实现了产废企业与处废企业之间的无障碍联系，发现价格，撮合网上交易，令产废企业与处置企业足不出户即可完成整个危废交易流程。
          </div>
        </div>
      </div>
    </div>
    <div class="achievement-list">
      <div class="achievement-item">
        <div class="achievement-num">1500+</div>
        <div class="achievement-text">
          对接超过1500家上下游 产废企业
        </div>
      </div>
      <div class="achievement-item">
        <div class="achievement-num">10+</div>
        <div class="achievement-text">
          运营团队拥有超过10年的 环保行业经验
        </div>
      </div>
      <div class="achievement-item">
        <div class="achievement-num">20+</div>
        <div class="achievement-text">
          能同时处置超过20万吨 危废物、一般固废物
        </div>
      </div>
      <div class="achievement-item">
        <div class="achievement-num">8+</div>
        <div class="achievement-text">
          拥有多项行业资质证书及 自主研发的专利技术
        </div>
      </div>
    </div>
    <div class="history">
      <div class="history-title">
        <div class="history-cn-title">发展历程</div>
        <div class="history-en-title">development history</div>
      </div>
      <div class="history-swiper" v-if="history.length">
        <div class="swiper">
          <swiper :options="swiperOption" ref="historySwiper">
            <swiper-slide
              class="slide-1"
              v-for="historyItem in history"
              :key="historyItem.id"
            >
              <div class="swiper-slide-info">
                <div class="swiper-slide-title">{{ historyItem.date }}</div>
                <div class="swiper-slide-text">
                  {{ historyItem.synopsis }}
                </div>
              </div>
              <div class="swiper-slide-date">{{ historyItem.date }}</div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!-- <div class="swiper">
          <div
            class="swiper-slide"
            v-for="historyItem in history"
            :key="historyItem.id"
          >
            <div class="swiper-slide-info">
              <div class="swiper-slide-title">{{ historyItem.date }}</div>
              <div class="swiper-slide-text">
                {{ historyItem.synopsis }}
              </div>
            </div>
            <div class="swiper-slide-date">{{ historyItem.date }}</div>
          </div>
        </div>
        <div class="swiper-button">
          <div class="button-prev">
            <img src="/static/home/images/about2.png" alt="" />
          </div>
          <div class="button-next">
            <img src="/static/home/images/about3.png" alt="" />
          </div>
        </div> -->
      </div>
    </div>
    <div class="contact">
      <div class="contact-title">
        <p class="contact-cn-title">欢迎联系我们</p>
        <p class="contact-en-title">Welcome to contact us</p>
      </div>
      <div class="contact-desc">
        如您有合作意向或其他想要咨询的，欢迎联系我们
      </div>
      <div class="contact-list">
        <div class="contact-item">
          <div class="contact-img">
            <img src="/static/home/images/about4.png" alt="" />
          </div>
          <div class="contact-name">公司地址</div>
          <div class="contact-text">上海市宝山区蕴川路2000号 3号楼5楼</div>
        </div>
        <div class="contact-item">
          <div class="contact-img">
            <img src="/static/home/images/about5.png" alt="" />
          </div>
          <div class="contact-name">联系电话</div>
          <div class="contact-text">021-36382923</div>
        </div>
        <div class="contact-item">
          <div class="contact-img">
            <img src="/static/home/images/about6.png" alt="" />
          </div>
          <div class="contact-name">电子邮箱</div>
          <div class="contact-text">Eric@forsite.cn</div>
        </div>
        <div class="contact-item">
          <div class="contact-img">
            <img src="/static/home/images/about6.png" alt="" />
          </div>
          <div class="contact-name">公司官网</div>
          <div class="contact-text">www.forsite.cn</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import WebHeader from "./components/web-header";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        // loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionEnd: function() {
            console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
      },
      history: [
        {
          id: 1,
          date: "2020年11月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 2,
          date: "2021年3月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 3,
          date: "2020年11月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 4,
          date: "2021年3月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 5,
          date: "2021年3月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  components: { WebHeader, swiper, swiperSlide },
  computed: {
    swiper() {
      return this.$refs.historySwiper.swiper;
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // this.initSwiper();
    console.log("this.swiper", this.$refs.historySwiper.swiper);
    // console.log("this.swiperOption", this.swiperOption);
    this.$nextTick(() => {
      // const swiper = this.$refs.historySwiper.swiper;

      console.log("swiper", this.swiper.activeIndex);
      // this.swiper. slideChangeTransitionEnd
    });
  },
  methods: {
    // initSwiper() {
    //   this.swiperOption = {
    //     slidesPerView: 4,
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev"
    //     }
    //   };
    // }
  }
};
</script>
<style scoped lang="scss">
@import "../../../static/home/css/index.scss";
.banner {
  width: 100%;
  height: 300px;
  background: url("/static/home/images/about-banner.jpg") no-repeat 50% / cover;
}
.company {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
  .company-title {
    text-align: center;
    margin-bottom: 44px;
    .company-cn-title {
      font-size: 32px;
      color: #333;
      font-weight: bold;
    }
    .compangy-en-title {
      font-size: 16px;
      line-height: 22px;
      text-transform: uppercase;
      color: #999;
    }
  }
  .company-info {
    display: flex;
    justify-content: space-between;
    .company-img {
      flex: 1;
    }
    .company-r {
      flex: 1;
      padding-left: 20px;
      .company-synopsis {
        .company-cn-synopsis {
          font-size: 24px;
          line-height: 30px;
          color: #333;
        }
        .company-en-synopsis {
          font-size: 14px;
          color: #999;
          line-height: 30px;
        }
      }
      .company-introduce {
        margin-top: 40px;
        font-size: 16px;
        line-height: 30px;
        text-align: justify;
        color: #666;
      }
    }
  }
}
.achievement-list {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1200px;
  margin: 72px auto 136px;
  .achievement-item {
    flex: 1;
    padding: 50px;
    text-align: center;
    background: #eff2f4;
    .achievement-num {
      font-size: 40px;
      color: #4293f4;
    }
    .achievement-text {
      margin-top: 20px;
      font-size: 16px;
      line-height: 26px;
      color: #666;
      &::after {
        content: "";
        display: block;
        width: 50px;
        height: 3px;
        margin: 60px auto 0;
        background: #4293f4;
      }
    }
    &:not(:last-child) {
      margin-right: 30px;
    }
  }
}
.history {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto 146px;
  .history-title {
    text-align: center;
    .history-cn-title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .history-en-title {
      font-size: 14px;
      text-transform: uppercase;
      color: #888;
    }
  }
  .history-swiper {
    position: relative;
    .swiper {
      display: flex;
      justify-content: space-between;
      width: 96%;
      max-width: 1000px;
      margin: 42px auto 0;
      overflow: hidden;
      padding: 30px;
      // border: 1px solid #eee;
      .swiper-container {
        overflow: visible;
        .swiper-slide {
          position: relative;
          display: flex;
          flex-direction: column;
          // border: 1px solid #eee;
          .swiper-slide-info {
            position: relative;
            padding: 20px 32px 20px;
            height: 180px;
            margin-bottom: 20px;
            // border: 1px solid #ccc;
            border-radius: 3px;
            background: #fff;
            box-shadow: rgba(102, 102, 102, 0.15) 0 0 15px;
            .swiper-slide-title {
              font-size: 20px;
              line-height: 30px;
              color: #333;
              font-weight: bold;
            }
            .swiper-slide-text {
              margin-top: 12px;
              font-size: 14px;
              line-height: 20px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
            }
            // &::before {
            //   content: "";
            //   display: block;
            //   position: absolute;
            //   z-index: 1;
            //   top: 0;
            //   left: 0;
            //   width: 100%;
            //   height: 100%;
            //   /* ①添加颜色 */
            //   background-color: rgb(255, 255, 5);
            //   /* ②添加模糊*/
            //   filter: blur(15px);
            //   /* ③调整位置和大小 */
            //   transform: translateY(10px) scale(1.05);
            //   /* ④添加混合效果 */
            //   mix-blend-mode: multiply;
            // }
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 0;
              height: 0;
              transform: translate(-50%, 0);
              border-width: 12px;
              margin-bottom: -24px;
              border-style: solid dashed dashed dashed;
              border-color: #fff transparent transparent transparent;
            }
          }
          .swiper-slide-date {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            margin-top: 54px;
            min-height: 180px;
            text-align: center;
            font-size: 16px;
            color: #999;
            line-height: 30px;
          }
          &:nth-of-type(even) {
            flex-direction: column-reverse;
            .swiper-slide-date {
              margin-bottom: 74px;
              align-items: flex-end;
              margin-top: 0;
            }
            .swiper-slide-info {
              margin-bottom: 0;
              margin-top: 20px;
              &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                width: 0;
                height: 0;
                transform: translate(-50%, 0);
                border-width: 12px;
                margin-top: -24px;
                border-style: dashed dashed solid dashed;
                border-color: transparent transparent #fff transparent;
              }
              &::after {
                content: "";
                display: none;
              }
            }
            &:hover {
              .swiper-slide-info::before {
                z-index: 999;
                border-color: transparent transparent#4293f4 transparent;
              }
            }
          }
          &:not(:first-child) {
            margin-left: -40px;
          }
          &::before {
            content: "";
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
            display: block;
            width: 12px;
            height: 12px;
            background: rgba(255, 2555, 255, 1);
            // margin: 8px;
            border-radius: 50%;
            z-index: 100;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
            display: block;
            width: 22px;
            height: 22px;
            z-index: 99;
            background: rgba(66, 147, 244, 0.2);
            border-radius: 50%;
          }
          &:hover::before {
            background: rgba(66, 147, 244, 1);
            z-index: 110;
          }
          &:hover {
            .swiper-slide-info {
              color: #fff;
              background: #4293f4;
              .swiper-slide-title {
                color: #fff;
              }
              .swiper-slide-text {
                color: #fff;
              }
              &::after {
                border-color: #4293f4 transparent transparent transparent;
              }
            }
          }
        }
      }
    }
    .swiper-button {
      .button-prev {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .button-next {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.contact {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  .contact-title {
    text-align: center;
    .contact-cn-title {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .contact-en-title {
      text-transform: uppercase;
      font-size: 14px;
      color: #999;
    }
  }
  .contact-desc {
    margin-top: 24px;
    font-size: 16px;
    color: #666;
    text-align: center;
  }
  .contact-list {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 150px;
    padding: 60px 0;
    background: url("/static/home/images/about8.jpg") no-repeat 50% / cover;
    .contact-item {
      flex: 1;
      padding: 10px 56px;
      height: 300px;
      color: #fff;
      text-align: center;
      .contact-name {
        margin-top: 40px;
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
      }
      .contact-text {
        margin-top: 20px;
        font-size: 14px;
        line-height: 22px;
      }
      &:not(:last-child) {
        border-right: 1px solid rgba(229, 229, 229, 0.3);
      }
    }
  }
}
</style>
<style lang="scss">
.history .history-swiper .swiper .swiper-wrapper {
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -2px;
    background: #d7e5f0;
    height: 4px;
    display: block;
    z-index: 99;
  }
}
.history-swiper .swiper-button-prev {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  outline: none;
  background: url("/static/home/images/about2.png");
}
.history-swiper .swiper-button-next {
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("/static/home/images/about3.png");
}
</style>
