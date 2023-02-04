<template>
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
                    :v-model="suggest.name"
                    type="text"
                    placeholder="姓名"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-email common">
                  <input
                    :v-model="suggest.email"
                    type="text"
                    placeholder="邮箱"
                    aria-describedby="email-notes"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-phone common">
                  <input
                    :v-model="suggest.phone"
                    type="text"
                    placeholder="联系电话"
                    aria-required="true"
                    required="required"
                  />
                </p>
                <p class="form-subject common">
                  <input
                    :v-model="suggest.subject"
                    type="text"
                    placeholder="subject"
                  />
                </p>
                <p class="form-comment">
                  <textarea
                    :v-model="suggest.content"
                    placeholder="内容"
                    cols="45"
                    rows="7"
                  ></textarea>
                </p>
                <p class="form-submit">
                  <button
                    type="submit"
                    id="submit-button"
                    class="submit-btn btn btn-default btn-lg btn-3d"
                    data-hover="Post Comment"
                    @click="validate()"
                  >
                    提交建议
                  </button>
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
export default {
  data() {
    return {
      suggest: {},
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
  },
  validate() {},
};
</script>
