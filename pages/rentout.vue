<template>
  <section>
    <template>
      <el-card class="box-card">
        <!-- 卡片头部 -->
        <div slot="header" class="clearfix" style="display: flex">
          <h4 style="margin-left: 25%">1、发布房源</h4>
          <h4 style="margin-left: 10%">2、进行房源审核</h4>
          <h4 style="margin-left: 10%">3、同步房源数据展示</h4>
        </div>

        <div class="text item">
          <el-form
            class="form"
            label-width="130px"
            :model="houseInfo"
            :rules="rules"
            ref="rules"
          >
            <!-- 房源类型：1住宅、2别墅,住在和别墅的配套不一样 -->

            <el-form-item label="选择房源类型" required>
              <el-radio-group v-model="houseInfo.buildingType">
                <el-radio label="住宅" border
                  ><i class="el-icon-office-building"></i>&nbsp;住宅</el-radio
                >
                <el-radio label="别墅" border
                  ><i class="el-icon-school"></i>&nbsp;别墅</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <!-- 出租方式：1合租、2整租、 -->
            <el-form-item label="选择整租或合租" required>
              <el-radio-group v-model="houseInfo.rentType">
                <el-radio label="合租" border
                  ><i class="el-icon-film"></i>&nbsp;合租</el-radio
                >
                <el-radio label="整租" border
                  ><i class="el-icon-house"></i>&nbsp;整租</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <!-- 小区名称 -->

            <el-form-item label="小区名称" required prop="houseName">
              <el-input
                type="text"
                placeholder="请输入小区名称"
                v-model="houseInfo.houseName"
                show-word-limit
                style="width: 400px"
              ></el-input>
            </el-form-item>
            <!-- 地址 -->
            <el-form-item label="地址" required>
              <el-autocomplete
                class="inline-input"
                v-model="houseInfo.city"
                :fetch-suggestions="querySearchCity"
                middle-icon="el-icon-search"
                placeholder="请输入城市"
                style="width: 150px; margin-right: 20px"
              ></el-autocomplete>
              <!-- 地区选择 -->
              <el-select
                v-model="houseInfo.areaName"
                placeholder="请选择地区"
                style="width: 150px"
              >
                <el-option
                  v-for="item in areas"
                  :key="item.areaName"
                  :label="item.areaName"
                  :value="item.areaName"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 户型 -->
            <div style="display: flex">
              <el-form-item
                label="户型"
                class="houseType"
                style="width: 270px"
                prop="room"
              >
                <el-input
                  v-model.number="houseInfo.room"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">室</span>
              </el-form-item>
              <el-form-item
                class="houseType"
                style="width: 270px; margin-left: -130px; margin-right: -130px"
                prop="hall"
              >
                <el-input
                  v-model.number="houseInfo.hall"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">厅</span>
              </el-form-item>
              <el-form-item
                class="houseType"
                style="width: 270px"
                prop="toilet"
              >
                <el-input
                  v-model.number="houseInfo.toilet"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">卫</span>
              </el-form-item>
              <el-form-item
                class="houseType"
                style="width: 270px; margin-left: -130px"
                prop="bed"
              >
                <el-input
                  v-model.number="houseInfo.bed"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">床</span>
              </el-form-item>
            </div>

            <!-- 可出租月数 -->
            <el-form-item label="可出租月数" prop="rentMonth">
              <el-input
                v-model.number="houseInfo.rentMonth"
                autocomplete="off"
                class="miniInput"
              ></el-input>
            </el-form-item>
            <!-- 建筑面积 -->
            <el-form-item label="建筑面积" prop="area" class="houseType">
              <el-input
                v-model.number="houseInfo.area"
                autocomplete="off"
                class="miniInput"
                placeholder="平方米"
              ></el-input>
            </el-form-item>
            <!-- 房子朝向 -->
            <el-form-item label="房子朝向" required>
              <el-select
                v-model="houseInfo.direction"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in directions"
                  :key="item.id"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-form-item>

            <!-- 楼层 n 层、共 m 层 -->
            <div style="display: flex">
              <el-form-item
                label="楼层"
                class="houseType"
                style="width: 270px"
                prop="floor"
              >
                <el-input
                  v-model.number="houseInfo.floor"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">层，</span>
              </el-form-item>
              <el-form-item
                class="houseType"
                style="width: 270px; margin-left: -110px"
                prop="maxFloor"
              >
                <span class="myspan" style="margin-right: 10px">共</span>
                <el-input
                  v-model.number="houseInfo.maxFloor"
                  autocomplete="off"
                  class="miniInput"
                ></el-input>
                <span class="myspan">层</span>
              </el-form-item>
            </div>
            <!-- 楼栋号：n 幢/号/层 m 单元 w 室 -->
            <el-form-item label="小区详细地址" prop="address">
              <el-input
                v-model="houseInfo.address"
                style="width: 500px"
              ></el-input>
              <span style="color: darkgrey">(例如:XX街道XX小区XX单元XX室)</span>
            </el-form-item>
            <!-- 租金 元/月-->

            <el-form-item label="租金" prop="monthMoney" class="houseType">
              <el-input
                v-model.number="houseInfo.monthMoney"
                autocomplete="off"
                class="midleInput"
                placeholder="元/月"
              ></el-input>
              <!-- <span style="margin-left: -700px; margin-right: 10px">元/月</span> -->
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="houseInfo.rentMode" style="width: 100px">
                <el-option
                  v-for="item in rentModes"
                  :key="item.id"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 房屋亮点：独立阳台、独立卫生间、南北通透、首次出租，可增加到房子describe中去 -->

            <el-form-item label="房子亮点" class="mycheckBox">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAllHighlight"
                @change="handleCheckAllHightlightChange"
                style="margin-right: 20px"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group
                v-model="checkedHighlight"
                @change="handleCheckedHighlightChange"
              >
                <el-checkbox v-for="h in highlightOption" :label="h" :key="h">{{
                  h
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <!-- 房子配套 -->
            <el-form-item label="房子配套" class="mycheckBox">
              <el-checkbox
                :indeterminate="isIndeterminate2"
                v-model="checkAllHouseTag"
                @change="handleCheckAllTagChange"
                style="margin-right: 20px"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="checkedTag"
                @change="handleCheckedTagChange"
              >
                <el-checkbox v-for="tag in tags" :label="tag" :key="tag">{{
                  tag
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="房源标题" prop="rentTitle">
              <el-input
                v-model="houseInfo.rentTitle"
                style="width: 400px"
                placeholder="用户可以根据标题搜索到你的房子"
              ></el-input>
            </el-form-item>

            <!-- 房源标题：亮点，有无电梯，n号线 -->
            <el-form-item label="房源内容" prop="rentContent">
              <el-input
                v-model="houseInfo.rentContent"
                style="width: 400px"
                placeholder="可以列出房子的优势，如是否有电梯、靠近的公交、地铁线路等"
              ></el-input>
            </el-form-item>
            <!-- 房源描述 -->
            <el-form-item label="房源描述" prop="houseDescribe">
              <el-input
                type="textarea"
                placeholder="可输入房间描述、小区环境、周边配套、对合租者的要求等信息"
                :autosize="{ minRows: 3 }"
                v-model="houseInfo.houseDescribe"
              ></el-input>
            </el-form-item>
            <!-- 房产证明照片 -->
            <el-form-item label="房产证明照片" required>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleCertificateSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="houseInfo.certificate"
                  :src="houseInfo.certificate"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  请拍摄房产证照片信息并上传，jpg/png格式，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>

            <!-- 房源照片 -->
            <el-form-item label="房源封面图片">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                list-type="picture"
                multiple
              >
                <!-- 单张封面 -->
                <div
                  style="width: 120px; height: 100px; position: relative"
                  class="mydiv"
                  v-if="!houseInfo.houseId && !houseInfo.imgGroup"
                >
                  <template v-if="houseInfo.houseImg">
                    <img :src="houseInfo.houseImg" />

                    <i
                      class="el-icon-close close"
                      style="position: absolute; top: 0; right: 0"
                      @click.stop="deleteHouseImg(houseInfo.houseImg)"
                    ></i>
                  </template>
                </div>
                <!-- 图片组 -->
                <div style="display: flex" v-if="houseInfo.imgGroup != null">
                  <div
                    style="
                      width: 120px;
                      height: 100px;
                      position: relative;
                      margin-right: 5px;
                    "
                    class="mydiv"
                    v-if="img != ''"
                    v-for="img in houseInfo.imgGroup.split(',')"
                    :key="img"
                  >
                    <img :src="img" :id="img" />

                    <i
                      class="el-icon-close close"
                      style="position: absolute; top: 0; right: 0"
                      v-show="img != ''"
                      @click.stop="deleteHouseImg(img)"
                    ></i>
                  </div>
                </div>

                <el-button
                  style="float: left; margin-top: 5px"
                  size="small"
                  type="primary"
                  >点击上传</el-button
                >

                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb(支持多张上传)
                </div>
              </el-upload>
            </el-form-item>
            <!-- 入住时间 -->
            <el-form-item label="入住时间" required>
              <el-date-picker
                v-model="houseInfo.moveIntoTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions0"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item
              label="姓名"
              v-if="!this.houseInfo.houseId"
              prop="contactName"
              required
            >
              <el-input
                v-model="houseInfo.contactName"
                style="width: 120px"
              ></el-input>
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item
              label="联系电话"
              v-if="!this.houseInfo.houseId"
              prop="contactPhoneNumber"
            >
              <el-input
                v-model="houseInfo.contactPhoneNumber"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <!-- 手机验证码 -->
            <el-form-item
              label="手机验证码"
              v-if="!this.houseInfo.houseId"
              required
            >
              <el-input
                v-model="houseInfo.validateCode"
                placeholder="验证码"
                style="width: 120px"
              ></el-input>
              <a
                @click="getCode()"
                type="button"
                :value="code"
                style="
                  border: none;
                  background-color: none;
                  cursor: pointer;
                  margin-left: 10px;
                "
                >{{ code }}</a
              >
            </el-form-item>
            <!-- 我已阅读并同意   -->
            <el-form-item label="">
              <el-checkbox v-model="agree"></el-checkbox>
              <span>我已阅读并同意</span><a href="#">《用户服务协议》</a
              ><a href="#">《隐私权政策》</a><br />
              <el-button
                type="primary"
                style="width: 120px"
                @click="validateForm()"
                >{{ submitBtn }}</el-button
              >
            </el-form-item>

            <!-- 确定发布按钮 -->
          </el-form>
        </div>
      </el-card>
    </template>
  </section>
</template>
<script>
import dictApi from "@/api/dictApi";
import houseApi from "@/api/houseApi";
import cookie from "js-cookie";
import tagApi from "@/api/tag";
//房子亮点、配套数据
const originalHighlights = ["独立阳台", "独立卫生间", "南北通透", "首次出租"];
const originalHouseTag = [
  "热水器",
  "冰箱",
  "电梯",
  "燃气灶",
  "衣柜",
  "洗衣机",
  "智能门锁",
  "油烟机",
  "电视",
  "宽带",
];

export default {
  data() {
    return {
      //选择入住时间限制
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      uploadUrl: "http://localhost:8160/ucenter/ossfile",
      fileList: [],
      userInfo: {},
      houseInfo: {
        houseId: "",
        //出租类型，1合租，2整租
        rentType: "合租",

        //建筑类型，1住宅，2别墅
        buildingType: "住宅",

        //小区名称
        houseName: "测试小区名称",
        //地址 XX市XX区
        city: "北京",
        areaName: "朝阳区",
        //户型 X室、X厅、X卫、x床
        room: "1",
        hall: "1",
        toilet: "1",
        bed: "1",
        // 建筑面积
        area: "200",
        //房子朝向
        direction: "正南",
        // 楼层，X层、共X层
        floor: "1",
        maxFloor: "5",
        // 详细地址
        address: "测试详细地址",
        // 月租金
        monthMoney: "5000",
        // 出租方式：押一付一...
        rentMode: "面议",
        // 房源标题
        rentTitle: "测试标题",
        //房子优势：是否有电梯，附近的亮点
        rentContent: "测试内容",
        // 房源描述
        houseDescribe: "测试描述",
        // 房源照片
        houseImg: "",
        //图片组, 使用,逗号分割
        imgGroup: "",
        // 房子亮点，可以为空,提交数据时将各个亮点组成一个字符串
        highlight: "",
        userId: "",
        // 入住时间
        moveIntoTime: "",
        // 联系人姓名
        contactName: "张先生",
        // 联系电话
        contactPhoneNumber: "18278527715",

        //验证码
        validateCode: "123456",
        rentMonth: 2,
        //房产证图片
        certificate: "",
      },
      rules: {
        houseName: [
          { message: "请输入小区名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],

        room: [
          { required: true, message: "室不能为空" },
          {
            type: "number",
            message: "室必须为数字且值在1~10之间",
            min: 1,
            max: 10,
          },
        ],
        hall: [
          { required: true, message: "厅不能为空" },
          {
            type: "number",
            message: "厅必须为数字且值在1~10之间",
            min: 1,
            max: 10,
          },
        ],
        toilet: [
          { required: true, message: "卫不能为空" },
          {
            type: "number",
            message: "卫必须为数字且值在1~10之间",
            min: 1,
            max: 10,
          },
        ],
        bed: [
          { required: true, message: "床不能为空" },
          {
            type: "number",
            message: "床必须为数字且值在1~10之间",
            min: 1,
            max: 10,
          },
        ],
        rentMonth: [
          { required: true, message: "可出租月数不能为空" },
          {
            type: "number",
            message: "可出租月数必须为数字且值在1~12之间",
            min: 1,
            max: 12,
          },
        ],
        area: [
          { required: true, message: "面积不能为空" },
          {
            type: "number",
            message: "面积必须为数字值且在1到5000之间",
            min: 1,
            max: 5000,
          },
        ],
        floor: [
          { required: true, message: "楼层不能为空" },
          {
            type: "number",
            message: "楼层必须为数字值且在1到30之间",
            min: 1,
            max: 30,
          },
        ],
        maxFloor: [
          { required: true, message: "楼层不能为空" },
          {
            type: "number",
            message: "最大楼层必须为数字值且在1到30之间",
            min: 1,
            max: 30,
          },
        ],
        address: [
          { required: true, message: "请输入小区详细地址", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        monthMoney: [
          { required: true, message: "租金不能为空" },
          {
            type: "number",
            message: "租金必须为数字值且大于100",
            min: 100,
          },
        ],
        rentTitle: [
          { required: true, message: "请输入房源标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        rentContent: [
          { required: true, message: "请输入房源内容", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        houseDescribe: [
          { required: true, message: "请输入房源描述", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
        contactName: [
          { required: true, message: "请输入名字", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "长度在 1 到 8 个字符",
            trigger: "blur",
          },
        ],
        // 联系电话缺陷：类型指定为数字的时候限制不了11位，类型位字符的时候限制不了数字格式
        contactPhoneNumber: [
          { required: true, message: "联系电话不能为空" },
          {
            message: "联系电话必须为数字值且长度为11",
            min: 11,
            max: 11,
          },
        ],
      },
      //房子朝向
      directions: [
        { value: "正南", id: "1" },
        { value: "正北", id: "2" },
        { value: "正东", id: "3" },
        { value: "正西", id: "4" },
        { value: "西北", id: "5" },
        { value: "东北", id: "6" },
        { value: "西南", id: "7" },
        { value: "东南", id: "8" },
      ],
      //出租方式
      rentModes: [
        { value: "押一付一", id: "0" },
        { value: "押一付二", id: "1" },
        { value: "押一付三", id: "2" },
      ],
      //热门城市
      hotCitys: [],
      //地区
      areas: [],

      // 户型
      type: {
        //室
        room: "",
        //厅
        hall: "",
        //卫
        toilet: "",
      },
      //房子亮点
      highlights: [],
      // 亮点全选按钮属性
      checkAllHighlight: false,
      //已选择的元素
      checkedHighlight: ["独立阳台"],
      //多选框全部选项
      highlightOption: originalHighlights,
      isIndeterminate: true,

      //房子配套多选框
      checkAllHouseTag: false,
      //已选择元素
      checkedTag: ["热水器"],
      tags: originalHouseTag,
      isIndeterminate2: true,

      // 发送短信
      code: "发送验证码",
      sending: true,
      second: 300,
      submitBtn: "确定发布",
      imageUrl: "",
      // 同意协议
      agree: false,
    };
  },
  created() {
    //获取所有配套信息
    // tagApi.getAllTags().then((respones) => {
    //   this.tags = respones.data.data.tags;
    //   this.originalHouseTag = this.tags;
    // });
    //修改
    if (this.$route.query.id) {
      this.houseInfo.houseId = this.$route.query.id;
      this.getHouseInfoById(this.houseInfo.houseId);
    }
  },
  methods: {
    //根据id获取房子信息
    getHouseInfoById(id) {
      //修改按钮
      this.submitBtn = "确定修改";
      houseApi.getHouseInfoById(id).then((response) => {
        this.houseInfo = response.data.data.houseInfo;
        //建筑类型、整租或合租修改

        //提取字符中的数字

        //室、厅包装
        var str = this.houseInfo.houseType.match(/\d+(\.\d+)?/g);
        console.log(str);
        // this.houseInfo.room = +str[0];
        // this.houseInfo.hall = +str[1];

        //获取房子的配套数组、床卫数量
        houseApi.getHouseTags(this.houseInfo.houseId).then((response) => {
          var res = response.data.data;
          console.log("res:");
          console.log(res);
          if (res.bedNum) {
            this.houseInfo.bed = res.bedNum;
          } else {
            this.houseInfo.bed = 1;
          }
          if (res.toiletNum) {
            this.houseInfo.toilet = res.toiletNum;
          } else {
            this.houseInfo.toilet = 1;
          }
          this.checkedTag = res.tags;
        });
        //亮点选择
        this.checkedHighlight = this.houseInfo.highlight.split(",");
        console.log("imgGroup:");
        console.log(this.houseInfo.imgGroup);
      });
    },

    //判断是否已经登录,设置用户id
    isLogin() {
      try {
        if (cookie.get("userInfo")) {
          this.userInfo = JSON.parse(cookie.get("userInfo"));
          console.log(user);
        } else {
          this.$message.error("请先进行登录");
          return false;
        }
      } catch (error) {
        console.log(error);
      }
      //房子更改操作
      console.log(this.houseInfo.houseId);
      if (this.houseInfo.houseId != "" && this.houseInfo.houseId != null) {
        //当前登录用户不是该房子的所属用户
        if (this.houseInfo.userId != this.userInfo.userId) {
          this.$message.error("不能修改他人的房源信息");
          return false;
        }

        return true;
      }
      //房子插入操作
      else {
        this.houseInfo.userId = this.userInfo.userId;
        return true;
      }
    },

    //更新
    updateHouseInfo() {
      var tags = this.prePackage();
      houseApi
        .publishOrUpdateHouseInfo(this.houseInfo, tags)
        .then((response) => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "修改房子信息成功，等待审核",
            });
            //返回我的房子
            this.$route.push({ path: "/myHouse" });
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    //发布、插入
    publish() {
      //封装数据
      var tags = this.prePackage();
      houseApi
        .publishOrUpdateHouseInfo(this.houseInfo, tags)
        .then((response) => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "发布成功，等待审核",
            });

            //清空
            this.$router.push({ path: "/myHouse" });
          } else {
            this.$message.error(response.data.message);
          }
        });
    },
    //封装数据
    prePackage() {
      //封装户型
      var houseType =
        this.houseInfo.room +
        "室" +
        this.houseInfo.hall +
        "厅" +
        this.houseInfo.toilet +
        "卫";

      this.houseInfo.houseType = houseType;
      //封装选择的配套
      var tags = "";
      for (let index = this.checkedTag.length - 1; index >= 0; index--) {
        const element = this.checkedTag[index];
        tags += element + ",";
      }
      //连接户型里面的床数和卫数
      // tags += this.houseInfo.toilet + "," + this.houseInfo.bed;

      //封装亮点
      for (let index = 0; index < this.checkedHighlight.length; index++) {
        const element = this.checkedHighlight[index];
        this.houseInfo.highlight += element + ",";
      }
      //将图片组的第一张照片作为房子的封面
      console.log("fileList:");
      console.log(this.fileList.length);
      if (this.fileList.length == 1) {
        console.log(this.houseInfo);
        this.houseInfo.houseImg = this.imgGroup;
      } else if (this.fileList.length > 1) {
        if (this.houseInfo.imgGroup) {
          this.houseInfo.houseImg = this.houseInfo.imgGroup.split(",")[0];
          console.log("imgGroup:" + this.houseInfo.imgGroup);
          console.log(
            "imgGroup split:" + this.houseInfo.imgGroup.split(",")[0]
          );
        }
      }

      console.log("亮点" + this.houseInfo.highlight);
      console.log("准备插入的房源信息：");
      console.log(this.houseInfo);
      return tags;
    },
    //校验表单
    validateForm() {
      if (!this.isLogin()) {
        return;
      }

      console.log("用户id：" + this.houseInfo.userId);

      // 非0正整数
      var regex1 = /^[1-9]\d*$/;
      var houseInfo = this.houseInfo;
      if (houseInfo.houseName == "" || houseInfo.houseName.length > 20) {
        this.$message.error("小区名称在1~20各字符之间 且不能为空");
        return;
      }
      if (houseInfo.city == "") {
        this.$message.error("城市不能为空");
        return;
      }
      if (houseInfo.areaName == "" || houseInfo.areaName == "全部") {
        this.$message.error("地区不能为空");
        return;
      }
      if (
        houseInfo.rentMonth == "" ||
        !regex1.test(houseInfo.rentMonth) ||
        houseInfo.rentMonth < 1 ||
        houseInfo.rentMonth > 12
      ) {
        this.$message.error("可出租月数为数字1~12之间 且不能为空");
        return;
      }
      if (
        houseInfo.hall == "" ||
        houseInfo.hall > 10 ||
        houseInfo.hall < 1 ||
        !regex1.test(houseInfo.hall) ||
        houseInfo.room == "" ||
        houseInfo.room > 10 ||
        houseInfo.room < 1 ||
        !regex1.test(houseInfo.room) ||
        houseInfo.toilet == "" ||
        houseInfo.toilet > 10 ||
        houseInfo.toilet < 1 ||
        houseInfo.bed == "" ||
        houseInfo.bed > 10 ||
        houseInfo.bed < 1 ||
        !regex1.test(houseInfo.toilet || houseInfo.hall || houseInfo.bed)
      ) {
        this.$message.error("户型为数字1~10之间 且不能为空");
        return;
      }

      if (
        !regex1.test(houseInfo.area) ||
        houseInfo.area > 5000 ||
        houseInfo.area < 1 ||
        houseInfo.area == ""
      ) {
        this.$message.error("面积为数字且范围1~5000之间");
        return;
      }
      if (houseInfo.direction == "") {
        this.$message.error("房子朝向不能为空");
        return;
      }
      // 楼层判断
      if (
        !regex1.test(houseInfo.floor) ||
        !regex1.test(houseInfo.maxFloor) ||
        houseInfo.floor == "" ||
        houseInfo.maxFloor == "" ||
        houseInfo.floor < 1 ||
        houseInfo.floor > 30 ||
        houseInfo.maxFloor < 1 ||
        houseInfo.maxFloor > 30
      ) {
        this.$message.error("楼层为数字1~30之间 且不能为空");
        return;
      } else if (houseInfo.floor > houseInfo.maxFloor) {
        this.$message.error("居住楼层不能大于最大楼层");
        return;
      }
      //小区详细地址判断
      if (houseInfo.address == "" || houseInfo.address.length > 30) {
        this.$message.error("小区详细地址范围在1~30个字符 且不能为空");
        return;
      }
      //租金判断
      if (
        !regex1.test(houseInfo.monthMoney) ||
        houseInfo.monthMoney < 100 ||
        houseInfo.monthMoney > 100000
      ) {
        this.$message.error("租金为数字范围在100~100000之间 且不能为空");
        return;
      }
      //房源内容判断
      if (
        houseInfo.rentTitle == "" ||
        houseInfo.rentTitle.length > 20 ||
        houseInfo.rentTitle.length < 1
      ) {
        this.$message.error("房源标题范围在1~20个字符 且不能为空");
        return;
      }
      //房源内容判断
      if (
        houseInfo.rentContent == "" ||
        houseInfo.rentContent.length > 20 ||
        houseInfo.rentContent.length < 1
      ) {
        this.$message.error("房源内容范围在1~20个字符 且不能为空");
        return;
      }
      // 房源描述判断
      if (
        houseInfo.houseDescribe == "" ||
        houseInfo.houseDescribe.length < 1 ||
        houseInfo.houseDescribe.length > 200
      ) {
        this.$message.error("房源描述范围在1~200个字符 且不能为空");
        return;
      }
      // 房产证明判断
      if (houseInfo.certificate == "") {
        this.$message.error("请上传房产证明照片");
        return;
      }

      //入住时间判断
      if (houseInfo.moveIntoTime == "") {
        this.$message.error("入住时间不能为空");
        return;
      }

      // 姓名判断
      if (
        houseInfo.contactName == "" ||
        houseInfo.contactName.length < 1 ||
        houseInfo.contactName.length > 8
      ) {
        this.$message.error("联系人姓名范围在1~8个字符 且不能为空");
        return;
      }
      var p1 = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      // 联系电话判断
      if (
        houseInfo.contactPhoneNumber == "" ||
        !p1.test(houseInfo.contactPhoneNumber)
      ) {
        this.$message.error("请输入正确的手机号");
        return;
      }

      // 验证码判断
      if (
        !houseInfo.houseId &&
        (houseInfo.validateCode == "" ||
          !regex1.test(houseInfo.validateCode) ||
          houseInfo.validateCode.length != 6)
      ) {
        this.$message.error("验证码需要为6位数字 且不能为空");
        return;
      }
      //同意协议判断
      if (!this.agree) {
        this.$message.error("请阅读协议并勾选同意");
        return;
      }
      if (houseInfo.houseId) {
        this.updateHouseInfo();
      } else {
        this.publish();
      }
    },
    // //点击发送验证码
    getCode() {
      //校验是否输入了手机号
      if (!this.sending) {
        return;
      }
      this.sending = false;
      //判断手机号是否合规
      var p1 = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (!p1.test(this.houseInfo.contactPhoneNumber)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      //调用发送短信接口;
      userApi
        .sendPhoneMessage(this.userInfo.username, this.registerMode)
        .then((response) => {
          console.log(this.userInfo.username);
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "请注意接收短信",
            });
            //倒计时显示
            this.timeDown();
          } else {
            this.$message.error("发送短信失败:" + response.data.data.message);
          }
        });
    },
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        //秒数赋值给code
        this.code = this.second;

        //时间结束，即可再次发送
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          this.second = 120;
          this.code = "获取验证码";
        }
      }, 1000);
    },
    //自定义样式删除图片
    deleteHouseImg(url) {
      this.houseInfo.imgGroup = this.houseInfo.imgGroup.replace(url, ",");
      var arr = this.houseInfo.imgGroup.split(",");
      console.log("imgGroup:");
      console.log(this.houseInfo.imgGroup);
      console.log(arr);
    },
    // element组件删除图片
    handleRemove(file, fileList) {
      console.log(file);

      this.houseInfo.imgGroup = this.houseInfo.imgGroup.replace(
        file.response.data.url,
        ","
      );
    },
    handlePreview(file) {
      console.log(file);
    },
    // 房产证上传成功
    handleCertificateSuccess(res, file) {
      this.houseInfo.certificate = res.data.url;
    },
    handleAvatarSuccess(res, file) {
      //上传成功一个，就加入url
      if (this.houseInfo.imgGroup == "" || this.houseInfo.imgGroup == null) {
        this.houseInfo.imgGroup = res.data.url;
        this.houseInfo.houseImg = res.data.url;
      } else {
        this.houseInfo.imgGroup = this.houseInfo.imgGroup + "," + res.data.url;
      }
      console.log("imgGroup:");
      console.log(this.houseInfo.imgGroup);
      // var temp = this.houseInfo.imgGroup.split(",");
      // for (let index = 0; index < temp.length; index++) {
      //   console.log(temp[index]);
      // }
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 亮点多选框
    //亮点全选按钮事件
    handleCheckAllHightlightChange(val) {
      this.checkedHighlight = val ? originalHighlights : [];
      this.isIndeterminate = false;
    },
    //判断全选逻辑
    handleCheckedHighlightChange(value) {
      let checkedCount = value.length;
      this.checkAllHighlight = checkedCount === this.highlightOption.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.highlightOption.length;
    },
    // 房子配套多选框
    handleCheckAllTagChange(val) {
      this.checkedTag = val ? originalHouseTag : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedTagChange(value) {
      let checkedCount = value.length;
      this.checkAllHouseTag = checkedCount === this.tags.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.tags.length;
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
  },
  mounted() {
    this.hotCitys = this.loadAllCity();
  },
  watch: {
    // 监听城市输入框
    "houseInfo.city": {
      handler: function () {
        //清除地区
        if (this.houseInfo.city == null || this.houseInfo.city == "") {
          this.areas = [];
          this.houseInfo.areaName = "";
        } else {
          dictApi.getChildrenArea(this.houseInfo.city).then((response) => {
            this.areas = response.data.data.areas;
            //设置默认第一个县/区
            if (!this.houseInfo.houseId) {
              this.houseInfo.areaName = "全部";
            }
          });
        }
      },
    },
    deep: true,
  },
};
</script>

<style >
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* 卡片 */
.box-card {
  margin-top: 10px;
  margin-left: 10%;
  width: 80%;
}
/* 表单 */
.form {
  margin-left: 20%;
}
/* 去掉单选框的⚪ */
.el-radio__inner {
  display: none;
}
/* 户型区域开始 */
.houseType > .el-form-item__content {
  display: flex;
}
.myspan {
  margin-left: -70px;
}
/* 后台选择器 */
.miniInput > .el-input__inner {
  width: 60px;
}
.midleInput > .el-input__inner {
  width: 100px;
}
/* 户型区域结束 */

/* 亮点全选框 */
.mycheckBox > .el-form-item__content {
  display: flex;
}

/* 上传图片的格式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 隐藏上传 ：无用处*/
.el-button + .el-upload__input {
  display: none;
}

/* 图片带删除 */
.mydiv img {
  width: 120px;
  height: 100px;
}
/* 隐藏element组件添加图片成功提示 */
.el-upload-list {
  display: none;
}
/* 隐藏 上传 未选择文件 */
.el-upload--text > .el-upload__input {
  display: none;
}
.el-upload__tip {
  color: darkgray;
}
</style>
