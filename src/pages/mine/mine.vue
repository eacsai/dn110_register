<template>
  <div>
    <div class="top">
      <div class="userinfo">
        <!-- 取userinfo变量中的avatarUrl字段，也就是微信头像的链接 -->
        <img :src="userInfo.avatarUrl" alt="" />
      </div>
      <div class="name">
        <!-- 取userinfo变量中的nickName字段，也就是微信昵称 -->
        <label>{{ userInfo.nickName }}</label>
        <p class="notice">{{ newStudent.name }}</p>
      </div>
    </div>
    <div class="contain">
      <template v-for="item in registerInfo">
        <i-card
          :key="item.date"
          :title="item.date"
          :extra="item.problem"
          thumb="https://api.dujin.org/bing/1366.php"
        >
          <view slot="content">
            <i-tag i-class="tags" name="义诊" color="red" type="border"> 义诊 </i-tag>
          </view>
        </i-card>
      </template>
            <template v-for="item in signInfo">
        <i-card
          :key="item.date"
          :title="item.date"
          thumb="https://api.dujin.org/bing/1366.php"
        >
          <view slot="content">
            <i-tag i-class="i-tags" name="签到" color="blue"> 签到 </i-tag>
          </view>
        </i-card>
      </template>
    </div>
  </div>
</template>

<script>
import iCard from "iview-mpvue/dist/components/card/card";
import iCellGroup from "iview-mpvue/dist/components/cell-group/cell-group";
import iCell from "iview-mpvue/dist/components/cell/cell";
import iTag from "iview-mpvue/dist/components/tag/tag";
import Viewer from "v-viewer"

import { get } from "../../utils";
export default {
  components: {
    "i-card": iCard,
    "i-cell-group": iCellGroup,
    "i-cell": iCell,
    "i-tag": iTag,
  },
  data() {
    return {
      userInfo: {},
      registerInfo: {},
      signInfo:{},
      newStudent: {},
    };
  },
  methods: {
    async getInfo() {
      console.log(this.userInfo.openId)
      var that = this;
      try {
        const res = await get("/weapp/getInfo", {
          openid: this.userInfo.openId,
        });
        console.log("=========res============",res)
        that.registerInfo = res.data.data.records;

        console.log(that.registerInfo);
        console.log("register后段数据", res.data.data);
      } catch (e) {
        console.log("register后段错误信息：", e);
      }
      try {
        const res1 = await get("/weapp/signInfo", {
          openid: this.userInfo.openId,
        });
        that.signInfo = res1.data.data.records;

        console.log(that.signInfo);
        console.log("sign后段数据", res1.data.data);
      } catch (e) {
        console.log("sign后段错误信息：", e);
      }
    },
  },
  mounted() {
    this.userInfo = wx.getStorageSync("userInfo");
    this.newStudent = wx.getStorageSync("newStudent");
    if (this.userInfo.openId && this.newStudent) {
      console.log("=======userInfo=========",this.userInfo);
      this.getInfo();
    }
  },
  onShow() {
    this.getInfo();
  },
};
</script>

<style>
.top {
  height: 120px;
  width: 100%;
  background-image: url("https://api.dujin.org/bing/m.php");
  padding-top: 30px;
  display: block;
}

.top .userinfo {
  padding-bottom: 5px;
  float: left;
}

.top .userinfo img {
  width: 120rpx;
  height: 120rpx;
  margin: 10rpx;
  border-radius: 50%;
  border: 1px #d0d0d0 solid;
}

.top .name {
  padding-top: 30px;
  padding-left: 5px;
  color: #ffffff;
  font-size: 16px;
  float: left;
}

.top .name .notice {
  color: #d8d8d8;
  font-size: 12px;
}

.top .name .notice .number {
  font-size: 15px;
  color: #ffffff;
  font-weight: bold;
}

.top .name .a-line {
  background: #ea5149;
  border: none;
  display: inline;
  font-size: 16px;
  color: #ffffff;
  text-decoration: underline;
}
.contain {
  margin-top: 10px;
  background: #ffffff;
  font-size: 15px;
}

.contain .card {
  padding: 10px 8px 35px 8px;
  margin: 10px 8px 85px 8px;
  border-bottom: 1px #e8e8e8 solid;
  height: 55px;
  line-height: 55px;
}

.contain .row .img {
  float: left;
  width: 20px;
  height: 20px;
  padding-top: 16px;
}

.contain .row .name {
  float: left;
}

.contain .right {
  float: right;
  color: #c8c8c8;
  line-height: 55px;
}

.contain .left {
  width: 80%;
}
</style>