<!--
 * @Author: summer
 * @LastEditTime: 2020-12-08 16:21:05
-->
<template>
  <div class="login">
    <div class="login-list">
      <div class="login-img">
        <img src="/static/home/images/login4.png" alt="" />
        <p class="company-name">固废驿站，工业废物一站式交易平台</p>
      </div>
      <slot name="form"></slot>
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
  border-radius: 8px;
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
.login .ant-form-item .ant-input-affix-wrapper .ant-input {
  padding-left: 46px;
  height: 48px;
  border-radius: 0;
}
.login .ant-form-item .ant-input-affix-wrapper .ant-input-prefix {
  margin-left: 10px;
}
.login .input-auth-code .ant-input-affix-wrapper .ant-input {
  padding-left: 20px;
}
.login .input-auth-code img {
  border: 1px solid #d9d9d9;
  width: 100px;
  height: 48px;
  cursor: pointer;
}
.login .ant-btn {
  width: 100px;
  height: 48px;
  border-radius: 0;
}
.buttom-submit .ant-btn {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 20s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
