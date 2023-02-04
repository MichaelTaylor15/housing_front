<template>
  <section>
    <div id="property-single">
      <div class="container" style="margin-top: 10px">
        <div class="row">
          <div class="col-lg-8 col-md-7">
            <!-- 问题头部 -->
            <section class="property-contents common" style="height: auto">
              <div
                class="entry-title clearfix"
                style="border-bottom: none; margin-bottom: 0px"
              >
                <h4 class="pull-left">{{ question.content }}</h4>
                <span style="float: right"
                  ><i class="el-icon-view"></i>{{ question.viewCount }}</span
                >
              </div>
              <!-- 标签信息 -->
              <p>
                <el-tag
                  v-for="item in question.tags"
                  :key="item"
                  style="margin-right: 5px"
                  size="mini"
                >
                  {{ item }}
                </el-tag>
              </p>
              <!-- 用户、时间、-->
              <p style="font-size: 12px">
                <span>
                  <!-- <i class="el-icon-user"></i>&nbsp; -->
                  {{ user.nickname }}</span
                >
                <el-divider direction="vertical"></el-divider>
                <span style="color: #999">
                  <!-- <i class="el-icon-time"></i> -->
                  {{ question.time }}</span
                >
              </p>
              <!-- 回答该用户 -->
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <span style="color: #409eff">我来回答</span>
                    <i class="el-icon-caret-bottom"></i>
                  </template>
                  <div>
                    <el-input
                      type="textarea"
                      placeholder="请输入回答内容"
                      v-model="commentVo.content"
                      maxlength="200"
                      show-word-limit
                    >
                    </el-input>
                  </div>
                  <div style="margin-top: 10px">
                    <el-button
                      type="primary"
                      @click="isLogin()"
                      style="width: 122px"
                      >提交</el-button
                    >
                  </div>
                </el-collapse-item>
              </el-collapse>
            </section>
            <section class="property-single-features common clearfix">
              <h4 class="entry-title" style="border-bottom: none">
                全部{{ total }}个回答
              </h4>
              <section class="widget recent-properties clearfix">
                <!-- 用户评论信息 -->
                <div
                  class="property clearfix"
                  v-for="comment in comments"
                  :key="comment.id"
                  style="border-bottom: none"
                >
                  <a style="float: left; margin-right: 2%"
                    ><img
                      style="width: 47px; height: 65px !important"
                      :src="comment.userImg"
                      alt="Property Image"
                  /></a>
                  <div
                    class="property-contents"
                    style="margin-top: -4px; width: 590px"
                  >
                    <p style="margin-top: inherit">
                      <span style="font-size: 14px; color: #333">
                        <strong>{{ comment.nickname }}</strong>
                      </span>
                    </p>

                    <p style="margin-top: inherit">
                      <span style="color: #333">{{ comment.content }}</span>
                    </p>

                    <p style="margin-top: -8px !important">
                      <span style="font-size: 10px; color: #999">
                        {{ comment.createdTime }}</span
                      >
                    </p>
                    <!-- 回复标识 -->
                    <el-collapse accordion>
                      <el-collapse-item>
                        <template slot="title">
                          <i
                            class="el-icon-chat-round"
                            style="cursor: pointer; float: right"
                            >回复</i
                          >
                        </template>
                        <div>
                          <el-input
                            type="textarea"
                            :placeholder="'回复@' + comment.nickname"
                            v-model="commentVo.content"
                            maxlength="200"
                            show-word-limit
                          >
                          </el-input>
                        </div>
                        <div style="margin-top: 10px">
                          <el-button
                            type="primary"
                            @click="reply(comment.id)"
                            style="width: 122px"
                            >提交</el-button
                          >
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                    <!-- 展开子评论 -->
                    <el-collapse accordion v-if="comment.childNum > 0">
                      <el-collapse-item>
                        <template slot="title">
                          <a @click="showChild(comment)"
                            >{{
                              comment.isShowChild == 1
                                ? "收起"
                                : "展开" + comment.childNum + "条评论"
                            }}<i class="el-icon-arrow-down"></i
                          ></a>
                        </template>
                        <section
                          class="property-single-features common clearfix"
                        >
                          <section class="widget recent-properties clearfix">
                            <!-- 用户评论信息 -->
                            <div
                              class="property clearfix"
                              v-for="child in comment.children"
                              :key="child.id"
                              style="border-bottom: none"
                            >
                              <a style="float: left; margin-right: 2%"
                                ><img
                                  style="width: 47px; height: 65px !important"
                                  :src="child.userImg"
                                  alt="Property Image"
                              /></a>
                              <div
                                class="property-contents"
                                style="
                                  margin-top: -4px;
                                  width: 590px;
                                  display: contents;
                                "
                              >
                                <p style="margin-top: inherit">
                                  <span style="font-size: 14px; color: #333">
                                    <strong>{{ child.nickname }}</strong>
                                    <template
                                      v-if="child.replyUser != comment.nickname"
                                      ><i class="el-icon-caret-right"></i>
                                      <strong>{{
                                        child.replyUser
                                      }}</strong></template
                                    >
                                  </span>
                                </p>

                                <p style="margin-top: inherit">
                                  <span style="color: #333">{{
                                    child.content
                                  }}</span>
                                </p>

                                <p style="margin-top: -8px !important">
                                  <span style="font-size: 10px; color: #999">
                                    {{ child.createdTime }}</span
                                  >
                                </p>
                                <!-- 回复标识 -->
                                <el-collapse
                                  accordion
                                  style="margin-left: 56px"
                                >
                                  <el-collapse-item>
                                    <template slot="title">
                                      <i
                                        class="el-icon-chat-round"
                                        style="cursor: pointer; float: right"
                                        >回复</i
                                      >
                                    </template>
                                    <div>
                                      <el-input
                                        type="textarea"
                                        :placeholder="'回复@' + child.nickname"
                                        v-model="commentVo.content"
                                        maxlength="200"
                                        show-word-limit
                                      >
                                      </el-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                      <el-button
                                        type="primary"
                                        @click="reply(child.id)"
                                        style="width: 122px"
                                        >提交</el-button
                                      >
                                    </div>
                                  </el-collapse-item>
                                </el-collapse>
                              </div>
                            </div>
                          </section>
                        </section>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </section>
              <!-- 评论分页 -->
              <el-pagination
                background
                :current-page="current"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center"
                layout="total, prev, pager, next, jumper"
                @current-change="getComment"
              />
            </section>
          </div>
          <!-- 右边区域 -->
          <div class="col-lg-4 col-md-5">
            <div id="property-sidebar">
              <!-- 相关问题区域 -->
              <section class="widget property-taxonomies clearfix">
                <h5 class="title">相关问题</h5>
                <ul class="clearfix">
                  <li
                    v-for="similar in similarQuestion"
                    :key="similar.questionId"
                    v-if="similar.content != question.content"
                  >
                    <a :href="'/questions/' + similar.questionId"
                      >{{ similar.content.substring(0, 15) }}... </a
                    ><span class="pull-right"
                      ><i class="el-icon-view"></i>&nbsp;{{
                        similar.viewCount
                      }}</span
                    >
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import questionApi from "@/api/question";
import commnetApi from "@/api/comment";
import cookie from "js-cookie";

