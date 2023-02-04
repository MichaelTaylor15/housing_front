<template>
  <section>
    <div class="container">
      <h2 style="text-align: center; font-weight: 500; color: gray">
        欢迎登录
      </h2>
      <!-- 登录框 -->
      <el-form
        v-if="registerMode == 0"
        :model="userInfo"
        ref="userInfo"
        class="form-signin"
      >
        <el-form-item prop="server">
          <el-input
            style="margin-top: 40px"
            class="my-input"
            v-model="userInfo.username"
            placeholder="手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" v-if="loginModeByPhone === 0">
          <!-- 密码框 -->
          <el-input
            class="my-input"
            v-model="userInfo.password"
            placeholder="密码"
            show-password
          ></el-input
        ></el-form-item>
        <!-- 验证码框 -->
        <el-form-item v-else-if="loginModeByPhone == 1">
          <el-input
            class="pwd-input"
            v-model="userInfo.validateCode"
            placeholder="验证码"
          ></el-input>
          <!-- 发送验证码 -->

          <a
            @click="getCode()"
            type="button"
            :value="code"
            style="
              border: none;
              background-color: none;
              cursor: pointer;
              margin-left: 10px;
            "
            >{{ code }}</a
          >
        </el-form-item>
        <el-form-item style="margin-left: 25%">
          <el-checkbox v-model="userInfo.remember">记住我</el-checkbox>
          <a
            @click="changeLogin(loginModeByPhone)"
            style="cursor: pointer; user-select: none; margin-left: 29%"
            >{{
              loginModeByPhone == 0 ? "手机验证码登录" : "用户名密码登录"
            }}</a
          >
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="validateForm()">立即登录</el-button>
          <el-button
            type="primary"
            v-if="registerMode == 0"
            @click="changeRegisterMode(registerMode)"
            >注册</el-button
          >
          <el-button v-if="loginModeByPhone == 0" @click="resetForm()"
            >重置密码</el-button
          >
        </el-form-item>
        <!-- 更多登录方式 -->
        <div>
          <span style="margin-left: 150px">社交帐号登录？</span>

          <a href="http://localhost:6060/api/ucenter/wx/getQrCode"
            ><img src="/images/wx.png" width="25px"
          /></a>
        </div>
      </el-form>
      <!-- 注册表单 -->
      <el-form
        v-if="registerMode == 1"
        :model="userInfo"
        ref="userInfo"
        class="form-signin"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            style="margin-top: 20px"
            class="my-input"
            v-model="userInfo.username"
            placeholder="手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <!-- 密码框 -->
          <el-input
            class="my-input"
            v-model="userInfo.password"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 确认密码框 -->
        <el-form-item prop="checkPassword">
          <el-input
            class="my-input"
            v-model="userInfo.checkPassword"
            placeholder="确认密码"
            show-password
          ></el-input
        ></el-form-item>
        <!-- 验证码框 -->
        <el-form-item>
          <el-input
            class="pwd-input"
            v-model="userInfo.validateCode"
            placeholder="验证码"
          ></el-input>
          <!-- 发送验证码 -->
          <a
            @click="getCode()"
            type="button"
            :value="code"
            style="
              border: none;
              background-color: none;
              cursor: pointer;
              margin-left: 10px;
              margin-top: 10px;
            "
            >{{ code }}</a
          >
        </el-form-item>
        <el-form-item style="margin-left: 25%">
          <a
            @click="changeLogin(loginModeByPhone)"
            style="cursor: pointer; user-select: none; margin-left: 31%"
            v-if="loginModeByPhone == 1 && register == 0"
            >用户名密码登录</a
          >
        </el-form-item>
        <el-form-item style="text-align: center; margin-top: -15px">
          <!-- 提交注册表单 -->
          <el-button type="primary" @click="validateForm()">提交注册</el-button>
          <el-button
            type="primary"
            v-if="registerMode == 1"
            @click="changeRegisterMode(registerMode)"
            >返回登录</el-button
          >
          <el-button @click="resetForm()">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import userApi from "@/api/userLoginApi";
