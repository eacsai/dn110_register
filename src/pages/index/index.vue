<template>
  <div id="reg">
    <div id="reg-box">
      <h1>Register</h1>
      <div class="form">
        <div class="item">
          <input
            type="text"
            placeholder="姓名"
            v-model="name"
            style="display: inline-block"
          />
        </div>
        <div class="item">
          <i></i>
          <input type="text" placeholder="学号" v-model="id" />
        </div>
      </div>
      <button
        open-type="getUserInfo"
        lang="zh_CN"
        class="btn"
        @getuserinfo="login"
      >
        Register
      </button>
    </div>
  </div>
</template>
<script>
import config from "../config";
import qcloud from "wafer2-client-sdk";
import mpButton from "mpvue-weui/src/button";
import mpInput from "mpvue-weui/src/input";
import iToast from "iview-mpvue/dist/components/toast/toast";
import { $Toast } from "iview-mpvue/dist/components/base";
import icon from "iview-mpvue/dist/components/icon/icon";

export default {
  data() {
    return {
      newStudent: {},
      userInfo: {},
      name: "",
      id: "",
    };
  },
  components: {
    mpButton,
    mpInput,

    "i-toast": iToast,
    "i-icon": icon,
  },
  methods: {
    login() {
      var that = this;
      console.log(config.loginUrl);
      wx.login({
        success: (res) => {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.userInfo = res.userInfo;
              that.userInfo.openId = res.userInfo.nickName+res.userInfo.avatarUrl
              console.log("微信授权成功", that.userInfo);
              if (that.name.length == "") {
                console.log("姓名不能为空");
                wx.showToast({
                  title: "姓名不能为空",
                  image: "/static/images/error.png",
                  duration: 2000,
                  mask: false,
                });
              } else if (that.id.length < 9) {
                console.log("学号不正确");
                wx.showToast({
                  title: "学号不正确",
                  image: "/static/images/error.png",
                  duration: 2000,
                  mask: false,
                });
              } else {
                that.newStudent.name = that.name;
                that.newStudent.id = that.id;
                console.log(that.newStudent);
                wx.setStorageSync("userInfo", that.userInfo);
                wx.setStorageSync("newStudent", that.newStudent);
                wx.switchTab({
                  url: "/pages/register/main",
                });
              }
            },
          });
        },
        fail: (err) => {
          console.log("登陆失败", err);
        },
      });
    },
  },
  mounted() {
    const userInfo = wx.getStorageSync("userInfo");
    const newStudent = wx.getStorageSync("newStudent");
    if (userInfo.openId && newStudent.name && newStudent.id) {
      this.userInfo = userInfo;
      this.newStudent = newStudent;
      console.log("已经登陆");
      wx.switchTab({
        url: "/pages/register/main",
      });
    } else {
      console.log(newStudent);
      console.log("还未登陆");
    }
  },
};
</script>

<style>
page {
  background-image: url("https://tva1.sinaimg.cn/large/0081Kckwly1glvpj3rug2j31hc0u04ft.jpg");
  background-repeat: no-repeat;
}
#reg-box {
  width: 60%;
  height: auto;
  /* border: 1px solid #000; */
  margin: 0 auto;
  margin-top: 60%;
  text-align: center;
  background: #00000060;
  padding: 30px;
}
#reg-box h1 {
  color: #fff;
}
#reg-box .form .item {
  margin-top: 13px;
}
#reg-box .form .item input {
  width: 200px;
  font-size: 16px;
  border: 0;
  border-bottom: 2px solid #fff;
  padding: 4px 10px;
  background: #ffffff00;
  color: #fff;
}
#reg-box button {
  margin-top: 8px;
  height: 35px;
  width: 120px;
  font-size: 16px;
  font-weight: 500;
  vertical-align: middle;
  text-align: center;
  padding-top: 0.1px;
  border: 0;
  color: #fff;
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
</style>