export default {
  data() {
    return {
      questionId: "",
      question: {},
      //相关问题
      similarQuestion: [],
      comments: [],
      commentVo: {
        questionId: "",
        userId: "",
        nickname: "",
        userImg: "",
        content: "",
        parentId: "",
      },
      //发表问题的用户
      user: {},
      //当前用户
      loginUser: {},
      // 回复内容

      // 评论分页
      current: 1,
      limit: 10,
      total: 0,
      currTime: new Date(),
    };
  },
  created() {
    if (this.$route.params.id) {
      this.questionId = this.$route.params.id;
      this.getQuestionInfo();
    }
  },
  methods: {
    //回复
    reply(commentId) {
      this.commentVo.parentId = commentId;
      this.isLogin();
    },

    // 展开回复
    showChild(comment) {
      console.log(comment.isShowChild);
      //comment.isShowChild = 1;
      if (comment.isShowChild == 1) {
        comment.isShowChild = 0;
      } else {
        comment.isShowChild = 1;
      }
    },

    //获取问题信息
    getQuestionInfo() {
      questionApi.getQuestionById(this.questionId).then((response) => {
        this.question = response.data.data.question;
        this.user = response.data.data.user;
        //获取相关问题
        questionApi
          .getSimilarQuestion(this.question.tags, this.question.questionId)
          .then((response) => {
            this.similarQuestion = response.data.data.similarQuestions;
          });
      });
      this.getComment(1);
    },

    //评论获取
    getComment(current) {
      commnetApi
        .getComment(this.questionId, current, this.limit)
        .then((response) => {
          this.comments = response.data.data.comments;
          this.total = response.data.data.total;
        });
    },
    //判断是否已经登录,设置用户id
    isLogin() {
      try {
        if (cookie.get("userInfo")) {
          this.loginUser = JSON.parse(cookie.get("userInfo"));
          //console.log("当前用户:" + this.loginUser);
          //提交评论
          //封装评论vo
          this.commentVo.questionId = this.questionId;
          this.commentVo.userId = this.loginUser.userId;
          this.commentVo.nickname = this.loginUser.nickname;
          this.commentVo.userImg = this.loginUser.userImg;
          if (
            this.commentVo.content.length > 200 ||
            this.commentVo.content.length < 1 ||
            this.commentVo.content.length == ""
          ) {
            this.$message.error("评论内容不能为空、不能超过200个字符");
            return;
            console.log("回复内容：" + this.commentVo.content);
          }
          this.insertComment();
        } else {
          this.$message.error("请先进行登录");
        }
      } catch (error) {
        console.log(error);
      }
    },
    insertComment() {
      commnetApi.insertComment(this.commentVo).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "发布成功",
          });
          //清空输入框
          this.commentVo.content = "";
          this.getQuestionInfo();
        } else {
          this.$message.error(response.data.data.message);
        }
      });
    },
  },
};
</script>
<style >
#property-single .common {
  margin-bottom: 10px !important;
}
/* 折叠面板 去除上下划线*/
.el-collapse-item__arrow {
  display: none !important;
}
.el-collapse-item__header {
  border-bottom: none !important;
}
.el-collapse {
  border-top: none !important;
}
.el-collapse-item__wrap {
  border-bottom: none !important;
}
</style>