import cookie from "js-cookie";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.checkPassword !== "") {
          this.$refs.userInfo.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //登录/注册对象
      userInfo: {
        username: "",
        nickName: "",
        userImg: "",
        password: "",
        checkPassword: "",
        validateCode: "",
        remember: false,
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      //注册对象
      // registerInfo: {
      //   username: "",
      //   password: "",
      //   validateCode: "",
      //   remember: false,
      // },

      //注册模式，默认0为登录模式
      registerMode: 0,
      code: "发送验证码",
      second: 120,
      sending: true,

      //登录模式：0用户名密码、1手机验证码
      loginModeByPhone: 0,
      token: "",
    };
  },
  created() {},
  methods: {
    //校验表单
    validateForm() {
      var loginObj = {}; //登录对象
      //登录模式:用户名密码模式、手机验证码模式
      if (this.registerMode == 0) {
        //用户名密码模式
        if (this.loginModeByPhone == 0) {
          //手机号和密码不为空
          if (
            this.userInfo.username != null &&
            this.userInfo.username != "" &&
            this.userInfo.password != "" &&
            this.userInfo.password != null
          ) {
            //调用登录接口
            //清空验证码以便后端判断用户名密码登录或手机验证码登录....
            this.userInfo.validateCode = "";
            this.submitForm();
          } else {
            this.$message.error("用户名或密码为空");
          }
        } else {
          //手机号和验证码不为空
          if (
            this.userInfo.username != null &&
            this.userInfo.username != "" &&
            this.userInfo.validateCode != "" &&
            this.userInfo.validateCode != null
          ) {
            //清空密码
            this.userInfo.password = "";
            this.submitForm();
          } else {
            this.$message.error("手机号或验证码为空");
          }
        }
      } else {
        //注册模式
      }
    },
    //提交表单
    submitForm() {
      userApi.loginSubmit(this.userInfo).then((response) => {
        //把token放入cookie
        if (response.data.success) {
          this.token = response.data.data.token;
          console.log(response.data.data.token);
          cookie.set("token", this.token, {
            domain: "localhost",
          });
        }
        console.log("token:" + this.token);
      });
      //获取用户信息根据token
      userApi
        .getUserInfoByToken()
        .then((response) => {
          //获得了用户信息保存到cookie
          this.userInfo = response.data.data.userInfo;
          console.log("login:");
          console.log(this.userInfo);
          //置空

          console.log("cookie token:" + cookie.get("token"));
          cookie.set("userInfo", "", { domain: "localhost" });
          cookie.set("userInfo", JSON.stringify(this.userInfo), {
            domain: "localhost",
          });
          console.log(" userInfo cookie :" + cookie.get("userInfo"));
          //回到首页面
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("sss失败的");
          this.$message({
            type: error,
            message: response.data.data.message,
          });
        });
    },
    //重置表单
    resetForm() {
      this.userInfo.password = "";
    },
    //切换登录方式
    changeLogin(loginModeByPhone) {
      this.loginModeByPhone = loginModeByPhone == 0 ? 1 : 0;
      //验证码登录模式
      if (this.loginModeByPhone == 1) {
      }
      console.log("loginModeByPhone:" + this.loginModeByPhone);
    },
    //切换注册模式或登录模式
    changeRegisterMode(registerMode) {
      //若是登录切换到注册模式，清空登录对象;若是注册切换到登录，保留账号清空其他信息
      if (registerMode == 0) {
        this.userInfo = {};
      } else {
        this.userInfo.password = "";
        this.userInfo.checkPassword = "";
        this.userInfo.validateCode = "";
      }

      this.registerMode = registerMode == 1 ? 0 : 1;
      //清空input验证message
      this.$refs.userInfo.clearValidate();
    },
    //点击发送验证码
    getCode() {
      //校验是否输入了手机号
      if (this.userInfo.username != "" && this.userInfo.username != null) {
        //判断手机号是否合规
        var p1 = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
        if (!p1.test(this.userInfo.username)) {
          this.$message.error("请输入正确的手机号");
          return;
        }
        //调用发送短信接口

        //倒计时显示
        this.timeDown();
      } else {
        this.$message.error("请输入手机号");
      }
    },
    //倒计时,每个一秒执行
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        //秒数赋值给code
        this.code = this.second;

        //时间结束，即可再次发送
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 120;
          this.code = "获取验证码";
        }
      }, 1000);
    },
    validatePass2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.checkPassword !== "") {
          this.$refs.userInfo.validateField("checkPassword");
        }
        callback();
      }
    },
  },
};
</script>

<style>
.form-signin {
  background: #fff;
  width: 50%;
  margin-left: 25%;
  height: 350px;
  margin-bottom: 100px;
}
/* .el-input__inner {
  margin-left: 25%;
  width: 50% !important;
} */
.my-input {
  margin-left: 25%;
  width: 50% !important;
}
.pwd-input {
  margin-left: 25%;
  width: 25% !important;
}
.el-form-item__error {
  margin-left: 150px !important;
}
</style>