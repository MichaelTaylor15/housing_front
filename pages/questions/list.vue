<template>
  <div>
    <div id="property-single" style="margin-top: 10px">
      <div class="container" style="width: 70% !important; margin-left: 15%">
        <div class="row">
          <!-- 左边区域 -->
          <div class="col-lg-11 col-md-11">
            <section class="property-contents common">
              <div class="entry-title clearfix">
                <h4 class="pull-left">
                  <span class="el-icon-s-data"></span>热门问答
                </h4>
                <span class="pull-right" style="cursor: pointer"
                  ><a href="/questions/all"
                    ><i class="el-icon-d-arrow-right"></i>更多
                  </a></span
                >
              </div>
              <div v-for="hot in hotQuestions" :key="hot.questionId">
                <p>
                  <span
                    class="question"
                    style="font-size: 16px; margin-right: 5px"
                    @click="viewQuestionComment(hot.questionId)"
                    >{{ hot.content }}</span
                  ><el-tag
                    v-for="item in hot.tags"
                    :key="item"
                    style="margin-right: 5px; cursor: pointer"
                    @click="searchTag(item)"
                    size="mini"
                  >
                    {{ item }}
                  </el-tag>
                </p>
                <p>
                  <span style="margin-left: 10px"
                    ><i class="el-icon-time"></i>{{ hot.time }}</span
                  >

                  <span
                    style="float: right; margin-left: 20px; cursor: pointer"
                    @click="viewQuestionComment(hot.questionId)"
                    ><i class="el-icon-chat-line-round"></i
                    >{{ hot.commentCount }}</span
                  >
                  <span style="float: right">
                    <!-- <i class="el-icon-view"></i>{{ hot.viewCount }} -->
                  </span>
                </p>
              </div>
            </section>
            <!-- 常见问答 -->
            <section class="property-contents common">
              <div class="entry-title clearfix">
                <h4 class="pull-left">
                  <i class="el-icon-star-off"></i>常见问题
                </h4>
              </div>
              <div v-for="normal in normalQuestions" :key="normal.questionId">
                <p>
                  <span
                    class="question"
                    style="font-size: 16px; margin-right: 5px"
                    @click="viewQuestionComment(normal.questionId)"
                    >{{ normal.content }}</span
                  ><el-tag
                    v-for="item in normal.tags"
                    :key="item"
                    style="margin-right: 5px; cursor: pointer"
                    @click="searchTag(item)"
                    size="mini"
                  >
                    {{ item }}
                  </el-tag>
                </p>
                <p>
                  <span style="margin-left: 10px"
                    ><i class="el-icon-time"></i>{{ normal.time }}</span
                  >

                  <span
                    style="float: right; margin-left: 20px; cursor: pointer"
                    @click="viewQuestionComment(normal.questionId)"
                    ><i class="el-icon-chat-line-round"></i
                    >{{ normal.commentCount }}</span
                  >
                  <span style="float: right">
                    <!-- <i class="el-icon-view"></i>{{ normal.viewCount }} -->
                  </span>
                </p>
              </div>
            </section>
            <!-- 待解决问题 -->
            <section class="property-contents common">
              <div class="entry-title clearfix">
                <h4 class="pull-left">
                  <i class="el-icon-chat-dot-square"></i>待解决问题
                </h4>
              </div>
              <div
                v-for="unresolved in unResolvedQuestions"
                :key="unresolved.questionId"
              >
                <p>
                  <span
                    class="question"
                    style="font-size: 16px; margin-right: 5px"
                    @click="viewQuestionComment(unresolved.questionId)"
                    >{{ unresolved.content }}</span
                  ><el-tag
                    v-for="item in unresolved.tags"
                    :key="item"
                    style="margin-right: 5px; cursor: pointer"
                    @click="searchTag(item)"
                    size="mini"
                  >
                    {{ item }}
                  </el-tag>
                </p>
                <p>
                  <span style="margin-left: 10px"
                    ><i class="el-icon-time"></i>{{ unresolved.time }}</span
                  >

                  <span
                    style="float: right; margin-left: 20px; cursor: pointer"
                    @click="viewQuestionComment(unresolved.questionId)"
                    ><i class="el-icon-chat-line-round"></i
                    >{{ unresolved.commentCount }}</span
                  >
                  <span style="float: right">
                    <!-- <i class="el-icon-view"></i>{{ unresolved.viewCount }} -->
                  </span>
                </p>
              </div>
            </section>
          </div>
          <!-- 热门问答 -->
          <!-- 右边区域 -->
          <div class="col-lg-1 col-md-1">
            <div id="property-sidebar">
              <el-button @click="dialogTableVisible = true"
                ><i
                  class="fa fa-question-circle-o"
                  style="font-size: 17px"
                  aria-hidden="true"
                ></i
                >&nbsp;我要提问</el-button
              >
            </div>
          </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <el-form ref="form" :model="question" label-width="80px">
            <el-form-item label="问题描述">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="question.content"
                :autosize="{ minRows: 6, maxRows: 6 }"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="valildate()"
                >提交问题</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
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
      //热门问题
      hotQuestions: [],
      //常见问题
      normalQuestions: [],
      //未解决问题
      unResolvedQuestions: [],
      dialogTableVisible: false,
      question: {},
      userInfo: {},
    };
  },
  created() {
    questionApi.getAllQuestions().then((response) => {
      this.hotQuestions = response.data.data.hotQuestions;
      console.log("问题：" + this.hotQuestions);
      this.normalQuestions = response.data.data.normalQuestions;
      this.unResolvedQuestions = response.data.data.unResolvedQuestions;
    });
  },
  methods: {
    //跳转问题的评论页面
    viewQuestionComment(id) {
      this.$router.push({ path: "/questions/" + id });
      //window.location.href = "/questions/" + id;
    },
    //跳转搜索标签，路径携带标签
    searchTag(tag) {
      this.$router.push({ path: "/questions/all", query: { content: tag } });
      //window.location.href = "/questions/all?content=" + tag;
    },
    //校验输入的问题
    valildate() {
      this.isLogin();
      if (this.question.content.length > 200) {
        this.$message.error("输入内容过长");
        return;
      }
      questionApi.insertQuestion(this.question).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: response.data.message,
          });
          this.dialogTableVisible = false;
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    isLogin() {
      try {
        var userInfo = JSON.parse(cookie.get("userInfo"));
        this.userInfo = userInfo;
      } catch (error) {
        this.$message.error("请先进行登录");
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
</style>
