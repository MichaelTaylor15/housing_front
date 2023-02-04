<template>
  <!-- 房子列表标题头 -->
  <section id="home-property-listing" style="height: 1100px">
    <header class="section-header home-section-header text-center">
      <div class="container">
        <h2>我的房屋</h2>
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
            :id="'house' + house.houseId"
          >
            <article class="property layout-item clearfix">
              <figure class="feature-image">
                <a class="clearfix zoom">
                  <img
                    data-action="zoom"
                    v-if="house.houseImg"
                    :src="house.houseImg"
                    alt="Property Image"
                    style="width: 346px; height: 231px"
                    @click="handlePictureCardPreview(house.houseImg)"
                  />
                  <el-image
                    data-action="zoom"
                    alt="Property Image"
                    v-else
                    style="width: 346px; height: 222px"
                  ></el-image>
                </a>
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
                    'btn-danger': house.status == '未上架',
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
                  <!-- <span style="margin-left: 17%; font-size: 20px"
                      ><i class="el-icon-star-off"></i
                    ></span> -->
                  <button
                    style="
                      float: right;
                      border: none;
                      color: #fff;
                      background-color: #409eff;
                      border-color: #409eff;
                    "
                    @click="modifyHouseInfo(house.houseId)"
                  >
                    修改房子信息
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="total > 0"
        background
        :current-page="current"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getHouse"
      />
    </div>
  </section>
</template>
<script>
import cookie from "js-cookie";
import userApi from "@/api/userApi";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      houseList: [],
      favoriteOrTag: "已收藏",

      //分页
      total: 0,
      limit: 6,
      current: 1,
    };
  },
  created() {
    this.getHouse(1);
  },
  methods: {
    //对话框查看房源照片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    getHouse(current) {
      try {
        var user = JSON.parse(cookie.get("userInfo"));
        userApi
          .getUserHouse(user.userId, current, this.limit)
          .then((response) => {
            this.houseList = response.data.data.houseList;
            this.total = response.data.data.total;
          });
      } catch (error) {
        this.$message.error("请先进行登录");
      }
    },
    //跳转修改页面
    modifyHouseInfo(id) {
      this.$router.push({ path: "/rentout?id=" + id });
    },
  },
};
</script>