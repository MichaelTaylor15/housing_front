!<template>
  <section>
    <div
      id="contact-page"
      class="contact-page-var-one"
      style="margin-top: 20px; margin-left: 30%"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="contact-form-wrapper">
              <h3 class="entry-title">Contact Us</h3>
              <div class="contents">
                <p></p>
              </div>
              <el-form :model="suggest" class="contact-form">
                <p class="form-author common">
                  <input
                    v-model="suggest.username"
                    type="text"
                    placeholder="姓名"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-email common">
                  <input
                    v-model="suggest.email"
                    type="text"
                    placeholder="邮箱"
                    aria-describedby="email-notes"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-phone common">
                  <input
                    v-model="suggest.phone"
                    type="text"
                    placeholder="联系电话"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-subject common">
                  <input
                    v-model="suggest.subject"
                    type="text"
                    placeholder="主题"
                  />
                </p>

                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="suggest.content"
                  maxlength="200"
                  show-word-limit
                  style="margin-bottom: 10px"
                >
                </el-input>

                <p class="form-submit">
                  <el-button type="primary" @click="validate()"
                    >提交建议</el-button
                  >
                  <span id="ajax-loader"
                    ><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i
                    ><span class="sr-only">Loading...</span></span
                  >
                </p>
                <div id="error-container"></div>
                <div id="message-container"></div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import cookie from "js-cookie";
import suggestApi from "@/api/suggestApi";
export default {
  data() {
    return {
      suggest: {
        username: "",
        email: "",
        phone: "",
        subject: "",
        content: "",
      },
      userInfo: {},
    };
  },
  created() {},
  methods: {
    isLogin() {
      try {
        if (cookie.get("userInfo")) {
          this.userInfo = JSON.parse(cookie.get("userInfo"));
        } else {
          this.$message.error("请先进行登录");
        }
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      //登录
      this.isLogin();
      //姓名
      console.log(this.suggest.username);
      if (this.suggest.username == "" || this.suggest.username.length < 1) {
        this.$message.error("姓名不能为空");
        return;
      }
      if (this.suggest.username.length > 10) {
        this.$message.error("姓名长度不能超过10个字符");
        return;
      }
      //邮箱
      var p2 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!p2.test(this.suggest.email)) {
        this.$message.error("请输入正确的邮箱");
        return;
      }

      //手机号
      var p1 = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (!p1.test(this.suggest.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }

      //主题

      if (this.suggest.subject == "" || this.suggest.subject.length < 1) {
        this.$message.error("主题不能为空");
        return;
      }
      if (this.suggest.subject.length > 10) {
        this.$message.error("subject长度不能超过10个字符");
        return;
      }
      //内容
      if (this.suggest.content.length < 1) {
        this.$message.error("内容不能为空");
        return;
      }
      if (this.suggest.content.length > 200) {
        this.$message.error("内容不能超过200个字符");
        return;
      }

      suggestApi.insertSuggest(this.suggest).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: response.data.message,
          });
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
  },
};
</script>