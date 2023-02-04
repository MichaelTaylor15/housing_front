<template>
  <div>
    <!-- 幻灯片 开始 -->
    <!-- <div v-swiper:mySwiper="swiperOption" class="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide"
          style="background: #040b1b"
        >
          <a target="_blank">
            <img :src="banner.imgUrl" />
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
    <!-- 幻灯片 结束 -->
    <!-- search area -->

    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </el-carousel-item>
    </el-carousel>

    <div id="advance-search" class="main-page clearfix">
      <div class="container">
        <form action="#" id="adv-search-form" class="clearfix">
          <div style="display: flex">
            <el-autocomplete
              class="inline-input"
              v-model="searchObj.city"
              :fetch-suggestions="querySearchCity"
              middle-icon="el-icon-search"
              placeholder="请输入城市"
              @select="handleSelect"
            ></el-autocomplete>
            <!-- 地区选择 -->
            <el-select v-model="searchObj.areaName" placeholder="请选择地区">
              <el-option
                v-for="item in areas"
                :key="item.areaName"
                :label="item.areaName"
                :value="item.areaName"
              >
              </el-option>
            </el-select>

            <el-button
              type="primary"
              icon="el-icon-search"
              style="width: 230px; height: 50px; margin-right: 3px"
              @click="submitSearch()"
              >搜索</el-button
            >
            <el-button
              type="info"
              icon="el-icon-delete"
              @click="cleanSearchObj()"
              style="
                height: 50px;
                margin-left: 22px;
                width: 230px;
                height: 50px;
              "
              >清空所有搜索项</el-button
            >
          </div>

          <div style="display: flex">
            <el-select
              v-model="searchObj.rentType"
              placeholder="选择整租或合租"
            >
              <el-option value="选择整租或合租" disabled></el-option>
              <el-option
                v-for="item in houseType"
                :key="item.id"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="searchObj.bathRoom"
              placeholder="卫生间数量"
              style=""
            >
              <el-option value="卫生间数量" disabled></el-option>
              <el-option
                v-for="item in beds"
                :key="item.id"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="searchObj.bedNum"
              placeholder="床"
              style="margin-right: 4.5px"
            >
              <el-option value="床" disabled></el-option>
              <el-option
                v-for="item in beds"
                :key="item.id"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select v-model="searchObj.direction" placeholder="房子朝向">
              <el-option value="房子朝向" disabled></el-option>
              <el-option
                v-for="item in directions"
                :key="item.id"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div style="display: flex">
            <el-autocomplete
              class="inline-input"
              v-model="searchObj.minArea"
              :fetch-suggestions="querySearchMinAreas"
              middle-icon="el-icon-search"
              placeholder="最小面积"
              @select="handleSelect"
            ></el-autocomplete>
            <el-autocomplete
              class="inline-input"
              v-model="searchObj.maxArea"
              :fetch-suggestions="querySearchMaxAreas"
              middle-icon="el-icon-search"
              placeholder="最大面积"
              @select="handleSelect"
            ></el-autocomplete>
            <el-autocomplete
              class="inline-input"
              v-model="searchObj.minMoney"
              :fetch-suggestions="querySearchMinMoneys"
              middle-icon="el-icon-search"
              placeholder="最小金额"
              @select="handleSelect"
              style="margin-right: 4.5px"
            ></el-autocomplete>
            <el-autocomplete
              class="inline-input"
              v-model="searchObj.maxMoney"
              :fetch-suggestions="querySearchMaxMoneys"
              middle-icon="el-icon-search"
              placeholder="最大金额"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </form>
      </div>
    </div>

    <!-- 房子列表标题头 -->
    <section id="home-property-listing" style="height: 1100px">
      <header class="section-header home-section-header text-center">
        <div class="container">
          <h2 class="wow slideInRight">房源推荐</h2>
          <p class="wow slideInLeft"></p>
        </div>
      </header>

      <div class="container">
        <div class="row">
          <div id="property-for-rent-slider">
            <!-- 房子列表 -->
            <div
              v-for="house in houseList"
              :key="house.houseId"
              class="col-lg-4 col-sm-6 layout-item-wrap"
            >
              <article class="property layout-item clearfix">
                <figure class="feature-image">
                  <a class="clearfix zoom">
                    <img
                      data-action="zoom"
                      :src="house.houseImg"
                      alt="Property Image"
                      style="width: 346px; height: 231px"
                      @click="handlePictureCardPreview(house.houseImg)"
                  /></a>
                  <el-dialog
                    :visible.sync="dialogVisible"
                    @scroll.passive="scrollHandle"
                    class="dialogClass"
                  >
                    <img :src="dialogImageUrl" style="height: 500px" alt="" />
                  </el-dialog>
                  <span
                    :class="{
                      'btn-warning': house.status == '急租',
                      'btn-primary': house.status == '正在招租',
                      'btn-success': house.status == '已出租',
                      'btn-info': house.status == '预出租',
                    }"
                    class="btn btn-sale"
                    >{{ house.status }}</span
                  >
                </figure>
                <div class="property-contents clearfix">
                  <header class="property-header clearfix">
                    <div class="pull-left">
                      <h6 class="entry-title">
                        <a :href="'/house/' + house.houseId" target="_blank">{{
                          house.houseName
                        }}</a>
                      </h6>
                      <span class="property-location"
                        ><i class="el-icon-location-information"></i>
                        {{ house.address }}</span
                      >
                    </div>

                    <p style="color: #eb5f00; float: right">
                      <strong style="font-size: 20px"
                        ><b>{{ house.monthMoney }}</b></strong
                      >元/月
                    </p>
                  </header>
                  <div class="property-meta clearfix">
                    <span>{{ house.area }} m²</span>
                    <span>{{ house.rentType }}</span>
                    <span>{{ house.rentContent }}</span>
                    <span><i class="fa fa-bathtub"></i></span>
                    <span><i class="fa fa-wifi" aria-hidden="true"></i></span>
                    <!-- <span style="margin-left: 17%; font-size: 20px"
                      ><i class="el-icon-star-off"></i
                    ></span> -->
                    <el-tag
                      :type="tagType"
                      :id="house.houseId"
                      style="
                        margin-top: -5px;
                        float: right;
                        cursor: pointer;
                        margin-left: -2px;
                      "
                      @click="favorite(house.houseId)"
                      >{{ favoriteOrTag }}</el-tag
                    >
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么选择我们 -->
    <!-- <section id="home-features-section" class="text-center">
      <header class="section-header home-section-header">
        <div class="container">
          <h2 class="wow slideInRight">WHY CHOOSE US</h2>
          <p class="wow slideInLeft">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut <br />
            labore et dolore magna aliquan ut enim ad minim veniam.
          </p>
        </div>
      </header>
      
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <div class="feature clearfix">
              <i class="icon"
                ><img src="/images/features/1.png" alt="Feature Icon"
              /></i>
              <h6 class="entry-title">Paying guest</h6>
              <p>
                Dolor sit amet consectetuer sed diam nonummy euismod tincidunt
                laoreet dolore magna
              </p>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="feature clearfix">
              <i class="icon"
                ><img src="/images/features/2.png" alt="Feature Icon"
              /></i>
              <h6 class="entry-title">Paying guest</h6>
              <p>
                Dolor sit amet consectetuer sed diam nonummy euismod tincidunt
                laoreet dolore magna
              </p>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="feature clearfix">
              <i class="icon"
                ><img src="/images/features/3.png" alt="Feature Icon"
              /></i>
              <h6 class="entry-title">Paying guest</h6>
              <p>
                Dolor sit amet consectetuer sed diam nonummy euismod tincidunt
                laoreet dolore magna
              </p>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="feature clearfix">
              <i class="icon"
                ><img src="/images/features/4.png" alt="Feature Icon"
              /></i>
              <h6 class="entry-title">Paying guest</h6>
              <p>
                Dolor sit amet consectetuer sed diam nonummy euismod tincidunt
                laoreet dolore magna
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section> -->

    <a href="#top" id="scroll-top"><i class="fa fa-angle-up"></i></a>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  </div>
