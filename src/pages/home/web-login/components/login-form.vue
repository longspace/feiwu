<!--
 * @Author: summer
 * @LastEditTime: 2020-12-07 20:01:29
-->
<template>
  <div class="login">
    <div class="login-list">
      <div class="login-img">
        <img src="/static/home/images/login4.png" alt="" />
        <p class="company-name">固废驿站，工业废物一站式交易平台</p>
      </div>
      <slot name="form"></slot>
      <!-- <div class="form">
        <div class="login-title">
          用户登录
        </div>
        <a-form-model
          ref="loginForm"
          :rules="rules"
          :model="form"
          class="login-form"
        >
          <a-form-model-item has-feedback prop="phone" class="form-item-input">
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

          <a-form-model-item
            has-feedback
            class="input-pwd form-item-input"
            prop="pwd"
          >
            <a-input
              v-model="form.pwd"
              type="password"
              allowClear
              placeholder="请输入您的密码"
              class="input form-item-input"
            >
              <img
                src="/static/home/images/register3.png"
                alt=""
                slot="prefix"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            has-feedback
            class="input-auth-code"
            prop="picCode"
            slot=""
          >
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
                <img src="/static/home/images/login3.jpg" alt="" />
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item class="buttom-submit">
            <slot name="button-submit" class="submit"></slot>
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
            <slot name="toast-l"></slot>
            <span>还没有账号</span>
            <router-link to="">去注册</router-link>
          </div>
          <div class="login-link">
            <slot name="toast-r"></slot>
            <router-link to="">忘记密码</router-link>
          </div>
        </div>
      </div> -->
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
      if (/^1[3|4|5|7|8]\d{9}$/.test(value)) {
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
      loginButtonStatus: true, //登录按钮状态
      isProduction: true, // 是否是产废单位
      codeStatus: false, // 验证码按钮状态
      codeButtonText: "获取验证码", //获取短信验证码按钮内容
      form: {
        phone: "",
        smsCode: "",
        picCode: "", // 短信验证码
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
    onSubmitLogin() {
      console.log("登录");
    }
  },
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
};
</script>
<style scroped lang="scss">
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
.copyright {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto 132px;
  text-align: center;
  font-size: 14px;
  color: #999;
  .aq {
    color: #999;
  }
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

</style>
