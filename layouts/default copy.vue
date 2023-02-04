<template>
  <div>
    <!-- Styles -->
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:400,600"
      rel="stylesheet"
    />

    <!-- favicon and touch icons -->
    <link rel="shortcut icon" href="/images/favicon.png" />

    <!-- Bootstrap -->
    <link href="/js/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/js/slick/slick.css" rel="stylesheet" />
    <link href="/js/slick-nav/slicknav.css" rel="stylesheet" />
    <link href="/js/wow/animate.css" rel="stylesheet" />
    <link href="/css/bootstrap.css" rel="stylesheet" />
    <link href="/css/theme.css" rel="stylesheet" />

    <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.migrate.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/slick-nav/jquery.slicknav.min.js"></script>
    <script src="/js/slick/slick.min.js"></script>
    <script src="/js/jquery-ui/jquery-ui.min.js"></script>
    <script src="/js/tweetie/tweetie.js"></script>
    <script src="/js/forms/jquery.form.min.js"></script>
    <script src="/js/forms/jquery.validate.min.js"></script>
    <script src="/js/modernizr/modernizr.custom.js"></script>
    <script src="/js/wow/wow.min.js"></script>
    <script src="/js/zoom/zoom.js"></script>
    <script src="/js/mixitup/mixitup.min.js"></script>
    <!---<script src="http://ditu.google.cn/maps/api/js?key=AIzaSyD2MtZynhsvwI2B40juK6SifR_OSyj4aBA&libraries=places"></script>--->
    <script src="/js/whats-nearby/source/WhatsNearby.js"></script>
    <script src="/js/theme.js"></script>

    <!-- header -->
    <header id="site-header">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <!-- 首页logo图 -->
            <!-- <figure id="site-logo">
              <a href="index.html"><img src="/images/logo.png" alt="Logo" /></a>
            </figure> -->
          </div>
          <div class="col-md-6 col-sm-8">
            <nav id="site-nav" class="nav navbar-default">
              <ul class="nav navbar-nav">
                <li><a href="/">主页</a></li>
                <li><a href="/house/list">区域租房</a></li>
                <li><a href="/rentout">我要出租</a></li>
                <li><a href="/questions">问答区</a></li>
                <li><a href="/suggest">建议</a></li>
              </ul>
            </nav>
          </div>
          <div class="col-md-3 col-sm-4">
            <ul class="nav navbar-nav">
              <li v-if="!userInfo.userId">
                <a href="/signup"><span>注册</span></a>
              </li>
              <li v-if="!userInfo.userId" class="cta-button active">
                <a href="/login"><span>登录</span></a>
              </li>
              <li v-if="userInfo.userId" style="margin-top: 12px">
                <span style="cursor: pointer">{{ userInfo.nickname }}</span>
              </li>
              <li
                v-if="userInfo.userId"
                style="margin-top: -5px; margin-left: -3px"
              >
                <a
                  ><img
                    :src="userInfo.userImg"
                    style="width: 30px; height: 30px; cursor: pointer"
                /></a>
              </li>
              <li v-if="userInfo.userId" class="cta-button active">
                <a @click="logout" style="cursor: pointer">退出</a>
              </li>
              <!-- <li class="cta-button active">
                <a @click="logout">清除cookie信息</a>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </header>
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
                <a class="footer-logo" href="#"
                  ><img src="/images/footer-logo.png" alt="Footer Logo"
                /></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi
                </p>
                <ul class="social-icons clearfix">
                  <li>
                    <a href="#"><i class="">图标</i></a>
                  </li>
                </ul>
              </section>
            </div>
            <!-- 中间区域 -->
            <div class="col-md-4 col-sm-6">
              <section class="widget twitter-widget clearfix">
                <h4 class="title">Latest Tweets</h4>
                <div id="twitter-feeds" class="clearfix"></div>
              </section>
            </div>
            <!-- 右边区域 -->
            <div class="col-md-4 col-sm-6">
              <section class="widget address-widget clearfix">
                <h4 class="title">OUR OFFICE</h4>
                <ul></ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="site-footer-bottom">
        <div class="container">
          <p class="copyright pull-left wow slideInRight">
            Copyright &copy; 2017.Company name All rights reserved.<a
              target="_blank"
              href="http://sc.chinaz.com/moban/"
              >&#x7F51;&#x9875;&#x6A21;&#x677F;</a
            >
          </p>
          <nav class="footer-nav pull-right wow slideInLeft">
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div> -->
    </footer>
  </div>
</template>
<script>
// import "~/assets/js/font-awesome/css/font-awesome.min.css";
// import "~/assets/js/slick/slick.css";
// import "~/assets/js/slick-nav/slicknav.css";
// import "~/assets/js/wow/animate.css";
// import "~/assets/css/bootstrap.css";
// import "~/assets/css/theme.css";

import cookie from "js-cookie";
import userApi from "@/api/userApi";
export default {
  data() {
    return {
      token: "",
      userInfo: {},
    };
  },
  created() {
    //TODO
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
  },
  methods: {
    //从cookie中获取用户信息
    showInfo() {
      //此时是一个javascript对象str="{'name':'lucy}"，需要转换成json对象
      //console.log("cookie userInfo:" + cookie.get("userInfo"));
      // console.log(
      //   "cookie parse userInfo:" + JSON.parse(cookie.get("userInfo"))
      // );
      try {
        if (cookie.get("userInfo")) {
          this.userInfo = JSON.parse(cookie.get("userInfo"));
        }
      } catch (error) {
        console.log(error);
      }
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
      cookie.set("token", "", {
        domain: "localhost",
      });
      cookie.set("userInfo", "", {
        domain: "localhost",
      });

      window.location.href = "/login";
    },
  },
};
</script>
<style>
.log-li {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
</style>