</template>

<script>
import dictApi from "@/api/dictApi";
import houseApi from "@/api/houseApi";
import bannerApi from "@/api/bannerApi";
import cookie from "js-cookie";
import userApi from "@/api/userApi";
export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
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
      bannerList: [
        // "https://education-1023.oss-cn-beijing.aliyuncs.com/img/m1.jpg",
        // "https://education-1023.oss-cn-beijing.aliyuncs.com/img/m2.jpg",
        // "https://education-1023.oss-cn-beijing.aliyuncs.com/img/m3.jpg",
        // "https://education-1023.oss-cn-beijing.aliyuncs.com/img/m4.jpg",
      ],
      houseList: [],
      //查询对象
      searchObj: {
        city: "",
        areaName: "",
        //整租/合租
        rentType: "",
        bathRoom: "",
        bedNum: "",
        direction: "",
        minArea: "",
        maxArea: "",
        minMoney: "",
        maxMoney: "",
      },

      //输入框输入建议
      hotCitys: [],
      areas: [],
      minAreas: [],
      maxAreas: [],
      minMoneys: [],
      maxMoneys: [],

      houseType: [
        { value: "全部", id: "0" },
        { value: "整租", id: "1" },
        { value: "合租", id: "2" },
      ],

      status: {},
      allStatus: [],

      beds: [
        { id: 0, value: "全部" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "更多" },
      ],
      directions: [
        { value: "全部", id: "0" },
        { value: "正南", id: "1" },
        { value: "正北", id: "2" },
        { value: "正东", id: "3" },
        { value: "正西", id: "4" },
        { value: "西北", id: "5" },
        { value: "东北", id: "6" },
        { value: "西南", id: "7" },
        { value: "东南", id: "8" },
      ],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ],
      // 浏览图片对话框
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      current: 1,
      limit: 6,

      //是否收藏
      isfavorite: 0,
      //收藏，样式
      favoriteOrTag: "收藏",
      tagType: "primary",
      //'success' : 'info'
    };
  },
  created() {
    bannerApi.getBanner().then((response) => {
      this.bannerList = response.data.data.bannerList;
    });
  },

  methods: {
    //收藏房屋
    favorite(id) {
      var user;
      try {
        user = JSON.parse(cookie.get("userInfo"));
        //获取dom节点
        var dom = document.getElementById(id);

        var str = "" + user.userId + ":" + id + ":";
        var isfavorite = dom.textContent == "收藏" ? 0 : 1;
        str += isfavorite;
        console.log("str:" + str);
        userApi.favoriteHouse(str).then((response) => {
          var msg = response.data.message;
          console.log("msg:" + msg);
          if (response.data.success) {
            this.$message({
              type: "success",
              message: msg,
            });

            if (isfavorite == 1) {
              dom.innerText = "收藏";
              dom.style.backgroundColor = "#ecf5ff";
            } else {
              dom.innerText = "已收藏";
              dom.style.backgroundColor = "#67c23a";
            }
          } else {
            this.$message.error("操作失败");
          }
        });
      } catch (error) {
        if (user == "" || user == null) {
          this.$message.error("请先进行登录");
          return;
        }
      }
    },
    //对话框查看房源照片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    //初始化轮播
    initSwiper() {
      // setTimeout(() => {
      //   this.swiperOption = new Swiper(".swiper", {
      //     autoplay: true,
      //     loop: true, // 循环模式选项
      //     //配置分页
      //     pagination: {
      //       el: ".swiper-pagination", //分页的dom节点
      //     },
      //     //配置导航
      //     navigation: {
      //       nextEl: ".swiper-button-next", //下一页dom节点
      //       prevEl: ".swiper-button-prev", //前一页dom节点
      //     },
      //   });
      // }, 300);
    },
    //最小面积、最大面积、最小金额、最大金额，激活后列出输入建议
    loadMinArea() {
      return [
        { value: "全部" },
        { value: "50" },
        { value: "80" },
        { value: "100" },
        { value: "150" },
        { value: "200" },
      ];
    },
    loadMaxArea() {
      return [
        { value: "全部" },
        { value: "80" },
        { value: "100" },
        { value: "150" },
        { value: "200" },
        { value: "500" },
      ];
    },
    loadMinMoney() {
      return [
        { value: "全部" },
        { value: "300" },
        { value: "500" },
        { value: "800" },
        { value: "1000" },
        { value: "2000" },
        { value: "5000" },
      ];
    },
    loadMaxMoney() {
      return [
        { value: "全部" },
        { value: "800" },
        { value: "1000" },
        { value: "2000" },
        { value: "5000" },
        { value: "10000" },
      ];
    },
    //热门城市
    loadAllCity() {
      return [
        { value: "北京" },
        { value: "上海" },
        { value: "杭州" },
        { value: "广州" },
        { value: "深圳" },
        { value: "天津" },
      ];
    },
    //清除表单输入项
    cleanSearchObj() {
      this.searchObj = {};
    },
    //提交搜索表单
    submitSearch() {
      if (this.searchObj != null) {
        houseApi
          .searchHouseList(this.searchObj, this.current, this.limit)
          .then((response) => {
            this.houseList = response.data.data.houseList;
          });
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    querySearchCity(queryString, cb) {
      var hotCitys = this.hotCitys;
      var results = queryString
        ? hotCitys.filter(this.createFilter(queryString))
        : hotCitys;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchMinAreas(queryString, cb) {
      var minAreas = this.minAreas;
      var results = queryString
        ? minAreas.filter(this.createFilter(queryString))
        : minAreas;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchMaxAreas(queryString, cb) {
      var maxAreas = this.maxAreas;
      var results = queryString
        ? maxAreas.filter(this.createFilter(queryString))
        : maxAreas;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchMinMoneys(queryString, cb) {
      var minMoneys = this.minMoneys;
      var results = queryString
        ? minMoneys.filter(this.createFilter(queryString))
        : minMoneys;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchMaxMoneys(queryString, cb) {
      var maxMoneys = this.maxMoneys;
      var results = queryString
        ? maxMoneys.filter(this.createFilter(queryString))
        : maxMoneys;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
    houseApi
      .searchHouseList(this.searchObj, this.current, this.limit)
      .then((response) => {
        this.houseList = response.data.data.houseList;
      });
    //加载城市、最小最大面积、最小最大金额，激活输入建议列表数据
    this.hotCitys = this.loadAllCity();
    this.minAreas = this.loadMinArea();
    this.maxAreas = this.loadMaxArea();
    this.minMoneys = this.loadMinMoney();
    this.maxMoneys = this.loadMaxMoney();
  },
  watch: {
    // 监听城市输入框
    "searchObj.city": {
      handler: function () {
        //清除地区
        if (this.searchObj.city == null || this.searchObj.city == "") {
          this.areas = [];
          this.searchObj.areaName = "";
        } else {
          dictApi.getChildrenArea(this.searchObj.city).then((response) => {
            this.areas = response.data.data.areas;
            //设置默认第一个县/区
            this.searchObj.areaName = "全部";
          });
        }
      },
    },

    deep: true,
  },
};
</script>
<style >
.el-input__inner {
  /* min-width: 195px !important; */
  width: 230px !important;
  margin-right: 20px !important;
}
.el-select-dropdown {
  min-width: 230px !important;
}
.el-icon-arrow-up:before {
  content: "" !important;
}
/* 轮播图大小 */
.swiper {
  width: 1525px;
  height: 750px;
}
/* el-dialog */

/* element 幻灯片 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>