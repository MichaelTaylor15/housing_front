<template>
  <section>
    <div class="container">
      <h2 style="text-align: center; font-weight: 500; color: gray">
        欢迎登录
      </h2>
      <!-- 登录框 -->
      <el-form :model="userInfo" ref="userInfo" class="form-signin">
        <el-form-item prop="server">
          <el-input
            style="margin-top: 40px"
            class="my-input"
            v-model="userInfo.username"
            placeholder="手机号"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="userInfo.loginModeByPhone == 0">
          <!-- 密码框 -->
          <el-input
            class="my-input"
            v-model="userInfo.password"
            placeholder="密码"
            show-password
          ></el-input
        ></el-form-item>
        <!-- 验证码框 -->
        <el-form-item v-else>
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
            @click="changeLogin(userInfo.loginModeByPhone)"
            style="cursor: pointer; user-select: none; margin-left: 29%"
            >{{
              userInfo.loginModeByPhone == 0
                ? "手机验证码登录"
                : "用户名密码登录"
            }}</a
          >
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item
          style="text-align: center"
          :class="{ 'btn-left': userInfo.loginModeByPhone == 1 }"
        >
          <el-button type="primary" @click="validateForm()">立即登录</el-button>
          <a href="/signup"><el-button type="primary">注册</el-button></a>

          <el-button v-if="userInfo.loginModeByPhone == 0" @click="resetForm()"
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
    </div>
  </section>
</template>

<script>
import userApi from "@/api/userApi";
import cookie from "js-cookie";

export default {
  data() {
    return {
      //登录/注册对象
      userInfo: {
        username: "12345678910",
        nickName: "",
        userImg: "",
        password: "123456",
        validateCode: "",
        remember: false,
        //登录模式：0用户名密码、1手机验证码
        loginModeByPhone: 0,
      },
      //注册模式，默认0为登录模式
      registerMode: "0",
      code: "发送验证码",
      second: 300,
      sending: true,

      token: "",
      //loading
      fullscreenLoading: false,
    };
  },
  created() {},
  methods: {
    //校验表单
    validateForm() {
      //登录模式:用户名密码模式、手机验证码模式
      //用户名密码模式

      if (this.userInfo.loginModeByPhone == 0) {
        //手机号和密码不为空
        console.log("1111");
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
        console.log("222");
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
    },
    //提交表单
    submitForm() {
      console.log("验证成功，准备提交。。。");
      userApi.loginSubmit(this.userInfo).then((response) => {
        //把token放入cookie

        if (response.data.success) {
          // this.fullscreenLoading = true;
          // setTimeout(() => {
          //   this.fullscreenLoading = false;
          // }, 2000);
          this.token = response.data.data.token;

          cookie.set("token", this.token, {
            domain: "localhost",
          });
          console.log("token:" + cookie.get("token"));

          this.getUserInfo();
        } else {
          this.$message.error(response.data.data.message);
          console.log("后端返回的信息：" + response.data.data.message);
          return;
        }
      });
    },
    getUserInfo() {
      //获取用户信息根据token

      userApi
        .getUserInfoByToken()
        .then((response) => {
          //获得了用户信息保存到cookie
          var loginMode = this.userInfo.loginModeByPhone; //保存登录模式
          console.log("response:" + response.data.data);
          this.userInfo = response.data.data.loginInfoVo;
          this.userInfo.loginModeByPhone = loginMode; //设置回登录模式
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
          //this.$router.push({ path: "/" });
          window.location.href = "/";
        })
        .catch((error) => {
          this.$message.error("获取用户信息失败");
        });
    },
    //重置表单
    resetForm() {
      this.userInfo.password = "";
    },
    //切换登录方式
    changeLogin(loginModeByPhone) {
      this.userInfo.loginModeByPhone = loginModeByPhone == 0 ? 1 : 0;
      //验证码登录模式

      //console.log("userInfo.loginModeByPhone:" + this.userInfo.loginModeByPhone);
    },

    //点击发送验证码
    getCode() {
      //校验是否输入了手机号
      if (!this.sending) {
        return;
      }
      this.sending = false;
      if (this.userInfo.username != "" && this.userInfo.username != null) {
        //判断手机号是否合规
        var p1 = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
        if (!p1.test(this.userInfo.username)) {
          this.$message.error("请输入正确的手机号");
          return;
        }
        //调用发送短信接口
        userApi
          .sendPhoneMessage(this.userInfo.username, this.registerMode)
          .then((response) => {
            console.log(this.userInfo.username);
            if (response.data.success) {
              this.$message({
                type: "success",
                message: "请注意接收短信",
              });
              //倒计时显示
              this.timeDown();
            } else {
              this.$message.error("发送短信失败:" + response.data.data.message);
            }
          });
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
  },
};
</script>

<style>
.btn-left {
  margin-left: -17.25%;
}
.form-signin {
  background: #fff;
  width: 50%;
  margin-left: 25%;
  height: 400px;
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