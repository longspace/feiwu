<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 18:31:06
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
import WebHeader from "./components/web-header";
export default {
  data() {
    return {
      developmentPath: [
        {
          id: 1,
          date: "2020年11月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 1,
          date: "2021年3月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 1,
          date: "2020年11月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        },
        {
          id: 1,
          date: "2021年3月",
          synopsis:
            "国内第一个固废交易平台-固废驿站经过一年多的筹备正式上线了！"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  components: { WebHeader },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
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
  padding-bottom: 150px;
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
.contact {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  .contact-title {
    text-align: center;
  }
  .contact-list {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 60px 0;
    background: url("/static/home/images/about8.jpg") no-repeat 50% / cover;
    .contact-item {
      flex: 1;
      padding: 10px 30px;
      height: 300px;

      color: #fff;
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid rgba(229, 229, 229, 0.3);
      }
    }
  }
}
</style>
