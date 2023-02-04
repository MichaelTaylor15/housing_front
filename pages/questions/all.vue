<template>
  <div>
    <div id="property-single" style="margin-top: 10px">
      <div class="container" style="width: 70% !important; margin-left: 15%">
        <div class="row">
          <!-- 左边区域 -->
          <div style="margin-bottom: 10px">
            <el-input
              placeholder="请输入您的问题"
              v-model="searchVo.content"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getQuestion()"
                >搜索</el-button
              >
            </el-input>
          </div>
          <!-- 问答 -->
          <section class="property-contents common" style="830px">
            <div class="entry-title clearfix">
              <h4 class="pull-left">
                {{ tip }}<span style="color: #f60">{{ total }}</span
                >个问答
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
                ><el-tag
                  v-for="item in question.title.split(',')"
                  v-if="item != ''"
                  :class="{ similarSearch: item == searchVo.content }"
                  @click="searchTag(item)"
                  :key="item"
                  style="margin-right: 5px; cursor: pointer"
                  size="mini"
                >
                  {{ item }}
                </el-tag>
              </p>
              <p>
                <span style="margin-left: 10px"
                  ><i class="el-icon-time"></i>{{ question.createdTime }}</span
                >

                <span
                  style="float: right; margin-left: 20px; cursor: pointer"
                  @click="viewQuestionComment(question.questionId)"
                  ><i class="el-icon-chat-line-round"></i
                  >{{ question.commentCount }}</span
                >
                <span style="float: right"
                  ><i class="el-icon-view"></i>{{ question.viewCount }}</span
                >
              </p>
            </div>
            <div v-if="total == 0">
              <el-empty description="找不到相关该问题"></el-empty>
            </div>
            <!-- 评论分页 -->
            <el-pagination
              background
              :current-page="searchVo.current"
              :page-size="searchVo.limit"
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
export default {
  data() {
    return {
      questions: [],
      tip: "共找到",
      total: 0,
      searchVo: {
        content: "",
        current: 1,
        limit: 5,
      },
    };
  },
  created() {
    //判断路径中是否携带标签
    console.log("content:" + this.$route.query.content);
    if (this.$route.query.content) {
      this.searchVo.content = this.$route.query.content;
    }
    this.getQuestion(1);
  },
  methods: {
    //跳转问题的评论页面
    viewQuestionComment(id) {
      this.$router.push({ path: "/questions/" + id });
      //window.location.href = "/questions/" + id;
    },
    getQuestion(current = 1) {
      this.searchVo.current = current;
      questionApi.getAllQuestionsByContent(this.searchVo).then((response) => {
        this.total = response.data.data.total;
        this.questions = response.data.data.questions;
      });
    },
    searchTag(item) {
      this.searchVo.content = item;
      this.getQuestion();
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
