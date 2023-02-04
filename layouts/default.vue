
<template>
  <div>
    <!-- Styles -->

    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:400,600"
      rel="stylesheet"
    />
    <!-- favicon and touch icons -->
    <link rel="shortcut icon" href="/images/favicon.png" />
    <!-- <link rel="stylesheet" href="/css/swiper-3.3.1.min.css" /> -->
    <!-- Bootstrap -->
    <link href="/js/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <!-- <link href="/js/slick/slick.css" rel="stylesheet" /> -->
    <!-- <link href="/js/slick-nav/slicknav.css" rel="stylesheet" /> -->
    <link href="/js/wow/animate.css" rel="stylesheet" />
    <link href="/css/bootstrap.css" rel="stylesheet" />
    <link href="/css/theme.css" rel="stylesheet" />
    <link href="/css/zoom.css" rel="stylesheet" />
    <!-- <link rel="stylesheet" href="/css/swiper-bundle.min.css" /> -->

    <!-- <script src="/js/swiper-bundle.min.js"></script> -->
    <!-- <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.migrate.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/slick-nav/jquery.slicknav.min.js"></script> -->
    <!-- 轮播图 不需要-->
    <!-- <script src="/js/slick/slick.min.js"></script> -->
    <!-- <script src="/js/jquery-ui/jquery-ui.min.js"></script>
    <script src="/js/tweetie/tweetie.js"></script>
    <script src="/js/forms/jquery.form.min.js"></script>
    <script src="/js/forms/jquery.validate.min.js"></script>
    <script src="/js/modernizr/modernizr.custom.js"></script>
    <script src="/js/wow/wow.min.js"></script>
    <script src="/js/zoom/zoom.js"></script>
    <script src="/js/mixitup/mixitup.min.js"></script> -->
    <!---<script src="http://ditu.google.cn/maps/api/js?key=AIzaSyD2MtZynhsvwI2B40juK6SifR_OSyj4aBA&libraries=places"></script>--->
    <!-- <script src="/js/whats-nearby/source/WhatsNearby.js"></script>
    <script src="/js/theme.js"></script> -->
    <!-- header -->
    <!-- <el-button
        @click="openFullScreen1"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-background="rgba(255,255,255,255)"
        style="border: none"
      ></el-button> -->

    <header id="site-header">
      <div class="container">
        <div class="row">
          <el-menu class="el-menu-demo" mode="horizontal" style="width: 100%">
            <el-menu-item>
              <img
                src="https://education-1023.oss-cn-beijing.aliyuncs.com/img/logo.jpeg"
                width="50px;"
              />
            </el-menu-item>
            <el-menu-item><router-link to="/">主页</router-link></el-menu-item>
            <el-menu-item
              ><router-link to="/house/list"
                >区域租房</router-link
              ></el-menu-item
            >
            <!-- <a href="/rentout">我要出租</a> -->
            <el-menu-item><a href="/rentout">我要出租</a></el-menu-item>
            <el-menu-item
              ><router-link to="/questions/list">问答区</router-link>
            </el-menu-item>
            <el-menu-item
              ><router-link to="/suggest">建议</router-link></el-menu-item
            >

            <!-- 未登录 -->
            <el-menu-item
              ><a v-if="!userInfo.userId" href="/signup" style="cursor: pointer"
                >注册</a
              ></el-menu-item
            >
            <el-menu-item
              ><a v-if="!userInfo.userId" href="/login" style="cursor: pointer"
                >登录</a
              ></el-menu-item
            >
            <!-- 登录信息 -->
            <el-submenu
              index="2"
              v-if="userInfo.userId"
              style="margin-left: 20%"
            >
              <template slot="title">
                <a
                  ><img
                    :src="userInfo.userImg"
                    style="width: 30px; height: 30px; cursor: pointer" /></a
                ><span style="cursor: pointer; color: black">{{
                  userInfo.nickname
                }}</span></template
              >
              <!-- <a href="/houseManage/myHouse"></a> -->
              <el-menu-item index="2-1"
                ><router-link to="/myHouse">我的房屋</router-link></el-menu-item
              >
              <el-menu-item index="2-2"
                ><router-link to="/myfavorite"
                  >我的收藏</router-link
                ></el-menu-item
              >
              <el-menu-item index="2-3"
                ><router-link to="/history"
                  >看房记录
                </router-link></el-menu-item
              >
              <el-menu-item index="2-4">
                <span @click="openMessageWindow()"
                  >我的留言<span class="messageNum" v-show="messageNum > 0">{{
                    messageNum
                  }}</span></span
                ></el-menu-item
              >
              <el-menu-item index="2-5"
                ><router-link to="/questions/myQuestion"
                  >我的提问
                </router-link></el-menu-item
              >
              <el-menu-item index="2-6">
                <span @click="openAppointWindow()"
                  >预约管理<span class="messageNum" v-show="appointNum > 0">{{
                    appointNum
                  }}</span></span
                ></el-menu-item
              >
              <el-menu-item v-if="userInfo.userId"
                ><a @click="logout" style="cursor: pointer"
                  >退出登录</a
                ></el-menu-item
              >
            </el-submenu>
          </el-menu>
          <div class="col-md-3">
            <!-- 首页logo图 -->
            <!-- <figure id="site-logo">
              <a href="index.html"><img src="/images/logo.png" alt="Logo" /></a>
            </figure> -->
          </div>
        </div>
      </div>
    </header>
    <!-- 留言 -->
    <el-dialog title="我的留言" :visible.sync="dialogMessageVisible">
      <el-tabs v-model="activeMessageName" @tab-click="handleMessageClick">
        <el-tab-pane label="未读" name="first">
          <el-card
            class="box-card"
            v-if="unReadMessages"
            v-for="message in unReadMessages"
            :key="message.messageId"
          >
            <div slot="header" class="clearfix">
              <img :src="message.userImg" style="width: 50px; height: 50px" />
              <span style="margin-left: 3px"
                ><b>{{ message.nickname }}</b></span
              >
              <span style="float: right; font-size: 10px">{{
                message.createdTime
              }}</span>
            </div>
            <div class="text item" style="margin-left: 56px; margin-top: -50px">
              <span style="background-color: white">{{ message.content }}</span>
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="current"
            :page-size="limit"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getMessage"
        /></el-tab-pane>
        <el-tab-pane label="已读" name="second">
          <el-card
            class="box-card"
            v-if="isReadMessages"
            v-for="message in isReadMessages"
            :key="message.messageId"
          >
            <div slot="header" class="clearfix">
              <img :src="message.userImg" style="width: 50px; height: 50px" />
              <span style="margin-left: 3px"
                ><b>{{ message.nickname }}</b></span
              >
              <span style="float: right; font-size: 10px">{{
                message.createdTime
              }}</span>
            </div>
            <div class="text item" style="margin-left: 56px; margin-top: -50px">
              <span style="background-color: white">{{ message.content }}</span>
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="current"
            :page-size="limit"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getMessage"
        /></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 预约 -->
    <el-dialog title="预约管理" :visible.sync="dialogAppointVisible">
      <el-tabs v-model="activeAppointName" @tab-click="handleAppointClick">
        <el-tab-pane label="待处理" name="first">
          <el-card
            class="box-card"
            v-if="unresovledAppointments"
            v-for="app in unresovledAppointments"
            :key="app.id"
          >
            <div slot="header" class="clearfix">
              <img :src="app.userImg" style="width: 50px; height: 50px" />
              <span style="margin-left: 3px"
                ><b>{{ app.nickname }}</b
                >&nbsp;</span
              ><span>向您发起预约看房</span>&nbsp;
              <a style="cursor: pointer" @click="viewHouse(app.houseId)"
                >房源链接</a
              >&nbsp;
              <span
                >看房时间：<b>{{ app.time }}</b></span
              >
              <el-button plain @click="agreeOrIgnoreAppoint(app.id, 1)"
                >同意</el-button
              >
              <el-button plain @click="agreeOrIgnoreAppoint(app.id, 0)"
                >忽略</el-button
              >
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="current"
            :page-size="limit"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getMessage"
        /></el-tab-pane>
        <el-tab-pane label="已处理" name="second">
          <el-card
            class="box-card"
            v-if="resovledAppointments"
            v-for="app in resovledAppointments"
            :key="app.id"
          >
            <div slot="header" class="clearfix">
              <img :src="app.userImg" style="width: 50px; height: 50px" />
              <span style="margin-left: 3px"
                ><b>{{ app.nickname }}</b
                >&nbsp;</span
              ><span>向您发起预约看房</span>&nbsp;
              <a style="cursor: pointer" @click="viewHouse(app.houseId)"
                >房源链接</a
              >&nbsp;
              <span
                >看房时间：<b>{{ app.time }}</b></span
              >
              <el-button
                size="mini"
                :type="app.status == 1 ? 'danger' : 'info'"
                @click="agreeOrIgnoreAppoint(app.id, 1)"
                >{{ app.status == 1 ? "已同意" : "已忽略" }}</el-button
              >
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="current"
            :page-size="limit"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getAppointment"
          />
        </el-tab-pane>
        <el-tab-pane label="我发起的预约" name="third">
          <el-card
            v-if="appointments"
            v-for="app in appointments"
            :key="app.id"
          >
            <div style="display: inline-block; width: 100%" class="ckwrap">
              <img
                style="width: 120px; height: 100px; vertical-align: text-bottom"
                :src="app.houseImg"
              />
              <div
                style="
                  display: inherit;
                  margin-left: 10px;
                  margin-top: -10px;
                  width: 435px;
                "
              >
                <el-tooltip
                  class="item"
                  effect="light"
                  content="跳转至房子详情页面"
                  placement="top"
                >
                  <h6 class="rentTitle" @click="viewHouse(app.houseId)">
                    {{ app.rentTitle }}
                  </h6>
                </el-tooltip>
                <p style="font-size: 14px">
                  <span class="miniRight">{{ app.houseType }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ app.area }} </span><span>平方米</span>
                  <el-divider direction="vertical"></el-divider>

                  <span>预约时间：{{ app.time }}</span>
                  <el-button
                    size="mini"
                    :type="app.status == 0 ? 'primary' : 'danger'"
                    style="float: right"
                    >{{ app.status == 0 ? "待同意" : "已同意" }}</el-button
                  >
                </p>
                <!-- 地址 -->

                <span class="miniRight" style="font-size: 10px; color: #999">
                  {{ app.houseName }}</span
                >
                <span style="font-size: 12px; color: #999"
                  ><i class="el-icon-location-outline"></i>
                  {{ app.address }}</span
                >
              </div>
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="current"
            :page-size="limit"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getAppointment"
        /></el-tab-pane>
      </el-tabs>
    </el-dialog>
    <nuxt />

    <!-- footer -->
    <footer id="footer">
      <div class="site-footer">
        <div class="container">
          <div class="row">
            <!-- 三等分 -->
            <!-- 左边区域 -->
            <div class="col-md-4 col-sm-6">
              <section class="widget about-widget clearfix">
                <h4 class="title hide">About Us</h4>
                <a class="footer-logo" href="#"></a>
                <p></p>
                <ul class="social-icons clearfix">
                  <li></li>
                </ul>
              </section>
            </div>
            <!-- 中间区域 -->
            <div class="col-md-4 col-sm-6"></div>
            <!-- 右边区域 -->
            <div class="col-md-4 col-sm-6"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import cookie from "js-cookie";
