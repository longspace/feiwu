<!--
 * @Author: summer
 * @LastEditTime: 2020-12-08 10:18:31
-->
<template>
  <div class="register">
    <div class="web-header">
      <div class="header">
        <div class="header-logo">
          <img src="/static/home/images/logo.png" alt="" />
        </div>
        <div class="header-login">
          <div class="header-login-toast">
            <span>已有账号，</span>
            <router-link to="webLogin">马上登录</router-link>
            <router-link to="/" class="back-home">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <login-form>
      <div class="form" slot="form">
        <div class="login-title">
          处废单位注册
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
              class="input"
              allowClear
              placeholder="请输入您的手机号"
            >
              <img
                src="/static/home/images/register2.png"
                alt=""
                slot="prefix"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item class="input-auth-code" prop="smsCode">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col flex="auto" class="code-input">
                <a-input
                  v-model="form.smsCode"
                  allowClear
                  placeholder="请输入短信验证码"
                  class="input"
                >
                </a-input>
              </a-col>
              <a-col flex="100px">
                <a-button
                  type="primary"
                  class="code-button"
                  @click="sendVerifyCode"
                  :disabled="codeStatus"
                >
                  {{ codeButtonText }}
                </a-button>
              </a-col>
            </a-row>
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
          <a-form-model-item class="input-pwd form-item-input" prop="checkPwd">
            <a-input
              v-model="form.checkPwd"
              type="password"
              allowClear
              placeholder="请确认您的密码"
              class="input"
            >
              <img
                src="/static/home/images/register3.png"
                alt=""
                slot="prefix"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item class="buttom-submit">
            <a-button type="primary" @click="onSubmit">
              立即注册
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="form-toast">
          <div class="toast">
            <span>注册表示同意</span>
            <router-link to="/treaty" class="treaty">《用户协议》</router-link>
          </div>
          <router-link to="webRegisterProduct" class="toast-r">
            <img src="/static/home/images/register5.png" alt="" />
            <span>我是产废单位</span>
          </router-link>
        </div>
      </div>
    </login-form>
  </div>
</template>

<script>
import LoginForm from "./components/login-form";
import { webRegister, getSmsCode } from "@/utils/http/index.js";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (/^1[3|4|5|7|8]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码输入错误，请重新填写"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPwd !== "") {
          this.$refs.form.validateField("checkPwd");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pwd) {
        callback(new Error("输入的密码不同"));
      } else {
        callback();
      }
    };
    return {
      codeStatus: false, // 验证码按钮状态
      codeButtonText: "获取验证码", //获取短信验证码按钮内容
      smsVerifyCode: "", // 获取的短信验证码
      form: {
        phone: "",
        smsCode: "", // 输入框输入的短信验证码
        pwd: "", //密码
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
        smsCode: [
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
          },
          {
            min: 8,
            max: 16,
            message: "密码长度为8-16",
            trigger: "change"
          },
          { validator: validatePass, trigger: "change" }
        ],
        checkPwd: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "change"
          },
          {
            min: 8,
            max: 16,
            message: "密码长度为8-16",
            trigger: "change"
          },
          { validator: validatePass2, trigger: "change" }
        ]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  components: { LoginForm },
  methods: {
    onSubmit() {
      webRegister({
        phone: this.form.phone,
        smsCode: this.form.smsCode,
        smsVerifyCode: this.smsVerifyCode,
        pwd: this.form.pwd
      })
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            that.loadData();
            this.$router.push({ path: "/webLogin" });
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("this.form:", data);
          console.log("登录出错：", err);
        });
    },
    sendVerifyCode() {
      console.log("获取验证码");
      getSmsCode({
        phone: this.form.phone,
        picCode: this.form.picCode
      })
        .then(res => {
          const { data } = res;
          if (data.code == 200) {
            that.loadData();
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          let timeDown = 60;
          this.codeStatus = !this.codeStatus;
          this.smsVerifyCode = "1234";
          console.log("this.smmcode:", this.smsVerifyCode);

          let codeInterval = setInterval(() => {
            timeDown--;
            console.log("timedown:", timeDown);
            if (timeDown == 0) {
              clearInterval(codeInterval);
              this.codeStatus = !this.codeStatus;
              this.codeButtonText = "获取验证码";
            } else {
              this.codeButtonText = `${timeDown}s`;
              console.log("发送验证码倒计时:", timeDown);
            }
          }, 1000);
          console.log("登录出错：", err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../static/home/css/index.scss";
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
.login-list .form .login-title {
  margin-top: 14px;
}
.login-list .form .login-title::after {
  margin: 26px auto;
}
.form .ant-form-item:not(:last-child) {
  margin-bottom: 17px;
}
.form .form-toast {
  .toast {
    font-size: 14px;
    color: #666;
    a {
      font-size: 14px;
      color: #666;
    }
  }
  .toast-r {
    font-size: 14px;
    color: #4293f4;
  }
}
</style>
<style lang="scss"></style>
