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
      <div class="form" slot="form">
        <div class="login-title">
          用户登录
        </div>
        <a-form-model
          ref="form"
          :rules="rules"
          :model="form"
          class="login-form"
        >
          <a-form-model-item prop="phone" class="form-item-input">
            <a-input
              v-model="form.phone"
              allowClear
              placeholder="请输入您的手机号"
              class="input"
            >
              <img
                src="/static/home/images/register2.png"
                alt=""
                slot="prefix"
              />
            </a-input>
          </a-form-model-item>

          <a-form-model-item class="input-pwd form-item-input" prop="pwd">
            <a-input
              v-model="form.pwd"
              type="password"
              allowClear
              placeholder="请输入您的密码"
              class="input"
            >
              <img
                src="/static/home/images/register3.png"
                alt=""
                slot="prefix"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item class="input-auth-code" prop="picCode" slot="">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col flex="auto">
                <a-input
                  v-model="form.picCode"
                  allowClear
                  placeholder="请输入验证码"
                  class="input"
                >
                </a-input>
              </a-col>
              <a-col flex="100px" class="a-col-img">
                <img
                  ref="imgCaptcha"
                  @click.prevent="getPicCode"
                  :src="
                    'https://api.it120.cc/29summer/verification/pic/get?key=' +
                      timestamp
                  "
                  alt=""
                />
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item class="buttom-submit">
            <a-button
              type="primary"
              @click="onSubmitLogin"
              :disabled="loginButtonStatus"
              block
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="form-toast">
          <div class="toast">
            <span>还没有账户？</span>
            <router-link to="/webRegister">去注册</router-link>
          </div>
          <div class="toast-r">
            <router-link to="/forget">忘记密码</router-link>
          </div>
        </div>
      </div>
    </login-form>
  </div>
</template>

<script>
import LoginForm from "./components/login-form";
import { webLogin, getPicCode } from "@/utils/http/index.js";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (/^1[3|4|5|7|8]\d{9}$/.test(value)) {
        this.loginButtonStatus = !this.loginButtonStatus;
        callback();
      } else {
        callback(new Error("手机号码输入错误，请重新填写"));
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
      timestamp: new Date().getTime(), //验证码时间戳
      loginButtonStatus: true, // 登录按钮状态
      form: {
        phone: "",
        picCode: "",
        pwd: "" //密码
        // smsCode: "",
        // checkPwd: "" //确认密码
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
      webLogin({
        phone: this.form.phone,
        pwd: this.form.pwd,
        picCode: this.form.picCode
      })
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            that.loadData();
            that.$message.success(res.data.msg);
            this.$router.push({ path: "/webIndex" });
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("登录出错：", err);
        });
    },
    getPicCode() {
      // 点击更换验证码
      let captchaEle = this.$refs.imgCaptcha;
      this.timestamp = new Date().getTime();
      this.$set(
        captchaEle,
        "src",
        "https://api.it120.cc/29summer/verification/pic/get?key=" +
          this.timestamp
      );
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
    height: 530px;
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
    }
  }
}
.form-toast {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}
</style>
<style lang="scss">
.login .ant-input-affix-wrapper .ant-input {
  height: 48px;
  font-size: 14px;
  border-radius: 0;
}
.form-item-input .ant-input-affix-wrapper .ant-input {
  padding-left: 48px;
  border-radius: 0;
}
.form-item-input .ant-input-affix-wrapper .ant-input-prefix {
  left: 18px;
}
.buttom-submit .ant-btn-block {
  height: 48px;
  border-radius: 0;
}
.login .input-auth-code .a-col-img {
  margin-left: 5px;
  img {
    width: 100px;
    height: 48px;
  }
}
.login .ant-form-item {
  margin-bottom: 17px;
}
</style>
