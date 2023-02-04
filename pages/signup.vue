<template>
  <section>
    <div class="container">
      <h2 style="text-align: center; font-weight: 500; color: gray">
        欢迎注册
      </h2>
      <!-- 注册表单 -->
      <el-form
        :model="userInfo"
        ref="userInfo"
        class="form-signin"
        :rules="rules"
      >
        <el-form-item prop="nickname">
          <el-input
            style="margin-top: 20px"
            class="my-input"
            v-model="userInfo.nickname"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            style=""
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

        <el-form-item style="text-align: center; margin-top: -15px">
          <!-- 提交注册表单 -->
          <el-button type="primary" @click="validateForm()">提交注册</el-button>

          <a href="/login"><el-button type="primary">返回登录</el-button></a>
          <el-button @click="resetForm()">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import userApi from "@/api/userApi";
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
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      userInfo: {
        username: "",
        nickName: "",
        userImg: "",
        password: "",
        checkPassword: "",
        validateCode: "",
      },
      code: "发送验证码",
      second: 300,
      //是否可以发送验证码，点击发送之后设置为false
      sending: true,
      registerMode: "1",
    };
  },
  created() {},
  methods: {
    //校验表单
    validateForm() {
      if (this.userInfo.username == "" || this.userInfo.username == null) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (this.userInfo.password == "" || this.userInfo.password == null) {
        this.$message.error("密码不能为空");
        return;
      }
      if (this.userInfo.password != this.userInfo.checkPassword) {
        this.$message.error("两次密码不一致");
        return;
      }
      if (this.code == "" || this.code == null || this.code == "发送验证码") {
        this.$message.error("验证码异常");
        return;
      }
      this.submitForm();
    },
    //提交表单
    submitForm() {
      userApi.registerUser(this.userInfo).then((response) => {
        console.log("注册对象：" + this.userInfo);
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "注册成功",
          });
          this.$router.push({ path: "/login" });
        } else {
          this.$message.error(response.data.data.message);
        }
      });
    },
    resetForm() {
      this.userInfo = {};
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
            } else {
              this.$message.error("发送短信失败:" + response.data.data.message);
            }
          });
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
  },
};
</script>
<style>
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

* {
  transition-duration: none;
}
</style>