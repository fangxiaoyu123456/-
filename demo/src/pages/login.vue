<template>
  <div class="wrap">
    <div class="box">
      <h3>登录</h3>
      <el-select v-model="user.type" placeholder="请选择角色" class="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="user.name" placeholder="请输入内容" class="select"></el-input>
      <el-input placeholder="请输入密码" v-model="user.pass" clearable show-password class="select"></el-input>
      <div class="btn">
        <el-button type="success" :path="true" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../common/js/api";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      user: {
        type: "",
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    login() {
      //   console.log(this.user);
      this.$axios({
        url: API.login,
        method: "post",
        data: this.user
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.$router.push("/index");
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.wrap {
  height: 100vh;
  background: $color1;

  .box {
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 20px;
    left: 0;
    top: 0;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: auto;

    h3 {
      font-size: 40px;
      color: $color1;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .select {
      width: 80%;
      margin: 10px auto;
      display: block;
    }

    .btn {
      text-align: center;
    }
  }
}
</style>