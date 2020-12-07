<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 14:53:06
-->
<template>
  <div class="web-login">
    <div class="web-header">
      <div class="header">
        <div class="header-logo">
          <img src="/static/home/images/logo.png" alt="" />
        </div>
        <div class="header-login">
          <div class="header-login-toast">
            <span>登录固废驿站，开启工业废物便捷交易之旅！</span>
            <router-link to="index" class="back-home">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <login-form>
      <div slot="login-title">账号登录</div>
    </login-form>
  </div>
</template>

<script>
import LoginForm from "./components/login-form";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
        callback(new Error("手机号码输入错误，请重新填写"));
      } else {
        this.loginButtonStatus = !this.loginButtonStatus;
        callback();
      }
    };
    // let validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.form.checkPwd !== "") {
    //       this.$refs.registerForm.validateField("checkPwd");
    //     }
    //     callback();
    //   }
    // };

    return {
      loginButtonStatus: true, // 登录按钮状态
      loginForm: {
        phone: "",
        picCode: "",
        pwd: "", //密码
        smsCode: "",
        checkPwd: "" //确认密码
      },
      // 表单校验规则
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "change"
          }
        ],
        picCode: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "change"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          // {
          //   min: 8,
          //   max: 16,
          //   message: "密码长度为8-16",
          //   trigger: "change"
          // },
          // { validator: validatePass, trigger: "change" }
        ]
      }
    };
  },
  components: { LoginForm },
  methods: {
    onSubmitLogin() {
      console.log("登录");
    }
  }
};
</script>
<style scoped lang="scss">
.web-header {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    widows: 96%;
    max-width: 1200px;
    margin: 0 auto;
    .header-login-toast {
      color: #999;
      .back-home {
        margin-left: 32px;
        color: #333;
      }
    }
  }
}
.login-list {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1000px;
  box-shadow: 0px 5px 16px 0px rgba(162, 162, 162, 0.27);
  margin: 124px auto 60px;
  .login-img {
    padding: 47px 90px;
    width: 50%;
    text-align: center;
    background: url(/static/home/images/register1.jpg) no-repeat left top;
    .company-name {
      margin-top: 26px;
      font-size: 18px;
      line-height: 50px;
      border-radius: 26px;
      font-weight: bold;
      border: 1px solid rgba(255, 255, 255, 0.54);
      color: #fff;
    }
  }
  .form {
    padding: 36px 88px;
    width: 50%;
    .login-title {
      margin-top: 34px;
      font-size: 34px;
      line-height: 1em;
      text-align: center;
      color: #333;
      font-weight: bold;
      &::after {
        content: "";
        display: block;
        width: 55px;
        height: 3px;
        margin: 26px auto 36px;
        background: linear-gradient(90deg, #3888e7, #9fc3f8);
      }
      .buttom-submit {
        .ant-btn {
          width: 100%;
        }
      }
    }
  }
}
.form-toast {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}
.copyright {
  width: 96%;
  max-width: 1200px;
  text-align: center;
  font-size: 14px;
  color: #999;
  .aq {
    color: #999;
  }
}
</style>
