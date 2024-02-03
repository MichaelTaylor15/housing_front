<template>
  <section>
    <div id="property-single">
      <div class="container">
        <div class="row" style="margin-top: 10px">
          <!-- 左边区域 -->
          <div class="col-lg-8 col-md-7">
            <section class="property-meta-wrapper common">
              <!-- 房子标题头 -->
              <div style="font-size: 22px; color: #333">
                <span class="miniRight">{{ houseInfo.rentTitle }}</span>

                <span class="miniRight">{{ houseInfo.highlight }}</span>
              </div>
              <!-- 房子信息 -->
              <div style="margin-bottom: 20px; margin-top: 20px">
                <span style="font-size: 20px; color: #f60">{{
                  houseInfo.monthMoney
                }}</span>
                <span style="color: #f60">元/月</span>
                <span class="miniRight" style="color: #a9a9a9">{{
                  houseInfo.rentMode
                }}</span>
                <el-divider direction="vertical"></el-divider>
                <span class="miniRight">{{ houseInfo.houseType }}</span>
                <el-divider direction="vertical"></el-divider>
                <span style="font-size: 20px">{{ houseInfo.area }}</span>
                <span class="miniRight">平方米</span>
                <el-divider direction="vertical"></el-divider>
                <span
                  class="miniRight"
                  style="background: #fbf4f1; color: #e88a78"
                  >{{ houseInfo.rentType }}</span
                >
                <span
                  class="miniRight"
                  style="background: #f2f6ed; color: #799374"
                  >{{ houseInfo.direction }}</span
                >
                <!-- 有电梯，x号线 定位字符, 提取 -->
                <span
                  v-if="houseInfo.rentContent"
                  class="miniRight"
                  style="background: lavender"
                  >{{
                    houseInfo.rentContent.substring(
                      0,
                      houseInfo.rentContent.indexOf(",")
                    )
                  }}</span
                >
                <span
                  v-if="houseInfo.rentContent"
                  class="miniRight"
                  style="background: antiquewhite"
                  >{{
                    houseInfo.rentContent.substring(
                      houseInfo.rentContent.indexOf(",") + 1
                    )
                  }}</span
                >
              </div>
              <!-- 幻灯片 开始 -->
              <!-- <div v-swiper:mySwiper="swiperOption" class="swiper">
                <div class="swiper-wrapper">
                  <div
                    v-for="banner in bannerList"
                    :key="banner.id"
                    class="swiper-slide"
                    style="margin-right: 100%"
                  >
                    <a target="_blank">
                      <img :src="banner.url" style="height: 90%; width: 100%" />
                    </a>
                  </div>
                </div>
                <div class="swiper-pagination swiper-pagination-white"></div>
                <div
                  class="swiper-button-prev swiper-button-white"
                  slot="button-prev"
                ></div>
                <div
                  class="swiper-button-next swiper-button-white"
                  slot="button-next"
                ></div>
              </div> -->
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="banner in bannerList" :key="banner.id">
                  <img :src="banner.url" />
                </el-carousel-item>
              </el-carousel>
              <!-- 房屋信息头部 -->
              <div class="entry-title clearfix" style="margin-top: 30px">
                <span
                  class="pull-left"
                  style="font-size: 20px; font-weight: 400"
                  >房屋信息</span
                >
                <span class="pull-right"
                  >房屋编码：{{ houseInfo.houseId }}，更新时间：{{
                    houseInfo.finalTime
                  }}</span
                >
              </div>
              <!-- 房屋信息描述 -->
              <el-descriptions>
                <el-descriptions-item label="户型">
                  {{ houseInfo.houseType }}</el-descriptions-item
                >
                <el-descriptions-item label="面积"
                  >{{ houseInfo.area }}平方米</el-descriptions-item
                >
                <el-descriptions-item label="朝向">{{
                  houseInfo.direction
                }}</el-descriptions-item>
                <el-descriptions-item label="楼层">
                  高层(共{{ houseInfo.maxFloor }}层)
                </el-descriptions-item>
                <el-descriptions-item label="装修"
                  >简单装修</el-descriptions-item
                >
                <el-descriptions-item label="类型"
                  >普通住宅</el-descriptions-item
                >
                <el-descriptions-item label="小区"
                  ><a>{{ houseInfo.houseName }}</a>
                  <span style="font-size: 12px; color: #999; margin-left: 10px"
                    ><i class="el-icon-location-outline"></i>
                    {{ houseInfo.address }}</span
                  >
                </el-descriptions-item>
                <el-descriptions-item label="可入住时间">{{
                  houseInfo.intoTime
                }}</el-descriptions-item>
              </el-descriptions>
              <!-- 房屋配套头部 -->
              <div class="entry-title clearfix" style="margin-top: 40px">
                <span
                  class="pull-left"
                  style="font-size: 20px; font-weight: 400"
                  >房屋配套</span
                >
              </div>
              <!-- 配套信息 -->
              <ul class="property-single-features-list clearfix">
                <li v-for="tag in houseTags" :key="tag.tagId">
                  {{ tag.tagName }}
                </li>
              </ul>

              <!-- 房源概况 -->
              <div class="entry-title clearfix" style="margin-top: 30px">
                <span
                  class="pull-left"
                  style="font-size: 20px; font-weight: 400"
                  >房源概况</span
                >
              </div>
              <p>{{ houseInfo.houseDescribe }}</p>

              <!-- 地图区域 -->
              <el-form style="margin-top: 50px">
                <el-row>
                  <el-col>
                    <el-col>
                      <p style="color: darkgray">
                        <el-input
                          v-model="model.address"
                          placeholder="搜索地点"
                          style="width: 200px; margin-bottom: 5px"
                          prefix-icon="el-icon-search"
                        ></el-input>
                        <span style="float: right">
                          (<i class="el-icon-location-outline"></i
                          >{{ houseInfo.address }})
                        </span>

                        <span></span>
                      </p>

                      <baidu-map
                        class="bm-view"
                        ak=""
                        :center="center"
                        :zoom="zoom"
                        :scroll-wheel-zoom="true"
                        @ready="createMap"
                      >
                        <!--            搜索-->
                        <bm-local-search
                          :keyword="model.address"
                          :auto-viewport="true"
                          style="display: none"
                        ></bm-local-search>
                        <!--            标记-->
                        <bm-marker
                          :position="{ lng: model.lng, lat: model.lat }"
                        />
                      </baidu-map>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form>
            </section>
          </div>
          <!-- 右边区域 -->
          <div class="col-lg-4 col-md-5">
            <div id="property-sidebar">
              <!-- 个人信息 -->
              <section class="widget recent-properties clearfix">
                <div class="property clearfix">
                  <a class="feature-image zoom"
                    ><img
                      src="https://education-1023.oss-cn-beijing.aliyuncs.com/img/user3.png"
                      alt="Property Image"
                  /></a>
                  <div class="property-contents">
                    <h6 class="entry-title">
                      <a href="single-property.html">{{
                        houseInfo.contactName
                      }}</a>
                    </h6>
                  </div>
                  <el-button type="primary" size="mini"
                    ><i class="el-icon-phone"></i
                    >{{ houseInfo.contactPhoneNumber }}</el-button
                  >
                  <div style="color: red; font-size: 10px">
                    <i class="el-icon-warning-outline"></i
                    ><span
                      >郑重提示：在签订合同之前，切勿支付任何形式的费用，以免上当受骗</span
                    >
                  </div>
                </div>
              </section>
              <!--预定  -->
              <section class="widget recent-properties clearfix">
                <div class="property clearfix">
                  <span
                    style="color: black; font-size: 16px; margin-bottom: 5px"
                    >选择看房日期</span
                  >
                  <div class="block">
                    <el-date-picker
                      v-model="moveIntoTime"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <span
                    style="color: black; font-size: 16px; margin-bottom: 5px"
                    >选择当天时间段</span
                  >

                  <el-time-select
                    v-model="dayTime"
                    :picker-options="{
                      start: '08:00',
                      step: '01:00',
                      end: '20:00',
                    }"
                    format="yyyy-MM-dd"
                    placeholder="选择时间"
                  >
                  </el-time-select>
                  <el-button
                    style="width: 80%; margin-top: 10px"
                    type="primary"
                    @click="sendAppointment()"
                    >立即预约看房</el-button
                  >
                </div>
              </section>
              <!-- 留言 -->
              <section class="widget recent-properties clearfix">
                <div class="property clearfix">
                  <h4>留言</h4>
                  <el-input
                    class="liuyan"
                    resize="none"
                    maxlength="100"
                    show-word-limit
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="message.content"
                  >
                  </el-input>
                  <el-button
                    style="width: 80%; margin-top: 10px"
                    type="primary"
                    @click="sumbMessage()"
                    >留言</el-button
                  >
                </div>
              </section>
              <!-- 相关房源 -->
              <section class="widget recent-properties clearfix">
                <h5 class="title">相关房源</h5>

                <div
                  class="property clearfix"
                  v-for="similar in similarHouses"
                  :key="similar.houseId"
                >
                  <a class="feature-image zoom"
                    ><img
                      style="height: 89.58px !important; width: 125.66px"
                      :src="similar.houseImg"
                      alt="Property Image"
                  /></a>
                  <div class="property-contents">
                    <h6 class="entry-title">
                      <a :href="'/house/' + similar.houseId">{{
                        similar.houseName
                      }}</a>
                    </h6>
                    <span style="color: #f60"
                      >{{ similar.monthMoney }}元/月</span
                    >
                    <div class="property-meta clearfix">
                      <span>{{ similar.area }}平方米</span>
                    </div>
                    <div>
                      <span style="font-size: 10px; color: #999"
                        ><i class="el-icon-location-outline"></i>
                        {{ houseInfo.address }}</span
                      >
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import tagApi from "@/api/tag";
import houseApi from "@/api/houseApi";
import cookie from "js-cookie";
import userApi from "@/api/userApi";
import appointApi from "@/api/appoint";
export default {
  data() {
    return {
      // 轮播图配置
      swiperOption: {
        loop: true, // 循环模式选项
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      // 轮播图照片
      bannerList: [
        {
          id: 1,
          url: "https://education-1023.oss-cn-beijing.aliyuncs.com/img/id1.jpg",
        },
        {
          id: 2,
          url: "https://education-1023.oss-cn-beijing.aliyuncs.com/img/id2.jpg",
        },
        {
          id: 3,
          url: "https://education-1023.oss-cn-beijing.aliyuncs.com/img/id3.jpg",
        },
        {
          id: 4,
          url: "https://education-1023.oss-cn-beijing.aliyuncs.com/img/id4.jpg",
        },
      ],
      // 房屋配套
      houseTags: [],
      houseId: "",
      houseInfo: {},
      similarHouses: [],
      // map
      center: { lng: 0, lat: 0 },
      //放大尺度
      zoom: 11,
      model: {
        lng: "",
        lat: "",
        address: "",
      },
      result: {
        level: "城市",
        confidence: 20,
        location: { lng: 113.271431, lat: 23.135336 },
        precise: 0,
      },

      //预约
      appointment: {
        time: "",
        message: "",
        houseId: "",
      },
      // 看房日期
      moveIntoTime: new Date(),
      //退当天时间段
      dayTime: "",
      //留言
      message: {
        sendUserId: "",
        revUserId: "",
        content: "",
      },
      //是否能发送信息标签
      canSend: true,
    };
  },
  created() {
    if (this.$route.params.id) {
      this.houseId = this.$route.params.id;

      //获取房子信息
      houseApi.getHouseInfoById(this.houseId).then((response) => {
        this.houseInfo = response.data.data.houseInfo;
        console.log("房源信息：" + this.houseInfo);
        //设置地图的关键字
        //this.model.address = this.houseInfo.address;
        //this.center = this.houseInfo.address;
        //this.location = this.houseInfo.address;
        //获取类似房源信息
        // houseApi.getsimilarHouses(this.houseInfo).then((response) => {
        //   this.similarHouses = response.data.data.similarHouses;
        // });
      });

      //获取配套信息
      tagApi.getTagsById(this.houseId).then((response) => {
        this.houseTags = response.data.data.tags;
      });
    }
  },
  mounted() {},
  methods: {
    //预约看房
    sendAppointment() {
      var user = this.islogin();
      if (!user.userId) {
        return;
      }
      if (user.userId == this.houseInfo.userId) {
        this.$message.error("不能预约自己的房屋");
        return;
      }

      if (this.dayTime == "" || this.dayTime == null) {
        this.$message.error("请选择当天时间段");
        return;
      }
      var year = this.moveIntoTime.getFullYear();
      var month = this.moveIntoTime.getMonth() + 1;
      var day = this.moveIntoTime.getDate();
      var str = year + "年" + month + "月" + day + "日";
      this.$confirm(
        "您确认要预约" + str + "  " + this.dayTime + "这个时间点吗",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        //消息日期
        var date = str + " " + this.dayTime;
        this.appointment.time = date;
        this.appointment.houseId = this.houseInfo.houseId;
        this.appointment.revUserId = this.houseInfo.userId;
        appointApi.insertAppoint(this.appointment).then((response) => {
          if (response.data.success) {
            this.$message.success(response.data.message);
            this.dayTime = "";
          } else {
            this.$message.error(response.data.message);
          }
        });
      });
    },

    //留言
    sumbMessage() {
      if (!this.canSend) {
        this.$message.error("请不要频繁发送消息");
        return;
      }
      if (this.message.content.length < 1 || this.message.content == "") {
        return;
      }
      var user = this.islogin();
      //如果当前发送人 == 该房子所属人，则不进行消息发送
      if (user.userId == this.houseInfo.userId || user.userId == "") {
        this.$message.error("不能给自己发送消息");
        return;
      }
      this.message.sendUserId = user.userId;
      this.message.revUserId = this.houseInfo.userId;
      userApi.sendMessage(this.message).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: response.data.message,
          });
          //清空消息文本、设置不可发送状态
          this.message = {};
          this.canSend = false;
          //3秒后释放canSend
          let timer = setTimeout(() => {
            this.canSend = true;
          }, 3000);
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    islogin() {
      try {
        var user = JSON.parse(cookie.get("userInfo"));

        return user;
      } catch (error) {
        this.$message.error("请先进行登录");
      }
    },
    // 创建地图
    createMap({ BMap, map }) {
      let timer = setTimeout(() => {
        //需要定时执行的代码
        console.log("延迟加载地图");

        var address = this.houseInfo.address;
        //广州城市使用了真实小区地址
        if (this.houseInfo.city == "广州") {
          address = "" + this.houseInfo.address + this.houseInfo.houseName;
        }
        console.log("请求坐标的地址：" + address);
        houseApi
          .getLocation(this.houseInfo.address, this.houseInfo.houseName)
          .then((response) => {
            //返回location
            // 百度地图API功能
            this.center.lng = response.data.data.location.location.lng;
            this.center.lat = response.data.data.location.location.lat;
            this.zoom = this.zoom;
            const viewthis = this;
            map.addEventListener("click", function (e) {
              viewthis.model.lng = e.point.lng;
              viewthis.model.lat = e.point.lat;
            });

            // 区域图
            var datas = new Array("" + this.houseInfo.address + "-#665599");
            var bdary = new BMap.Boundary();
            for (var i = 0; i < datas.length; i++) {
              getBoundary(datas[i], bdary);
            }
          });
      }, 100);

      // 设置区域图
      function getBoundary(data, bdary) {
        data = data.split("-");
        bdary.get(data[0], function (rs) {
          // 获取行政区域
          var count = rs.boundaries.length; // 行政区域的点有多少个
          // var pointArray = []
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "#ff0000",
              fillOpacity: 0.1,
              fillColor: data[1],
            }); // 建立多边形覆盖物
            map.addOverlay(ply); // 添加覆盖物
          }
        });
      }
      // for (var key in map) {
      //   console.log("" + key + "：" + map[key]);
      // }
    },
  },
  watch: {},
};
</script>
<style scoped>
.minibottom {
  margin-bottom: -20px;
}
/* 轮播图大小 */
.swiper {
  width: 100%;
  height: 400px;
}
.miniRight {
  margin-right: 10px;
}
.miniBottom {
  margin-bottom: 20px;
}

/* 分割线 */
.el-divider--vertical {
  height: 1.5em;
}

/* map configuration */

.bm-view {
  height: 400px;
}

/* 百度地图 */
.BMap_cpyCtrl .BMap_noprint .anchorBL {
  display: none !important;
}
.anchorBL {
  display: none !important;
}
/* 时间input */
.el-range-editor.el-input__inner {
  width: 80%;
}
</style>
