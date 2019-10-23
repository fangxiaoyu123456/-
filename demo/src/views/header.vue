<template>
    <div class="header">
        <el-button type="warning" plain class="btn" @click="exit">退出登录</el-button>
        <h3 class="username">{{name}}</h3>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data(){
        return{
            name:sessionStorage.getItem('isName')
        }
    },
    methods: {
        exit() {
            this.$axios({
                url: API.exit,
                method: "get"
            }).then(res => {
                this.$message({
                    message: res.data.info,
                    type: "success"
                });
                this.$router.replace('/login')
            });
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.header {
    background: $color2;
    height: 80px;
    width: 100%;

    .btn {
        float: right;
        margin-top: 20px;
        margin-right: 50px;
    }

    .username {
        float: right;
        height: 80px;
        line-height: 80px;
        color: $color3;
        font-size: 30px;
        margin-right: 50px;
    }
}
</style>