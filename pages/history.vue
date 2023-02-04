<template>
  <section>
    <h4 style="text-align: center; color: #909399">仅支持查看前20条记录</h4>
    <div style="margin-bottom: 30px">
      <el-button
        type="primary"
        size="small"
        style="margin-left: 70%; margin-right: 20px"
        @click="show(manage)"
        >管理</el-button
      >
      <el-checkbox
        v-show="manage"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        style="margin-right: 20px"
        >全选</el-checkbox
      >

      <el-button
        v-show="manage"
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="deleteHistory(ids)"
        >删除记录</el-button
      >
    </div>

    <div class="block" style="margin-left: 20%; margin-top: 10px">
      <!--  -->

      <el-timeline>
        <el-checkbox-group v-model="ids" @change="handleCheckedCitiesChange">
          <el-timeline-item
            v-for="house in houseList"
            :key="house.houseId"
            :timestamp="house.browseTime"
            placement="top"
            style="width: 80%"
          >
            <el-card style="width: 82%">
              <div style="display: inline-block; width: 100%" class="ckwrap">
                <img
                  style="
                    width: 120px;
                    height: 100px;
                    vertical-align: text-bottom;
                  "
                  :src="house.houseImg"
                />
                <div
                  style="
                    display: inherit;
                    margin-left: 10px;
                    margin-top: -10px;
                    width: 73%;
                  "
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="跳转至房子详情页面"
                    placement="top"
                  >
                    <h4 class="rentTitle" @click="viewHouse(house.houseId)">
                      {{ house.rentTitle }}
                    </h4>
                  </el-tooltip>
                  <p style="font-size: 14px">
                    <span class="miniRight">{{ house.houseType }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{ house.area }} </span><span>平方米</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="miniRight">{{ house.rentType }}</span>
                    <i class="el-icon-user"></i
                    ><span>{{ house.contactName }}</span>
                    <span style="font-size: 24px; color: #eb5f00; float: right"
                      >{{ house.monthMoney
                      }}<span style="font-size: 15px">元/月</span></span
                    >
                  </p>
                  <!-- 地址 -->

                  <span class="miniRight" style="font-size: 12px; color: #999">
                    {{ house.houseName }}</span
                  >
                  <span style="font-size: 12px; color: #999"
                    ><i class="el-icon-location-outline"></i>
                    {{ house.address }}</span
                  >
                </div>

                <el-checkbox
                  v-show="manage"
                  :label="house.houseId"
                  :key="house.houseId"
                  style="float: right"
                  class="sub-checkbox"
                ></el-checkbox>
              </div>
            </el-card>
          </el-timeline-item>
        </el-checkbox-group>
      </el-timeline>
    </div>
  </section>
</template>
<script>
import userApi from "@/api/userApi";
import cookie from "js-cookie";
export default {
  data() {
    return {
      houseList: [],
      //多选框，默认不显示
      manage: false,
      //所有房源浏览历史的houseId
      allIds: [],
      //多选框设置
      ids: [],
      checkAll: false,
      cities: [],
      isIndeterminate: true,
    };
  },
  created() {
    this.getHouse();
  },
  methods: {
    getHouse() {
      try {
        var user = JSON.parse(cookie.get("userInfo"));
        userApi.getUserHistory(user.userId).then((response) => {
          this.houseList = response.data.data.houseList;
        });
      } catch (error) {
        this.$message.error("请先进行登录");
      }
    },

    show(manage) {
      this.manage = manage ? false : true;
    },

    //跳转
    viewHouse(id) {
      //console.log("房子id：" + id);
      this.$router.push({ path: "/house/" + id });
    },

    handleCheckAllChange(val) {
      //添加所有房子浏览历史的id到allIds

      this.countAllIds();
      this.ids = val ? this.allIds : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      //添加所有房子浏览历史的id到allIds
      this.countAllIds();
      //console.log("allids 长度：" + this.allIds.length);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allIds.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allIds.length;
    },
    countAllIds() {
      if (this.allIds.length < 1) {
        for (let index = 0; index < this.houseList.length; index++) {
          this.allIds.push(this.houseList[index].houseId);
        }
      }
    },
    //删除浏览历史
    deleteHistory(ids) {
      console.log("ids:" + ids);
      this.$confirm("确定要删除这" + ids.length + "条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        userApi.deleteHistory(ids).then((response) => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: response.data.message,
            });
            //重新加载历史记录
            this.getHouse();
          } else {
            this.$message.error(response.data.message);
          }
        });
      });
    },
  },
};
</script>
<style >
.rentTitle:hover {
  cursor: pointer;
}
.card-checkbox {
  float: right;
}
/* 隐藏多选框的房子id */
.sub-checkbox > .el-checkbox__label {
  display: none;
}
</style>