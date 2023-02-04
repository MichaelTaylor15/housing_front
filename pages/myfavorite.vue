<template>
  <!-- 房子列表标题头 -->
  <section id="home-property-listing" style="height: 1100px">
    <header class="section-header home-section-header text-center">
      <div class="container">
        <h2>房源收藏列表</h2>
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
                  <!-- <span style="margin-left: 17%; font-size: 20px"
                      ><i class="el-icon-star-off"></i
                    ></span> -->
                  <el-tag
                    :id="house.houseId"
                    style="
                      float: right;
                      margin-top: -5px;
                      cursor: pointer;
                      background-color: #67c23a;
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
      <div v-else>
        <el-empty description="还没有收藏任何房子"></el-empty>
      </div>
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
    this.getHouse();
  },
  methods: {
    //对话框查看房源照片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    getHouse(current = 1) {
      try {
        var user = JSON.parse(cookie.get("userInfo"));
        userApi
          .getfavoriteHouse(user.userId, current, this.limit)
          .then((response) => {
            this.houseList = response.data.data.list;
            this.total = response.data.data.total;
          });
      } catch (error) {
        this.$message.error("请先进行登录");
      }
    },
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
              //移除div
              var div = document.getElementById("house" + id);
              div.remove();
              //刷新
              this.getHouse();
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
  },
};
</script>