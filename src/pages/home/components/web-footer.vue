<!--
 * @Author: summer
 * @LastEditTime: 2020-12-11 11:56:14
-->
<template>
  <footer class="footer">
    <div class="footer-list">
      <div class="footer-top">
        <ul class="superiority">
          <li class="superiority-item">
            <img src="../../../../static/home/images/footer1.png" alt="" />
            <p>安全保障</p>
          </li>
          <li class="superiority-item">
            <img src="../../../../static/home/images/footer2.png" alt="" />
            <p>全程担保</p>
          </li>
          <li class="superiority-item">
            <img src="../../../../static/home/images/footer3.png" alt="" />
            <p>贴心服务</p>
          </li>
          <li class="superiority-item">
            <img src="../../../../static/home/images/footer4.png" alt="" />
            <p>专业指导</p>
          </li>
          <li class="superiority-item">
            <img src="../../../../static/home/images/footer5.png" alt="" />
            <p>完善售后</p>
          </li>
        </ul>
        <div class="footer-top-r">
          <p>
            周一至周日 8:00-20:00
          </p>
          <p>
            021-36382923
          </p>
          <router-link to="service" class="footer-service"
            >在线客服</router-link
          >
        </div>
      </div>
      <div class="footer-middle">
        <div class="footer-middle-l">
          <div class="footer-nav">
            <router-link to="/about" class="footer-nav-link"
              >关于我们</router-link
            >
            <router-link to="/about" class="footer-nav-link"
              >联系我们</router-link
            >
            <router-link to="/about" class="footer-nav-link"
              >帮助中心</router-link
            >
            <router-link to="/about" class="footer-nav-link"
              >问题反馈</router-link
            >
            <router-link to="/about" class="footer-nav-link"
              >隐私政策</router-link
            >
            <router-link to="/about" class="footer-nav-link"
              >法律声明</router-link
            >
          </div>
          <div class="friendly-link">
            <span>友情链接：</span>
            <a href="https://sthj.sh.gov.cn/">
              上海市生态环境局
            </a>
            <a href="http://sthjt.jiangxi.gov.cn/">
              江西省生态环境厅
            </a>
          </div>
        </div>
        <div class="footer-follow">
          <span>关注我们：</span>
          <img src="../../../../static/home/images/footer6.png" alt="" />
          <img src="../../../../static/home/images/footer7.png" alt="" />
        </div>
      </div>
      <div class="footer-copy">
        ©copyright 中合润一科技有限公司 版权所有
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
.footer {
  padding-top: 62px;
  background: #293947;
  .footer-list {
    width: 96%;
    max-width: 1200px;
    margin: 0 auto;
    .footer-top {
      display: flex;
      justify-content: space-between;
      color: #fff;
      .superiority {
        display: flex;
        justify-content: space-between;
        text-align: center;
        width: 60.8%;
        .superiority-item {
          p {
            margin-top: 11px;
            font-size: 14px;
            line-height: 1em;
          }
        }
      }
      .footer-top-r {
        text-align: right;
        p {
          &:first-child {
            font-size: 14px;
            line-height: 14px;
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 24px;
          }
        }
        .footer-service {
          display: inline-block;
          margin-top: 20px;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          color: #fff;
          background-color: #4293f4;
        }
      }
    }
    .footer-middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 70px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      .footer-middle-l {
        display: flex;
        .footer-nav {
          margin-right: 50px;
          a {
            position: relative;
            font-size: 14px;
            line-height: 1em;
            padding-right: 14px;
            color: #fff;
            &:not(:last-child):after {
              content: "";
              display: inline-block;
              position: absolute;
              top: 50%;
              right: 0;
              //   margin-left: 12px;
              //   margin-right: 12px;
              width: 2px;
              height: 2px;
              line-height: 14px;
              border-radius: 50%;
              background-color: #fff;
            }
            &:not(:first-child) {
              padding-left: 14px;
            }
          }
        }
        .friendly-link {
          font-size: 14px;
          color: #8497a8;
          a {
            font-size: 14px;
            color: #fff;
            &:last-child {
              margin-left: 16px;
            }
          }
        }
      }
      .footer-follow {
        color: #fff;
      }
    }
    .footer-copy {
      padding-top: 10px;
      padding-bottom: 20px;
      font-size: 12px;
      line-height: 1em;
      color: #5e768a;
    }
  }
}
</style>
