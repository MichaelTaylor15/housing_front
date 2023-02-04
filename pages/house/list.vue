<template>
  <section>
    <div id="site-banner" class="text-center clearfix">
      <div class="container">
        <h1 class="title wow slideInLeft">房源列表</h1>
        <!-- <ol class="breadcrumb wow slideInRight">
          <li><a href="index.html">Home</a></li>
          <li><a href="property-map-view.html">Listing</a></li>
          <li class="active">Properties Grid</li>
        </ol> -->
      </div>
    </div>
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
    <section id="property-listing">
      <header class="section-header text-center">
        <div class="container">
          <!-- 列表头 -->
          <h2 class="pull-left">
            Showing {{ left }} - {{ right }} of {{ total }} items
          </h2>

          <div
            class="property-sorting pull-left"
            style="margin-left: 100px; color: black"
          >
            <label for="property-sort-dropdown"> 排序方式：</label>
            <!-- 排序 -->
            <el-button @click="sortByMoney()" style="border: none"
              >租金<i
                :class="
                  isDescMoneyIcon ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                "
              ></i
            ></el-button>
            <el-button @click="sortByTime()" style="border: none"
              >时间<i
                :class="
                  isDescTimeIcon ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                "
              ></i
            ></el-button>
          </div>
        </div>
      </header>
      <!-- 卡片列表 -->
      <div class="container section-layout">
        <div class="row">
          <div
            class="layout-item-wrap col-xs-10"
            v-for="house in houseList"
            :key="house.houseId"
          >
            <article class="property layout-item clearfix list-style mycard">
              <!--  图片区域-->
              <figure class="feature-image" style="width: 175px">
                <a class="clearfix zoom"
                  ><img
                    data-action="zoom"
                    :src="house.houseImg"
                    alt="Property Image"
                    style="width: 175px; height: 140px"
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
              <!-- 右边描述区域 -->
              <div
                class="property-contents clearfix"
                style="
                  margin-top: 5px;
                  cursor: pointer;
                  width: 735px;
                  height: 140px;
                "
                @click="viewHouseDetail(house.houseId)"
              >
                <header>
                  <div class="pull-left">
                    <h6 class="entry-title">
                      <a target="_blank">{{ house.rentTitle }}</a>
                    </h6>
                  </div>
                </header>
                <!-- 附加信息 -->
                <div style="margin-top: 30px; position: absolute">
                  <span class="miniRight">{{ house.houseType }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ house.area }} </span><span>平方米</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="miniRight">{{ house.rentType }}</span>
                  <i class="el-icon-user"></i
                  ><span>{{ house.contactName }}</span>
                </div>
                <!-- 地址 -->
                <div style="margin-top: 58px">
                  <p>
                    <span
                      class="miniRight"
                      style="font-size: 12px; color: #999"
                    >
                      {{ house.houseName }}</span
                    >
                    <span style="font-size: 12px; color: #999"
                      ><i class="el-icon-location-outline"></i>
                      {{ house.address }}</span
                    >
                  </p>
                </div>
                <div style="margin-top: -37px">
                  <span
                    style="font-size: 24px; color: #eb5f00; margin-left: 80%"
                    >{{ house.monthMoney }}</span
                  >
                  <span style="color: #eb5f00">元/月</span>
                </div>
                <!-- 出租方式和朝向 -->
                <div>
                  <span
                    class="miniRight"
                    style="background: #fbf4f1; color: #e88a78"
                    >{{ house.rentType }}</span
                  >
                  <span
                    class="miniRight"
                    style="background: #f2f6ed; color: #799374"
                    >{{ house.direction }}</span
                  >
                  <!-- 定位字符, 提取 -->
                  <span class="miniRight" style="background: lavender">{{
                    house.rentContent.substring(
                      0,
                      house.rentContent.indexOf(",")
                    )
                  }}</span>
                  <span class="miniRight" style="background: antiquewhite">{{
                    house.rentContent.substring(
                      house.rentContent.indexOf(",") + 1
                    )
                  }}</span>
                </div>
                <!-- 用户 -->
                <!-- <div class="author-box clearfix">
                  <a href="#" class="author-img"
                    ><img src="/images/agents/1.jpg" alt="Agent Image"
                  /></a>
                  <cite class="author-name"
                    >Personal Seller: <a href="#">Linda Garret</a></cite
                  >
                  <span class="phone"
                    ><i class="fa fa-phone"></i> 00894 692-49-22</span
                  >
                </div> -->
              </div>
            </article>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        :current-page="current"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
      />
    </section>
  </section>
</template>
<script>
import houseApi from "@/api/houseApi";
import dictApi from "@/api/dictApi";
export default {
  data() {
    return {
      //排序
      sortBy: "",
      isDescMoneyIcon: true,
      isDescTimeIcon: true,
      houseList: [],
      current: 1,
      limit: 10,
      total: 0,
      // 浏览图片对话框
      dialogImageUrl: "",
      dialogVisible: false,
      left: 1,
      right: 10,
      //
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
        // 排序
        sortBy: "",
        isDesc: "",
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
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    // 排序
    sortByMoney() {
      //先获取当前选择的排序方式而不是切换了之后再获取
      this.searchObj.isDesc = this.isDescMoneyIcon ? 1 : 0;
      // 切换icon
      this.isDescMoneyIcon = this.isDescMoneyIcon ? false : true;
      //调接口刷新数据
      this.searchObj.sortBy = "租金";
      this.getList(1);
    },
    sortByTime() {
      this.searchObj.isDesc = this.isDescTimeIcon ? 1 : 0;
      this.isDescTimeIcon = this.isDescTimeIcon ? false : true;
      //调接口刷新数据
      this.searchObj.sortBy = "时间";

      this.getList(1);
    },

    //改变  showing  left  - right items of -total?
    changeShowing(current) {
      this.left = (current - 1) * this.limit + 1;
      this.right = current * this.limit;
    },

    // 分页切换
    getList(current) {
      houseApi
        .searchHouseList(this.searchObj, current, this.limit)
        .then((response) => {
          this.houseList = response.data.data.houseList;
          this.total = response.data.data.total;
          if (current != 1) {
            this.changeShowing(current);
          }
        });
    },
    //对话框查看房源照片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    viewHouseDetail(id) {
      this.$router.push({ path: "/house/" + id });
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
      houseApi
        .searchHouseList(this.searchObj, this.current, this.limit)
        .then((response) => {
          this.houseList = response.data.data.houseList;
          this.total = response.data.data.total;
        });
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
    // 排序方式监听
  },
};
</script>
<style >
.el-input__inner {
  width: 230px !important;
  margin-right: 20px !important;
}
.el-select-dropdown {
  min-width: 230px !important;
}
.el-icon-arrow-up:before {
  content: "" !important;
}
.miniRight {
  margin-right: 10px;
}
/* btn */
/* .el-button--text {
  color: black !important;
} */
/*  */
/* .btn:active {
  color: blue;
} */
/* 鼠标悬停改变背景色 */
.mycard:hover {
  background-color: #e6e6e6;
}
</style>