import userApi from "@/api/userApi";
import { Loading } from "element-ui";
import appointApi from "@/api/appoint";
export default {
  data() {
    return {
      token: "",
      userInfo: {},
      fullscreenLoading: false,
      messageNum: 0,
      appointNum: 0,
      //定时器
      timer: null,

      //预约对话框
      dialogAppointVisible: false,
      //留言对话框
      dialogMessageVisible: false,
      //未读、已读
      isRead: 0,
      //未处理、已处理
      handle: 0,
      //留言
      messages: [],
      unReadMessages: [],
      isReadMessages: [],
      //预约
      appointments: [],
      unresovledAppointments: [],
      resovledAppointments: [],
      //默认未读
      activeAppointName: "first",
      activeMessageName: "first",
      // 分页
      current: 1,
      limit: 5,
      total: 0,
    };
  },
  created() {
    this.openFullScreen1();

    // 判断路径中是否存在token
    // 存在即调用登录接口，获取用户信息

    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      this.wxlogin();
      //调用完成，用户数据存储在cookie中
    }
    //console.log("route token:" + this.token);
    //从cookie取出用户数据
    this.showInfo();
    //this.getUserMessageNum();
    this.countUserMessageNum();
  },
  methods: {
    //同意或忽略预约,agree:1    ignore:0
    agreeOrIgnoreAppoint(appointId, status) {
      //console.log(appointId);
      appointApi.agreeOrIgnoreAppoint(appointId, status).then((response) => {
        if (response.data.success) {
          this.$message.success(response.data.message);
          //刷新待处理tabs
          this.getAppointment(1);
        } else {
          this.$message.error(response.data.message);
        }
      });
    },

    //打开 预约对话框
    openAppointWindow() {
      this.dialogAppointVisible = true;
      this.getAppointment(1);
    },

    //打开留言
    openMessageWindow() {
      this.dialogMessageVisible = true;
      this.getMessage(1);
    },

    //预约已处理、未处理标签切换
    handleAppointClick(tab, event) {
      var name = tab.name;
      if (name == "first") {
        this.handle = 0;
      } else if (name == "second") {
        this.handle = 1;
      } else {
        this.handle = 2;
      }

      this.getAppointment(this.current);
    },

    //留言已读、未读标签切换
    handleMessageClick(tab, event) {
      //修改isRead
      if (tab.name == "first") {
        this.isRead = 0;
      } else {
        this.isRead = 1;
      }
      this.getMessage(this.current);
    },

    //获取用户的预约
    getAppointment(current) {
      var user = this.islogin();
      if (!user) {
        return;
      }
      appointApi
        .getUserAppointment(current, this.limit, this.handle)
        .then((response) => {
          if (response.data.success) {
            if (this.handle == 0) {
              this.unresovledAppointments = response.data.data.appointments;
            } else if (this.handle == 1) {
              this.resovledAppointments = response.data.data.appointments;
            } else {
              this.appointments = response.data.data.appointments;
            }

            //console.log(this.appointments);
          } else {
            this.$message.error(response.data.message);
          }
        });
    },

    //获取用户 已读/未读消息，0 未读，1 已读
    getMessage(current) {
      var user = this.islogin();
      if (!user) {
        return;
      }
      userApi
        .getUserMessage(current, this.limit, this.isRead, user.userId)
        .then((response) => {
          //点击的是未读tabs
          if (this.isRead == 0) {
            this.messageNum = 0;
            this.unReadMessages = response.data.data.messages;
          } else {
            this.isReadMessages = response.data.data.messages;
          }
          //点击的是未读tabs
          // if (this.isRead == 0) {
          //   //将未读消息设置为已读
          //   if (!this.unReadMessages) {
          //     return;
          //   }
          //   userApi.setMessageRed(this.unReadMessages);
          //   //删除未读消息数字提示

          // }
        });
    },

    //统计当前登录用户的消息数量
    countUserMessageNum() {
      //判断登录

      if (this.userInfo.userId) {
        //定时器
        this.timer = setInterval(() => {
          if (!this.dialogMessageVisible) {
            this.getUserMessageNum();
          }
        }, 20000);
      } else {
        return;
      }
    },
    //推送消息
    send(messageNum) {
      this.$notify({
        title: "提示",
        message: "你有" + messageNum + "条新的留言，请及时查看。",
      });
    },
    //获取用户的消息统计数量
    getUserMessageNum() {
      userApi.getMessageNum(this.userInfo.userId).then((response) => {
        if (response.data.success) {
          this.messageNum = response.data.data.messageNum;
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    islogin() {
      try {
        var user = JSON.parse(cookie.get("userInfo"));
        return user;
      } catch (error) {}
    },
    //从cookie中获取用户信息
    showInfo() {
      //此时是一个javascript对象str="{'name':'lucy}"，需要转换成json对象
      //console.log("cookie userInfo:" + cookie.get("userInfo"));
      // console.log(
      //   "cookie parse userInfo:" + JSON.parse(cookie.get("userInfo"))
      // );
      try {
        this.userInfo = JSON.parse(cookie.get("userInfo"));
      } catch (error) {}
    },
    wxlogin() {
      //置空
      cookie.set("token", this.token, { domain: "localhost" });
      cookie.set("userInfo", "", { domain: "localhost" });
      //获取用户信息根据token
      //根据token获取用户信息

      userApi.getUserInfoByToken().then((response) => {
        this.userInfo = response.data.data.loginInfoVo;
        cookie.set("userInfo", JSON.stringify(this.userInfo), {
          domain: "localhost",
        });
        console.log("default page userinfo:" + this.userInfo);
        console.log("default page loginInfo:" + response.data.data.loginInfoVo);
      });
    },
    //清空cookie和用户信息
    logout() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cookie.set("token", "", {
          domain: "localhost",
        });
        cookie.set("userInfo", "", {
          domain: "localhost",
        });
        //销毁定时器
        clearInterval(this.timer);
        this.timer = null;
        window.location.href = "/login";
      });
    },
    //跳转
    viewHouse(id) {
      //console.log("房子id：" + id);
      this.dialogAppointVisible = false;
      this.$router.push({ path: "/house/" + id });
    },
    //loading
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 500);
    },
  },
  //监听是否有新的消息，防止重复推送
  watch: {
    messageNum: {
      handler(newVal, oldVal) {
        if (newVal > oldVal) {
          this.send(newVal - oldVal);
        }
      },
    },
    //监控留言窗口打开、关闭
    dialogMessageVisible: {
      handler(newVal, oldVal) {
        if (!newVal && oldVal) {
          //将消息设置为已读
          console.log(this.unReadMessages);
          if (this.unReadMessages.length > 0) {
            userApi.setMessageRed(this.unReadMessages);
          }
        }
      },
    },
  },
  //销毁定时器
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style>
.log-li {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
#overlayer {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 7100;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loader {
  z-index: 7700;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.spinner-border {
  color: #009ece;
}
/* 导航 */
.el-menu-demo {
  margin-left: 24%;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
/* 消息统计数 */
.messageNum {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
}
.el-menu-item > a {
  color: #909399;
}
/* 留言对话框 */
.el-dialog {
  background: #f5f5f5;
}
.el-card {
  border-radius: 0px;
  border: none;
  background-color: #f5f5f5;
}
.el-card__header {
  border-bottom: none;
}

.rentTitle:hover {
  cursor: pointer;
}
</style>