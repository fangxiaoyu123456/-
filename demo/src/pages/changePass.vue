<template>
    <div>
        <el-form :model="pass" class="box">
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input
                    disabled
                    style="margin-left:110px"
                    placeholder="请输入账号"
                    v-model="pass.name"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="原始密码" :label-width="formLabelWidth">
                <el-input
                    style="margin-left:110px"
                    v-model="pass.oldpass"
                    autocomplete="off"
                    placeholder="请输入原始密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input
                    v-model="pass.newpass"
                    style="margin-left:110px"
                    autocomplete="off"
                    placeholder="请输入新密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input
                    v-model="confirm"
                    style="margin-left:110px"
                    autocomplete="off"
                    placeholder="请确认密码"
                ></el-input>
            </el-form-item>
            <div class="wrap">
                <el-button @click="change">修改</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data() {
        return {
            formLabelWidth: "90px",
            pass: {
                name: sessionStorage.getItem('isName'),
                oldpass: "",
                newpass: ""
            },
            formLabelWidth: "130px",
            confirm: ""
        };
    },
    methods: {
        change() {
            if (this.pass.newpass == this.confirm) {
                this.$axios({
                    url: API.changePassManage,
                    method: "post",
                    data: this.pass
                }).then(res => {
                    if (res.data.isok) {
                        this.$message({
                            message: res.data.info,
                            type: "success"
                        });
                        this.$router.replace("/index");
                    } else {
                        this.$message.error(res.data.info);
                    }
                });
            }else{
                this.$message.error("密码错误");
            }
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.box {
    width: 80%;
}

.wrap {
    text-align: center;
}
</style>