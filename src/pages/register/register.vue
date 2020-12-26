<template>
  <div id="reg">
    <div id="reg-box">
      <h1>Register</h1>
      <div class="form">
        <div class="item">
          <input type="text" placeholder="电脑型号" v-model="computer" />
        </div>
        <div class="item">
          <input type="text" placeholder="电脑问题" v-model="problem" />
        </div>
        <div class="item">
          <input type="text" placeholder="处理人" v-model="charge" />
        </div>
        <i-rate @change="onChange" :value="starIndex"> </i-rate>
      </div>
      <button @click="submit">Register</button>
      <i-toast ref="toast"></i-toast>
    </div>
  </div>
</template>
<script>
import mpButton from "mpvue-weui/src/button";
import mpInput from "mpvue-weui/src/input";
import iRate from "iview-mpvue/dist/components/rate/rate";
import { $Toast } from "iview-mpvue/dist/components/base";
import iToast from "iview-mpvue/dist/components/toast/toast";
import { post } from "../../utils";
import {date} from "../../utils";
export default {
  data() {
    return {
      register: {},
      computer: "",
      problem: "",
      charge: "",
      starIndex: 5,
    };
  },
  components: {
    mpButton,
    mpInput,
    "i-rate": iRate,
    "i-toast": iToast,
  },
  methods: {
    submit() {
      let that = this;
      console.log("点击");
      if (that.computer == "") {
        console.log("电脑型号不能为空");
        $Toast(this, {
          content: "电脑型号不能为空",
          type: "warning",
        });
      } else if (that.problem == "") {
        console.log("电脑问题不能为空");
        $Toast(this, {
          content: "电脑问题不能为空",
          type: "warning",
        });
      } else if (that.charge == "") {
        console.log("处理人不能为空");
        $Toast(this, {
          content: "处理人不能为空",
          type: "warning",
        });
      } else {
        const userInfo = wx.getStorageSync("userInfo");
        const newStudent = wx.getStorageSync("newStudent");
        that.register.computer = that.computer;
        that.register.problem = that.problem;
        that.register.charge = that.charge;
        that.register.goal = that.starIndex;
        that.register.id = newStudent.id;
        that.register.name = newStudent.name;
        that.register.openid = userInfo.openId;
        that.register.date = date()
        console.log(that.register);
        const data = that.register;
        try {
          const res = post("/weapp/register", data);
          console.log("后端信息是：", res);
          $Toast(this, {
            content: "登记成功",
            type: "success",
          });
        } catch (e) {
          console.log("后端信息是：", e);
          $Toast(this, {
            content: "登记失败",
            type: "warning",
          });
        }
      }
    },

    onChange(e) {
      if (this.charge == "王歧伟") {
        this.starIndex = 5;
      } else {
        this.starIndex = e.index;
      }
    },
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
  margin-top: 50%;
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
