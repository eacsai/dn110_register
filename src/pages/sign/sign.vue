<template>
  <div>
    <div class="stars">
      <div
        v-for="(item, index) in starsCount"
        :key="index"
        class="star"
        ref="star"
      ></div>
    </div>
    <button @click="scanCode">Register</button>
    <i-toast ref="toast"></i-toast>
  </div>
</template>

<script>
import { $Toast } from "iview-mpvue/dist/components/base";
import iToast from "iview-mpvue/dist/components/toast/toast";
import { post } from "../../utils";
import { date } from "../../utils";
export default {
  data() {
    return {
      sign: {},
      starsCount: 800, //星星数量
      distance: 800, //间距
    };
  },
  components: {
    "i-toast": iToast,
  },
  methods: {
    scanCode() {
      var that = this;
      wx.scanCode({
        success(res) {
          let currentdate = date();

          if (res.result == currentdate) {
            const userInfo = wx.getStorageSync("userInfo");
            const newStudent = wx.getStorageSync("newStudent");
            that.sign.id = newStudent.id;
            that.sign.name = newStudent.name;
            that.sign.openid = userInfo.openId;
            that.sign.date = date();
            console.log(that.sign);
            const data = that.sign;

            try {
              const res = post("/weapp/sign", data);
              console.log(JSON.stringify(res));
              console.log("后端信息是：", res);
              wx.showToast({
                title: "成功",
                icon: "success",
                duration: 2000,
              });
            } catch (e) {
              console.log("后端信息是：", e);
              wx.showToast({
                title: "失败",
                icon: "fail",
                duration: 2000,
              });
            }
          } else {
            console.log("扫码失败");
            wx.showToast({
              title: "失败",
              icon: "fail",
              duration: 2000,
            });
          }
        },
      });
    },
  },
};
</script>

<style>
page {
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92);
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow: hidden;
}

button {
  margin-top: 85%;
  padding-top: 55px;
  width: 180px;
  height: 150px;
  color: #fff;
  border-radius: 27px;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  background-image: linear-gradient(15deg, #f7f7b6 0%, #e96f98 100%);
  animation: rubberBand 1s;
}

@keyframes rubberBand {
  0% {
    transform: scale3d(1, 1, 1);
  }
  35% {
    transform: scale3d(1.25, 0.75, 1);
  }
  45% {
    transform: scale3d(0.75, 1, 1);
  }
  60% {
    transform: scale3d(1.2, 0.8, 1);
  }
  75% {
    transform: scale3d(1.05, 1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}
.star {
  width: 2px;
  height: 2px;
  background: #f7f7b6;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}
</style>
