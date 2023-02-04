<template>
  <div>
    <div id="property-single" style="margin-top: 10px">
      <div class="container" style="width: 70% !important; margin-left: 15%">
        <div class="row">
          <!-- 左边区域 -->

          <!-- 问答 -->
          <section class="property-contents common" style="height: 500px">
            <div class="entry-title clearfix">
              <h4 class="pull-left">
                我的提问：<span style="color: #f60">{{ total }}</span
                >个问题
              </h4>
            </div>
            <div
              v-if="questions"
              v-for="question in questions"
              :key="question.questionId"
              class="questionArea"
            >
              <p>
                <span
                  class="question"
                  style="font-size: 16px; margin-right: 5px"
                  @click="viewQuestionComment(question.questionId)"
                  >{{ question.content }}</span
                >
                <template v-if="question.title">
                  <el-tag
                    v-for="item in question.title.split(',')"
                    v-if="item != ''"
                    :key="item"
                    style="margin-right: 5px; cursor: pointer"
                    size="mini"
                  >
                    {{ item }}
                  </el-tag>
                </template>
              </p>
              <p>
                <span style="margin-left: 10px"
                  ><i class="el-icon-time"></i>{{ question.createdTime }}</span
                >

                <span
                  style="float: right; margin-left: 20px; cursor: pointer"
                  @click="viewQuestionComment(question.questionId)"
                ></span>
              </p>
            </div>

            <!-- 评论分页 -->
            <el-pagination
              background
              :current-page="current"
              :page-size="limit"
              :total="total"
              style="padding: 30px 0; text-align: center"
              layout="total, prev, pager, next, jumper"
              @current-change="getQuestion"
            />
          </section>
        </div>
        <!-- 右边区域 -->
      </div>
    </div>
  </div>
</template>

<script>
import questionApi from "@/api/question";
import cookie from "js-cookie";
export default {
  data() {
    return {
      questions: [],
      total: 0,
      current: 1,
      limit: 5,
      userInfo: {},
    };
  },
  created() {
    this.getQuestion(1);
  },
  methods: {
    //跳转问题的评论页面
    viewQuestionComment(id) {
      this.$router.push({ path: "/questions/" + id });
      //window.location.href = "/questions/" + id;
    },
    getQuestion(current = 1) {
      this.isLogin();
      questionApi.getUserQuestion(current, this.limit).then((response) => {
        this.questions = response.data.data.questions;
        this.total = response.data.data.total;
      });
    },
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
};
</script>
<style>
#property-single .common {
  margin-bottom: 10px !important;
}
.question:hover {
  color: #eb5f00;
  border-bottom: 1px solid;
  cursor: pointer;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/* 悬停背景 */
.questionArea:hover {
  background-color: #e6e6e6;
}
.similarSearch {
  background-color: yellow;
}
</style>
