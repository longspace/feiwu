<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 11:39:17
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
            <router-link to="web-login">马上登录</router-link>
            <router-link to="index" class="back-home">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="register-list">
      <div class="register-img">
        <img src="../../../../static/home/images/login2.png" alt="" />
        <p class="company-name">固废驿站，工业废物一站式交易平台</p>
      </div>
      <div class="register-form" v-if="isProduction">
        <div class="register-title">产废单位注册</div>
        <a-form-model
          ref="registerForm"
          :rules="rules"
          :model="form"
          class="login-form"
        >
          <a-form-model-item has-feedback prop="phone">
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
          <a-form-model-item class="input-auth-code" prop="smsCode">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col :flex="2">
                <a-input
                  v-model="form.smsCode"
                  allowClear
                  placeholder="请输入短信验证码"
                  class="input"
                >
                </a-input>
              </a-col>
              <a-col :flex="1">
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
          <a-form-model-item has-feedback class="input-pwd" prop="pwd">
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
          <a-form-model-item has-feedback class="input-pwd" prop="checkPwd">
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
            <router-link to="">《用户协议》</router-link>
          </div>
          <div class="register-change" @click="changeRoleRegister">
            <img src="/static/home/images/register4.png" alt="" />
            <span>我是处废单位</span>
          </div>
        </div>
      </div>
      <div class="register-form" v-else>
        <div class="register-title">处废单位注册</div>
        <a-form-model
          ref="registerForm"
          :rules="rules"
          :model="form"
          class="login-form"
        >
          <a-form-model-item prop="phone">
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
          <a-form-model-item class="input-auth-code" prop="smsCode">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col :flex="2">
                <a-input
                  v-model="form.smsCode"
                  allowClear
                  placeholder="请输入短信验证码"
                  class="input"
                >
                </a-input>
              </a-col>
              <a-col :flex="1">
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
          <a-form-model-item class="input-pwd" prop="pwd">
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
          <a-form-model-item class="input-pwd" prop="checkPwd">
            <a-input
              v-model="form.checkPwd"
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
          <a-form-model-item class="buttom-submit">
            <a-button type="primary" @click="onSubmit">
              立即注册
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="form-toast">
          <div class="toast">
            <span>注册表示同意</span>
            <router-link to="">《用户协议》</router-link>
          </div>
          <div class="register-change-production" @click="changeRoleRegister">
            <img src="/static/home/images/register5.png" alt="" />
            <span>我是产废单位</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <span>@Copyingright 中合润一科技有限公司 版权所有 </span>
      <a href="#" class="aq">沪ICP备xxxxxxxx号</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
        callback(new Error("手机号码输入错误，请重新填写"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPwd !== "") {
          this.$refs.registerForm.validateField("checkPwd");
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
      isProduction: true, // 是否是产废单位
      codeStatus: false, // 验证码按钮状态
      codeButtonText: "获取验证码", //获取短信验证码按钮内容
      form: {
        phone: "",
        smsCode: "",
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
            // validator: validatePass2
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
  methods: {
    changeRoleRegister() {
      this.isProduction = !this.isProduction;
    },
    onSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendVerifyCode() {
      console.log("获取验证码");
      let timeDown = 60;
      this.codeStatus = !this.codeStatus;
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
.register-list {
  display: flex;
  justify-content: space-between;
  width: 96%;
  max-width: 1000px;
  box-shadow: 0px 5px 16px 0px rgba(162, 162, 162, 0.27);
  margin: 124px auto 60px;
  .register-img {
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
  .register-form {
    padding: 36px 88px;
    width: 50%;
    .register-title {
      margin-top: 14px;
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
        margin: 26px auto;
        background: linear-gradient(90deg, #3888e7, #9fc3f8);
      }
    }
    .ant-form-item {
      .ant-btn {
        width: 100%;
      }
    }
    .input-auth-code {
      display: flex;
      justify-content: space-between;
      margin: 16px 0;
    }
    .form-toast {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .register-change {
        font-size: 14px;
        color: #f3a824;
      }
      .register-change-production {
        color: #4293f4;
      }
    }
  }
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
