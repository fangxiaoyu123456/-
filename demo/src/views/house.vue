<template>
    <div>
        <el-button @click="dialogFormVisible = true">添加</el-button>

        <el-dialog title="家政banner" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-input v-model="form.img" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">添 加</el-button>
            </div>
        </el-dialog>

        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column type="index" label="序号" width="300"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <v-del :idx="scope.row.id" @shanchu="del"></v-del>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    data() {
        return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                img: ""
            },
            formLabelWidth: "120px",
            tableData: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$axios({
                url: API.homeBanner,
                method: "get"
            }).then(res => {
                this.tableData = res.data.data;
            });
        },
        del(id) {
            this.$axios({
                url: API.delHomeBanner,
                method: "get",
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data.isok) {
                    this.$message({
                        message: res.data.info,
                        type: "success"
                    });
                    this.init();
                } else {
                    this.$message.error(res.data.info);
                }
            });
        },
        add() {
            this.$axios({
                url: API.addHomeBanner,
                method: "get",
                params:this.form
            }).then(res => {
                if (res.data.isok) {
                    this.$message({
                        message: res.data.info,
                        type: "success"
                    });
                    this.init();
                    this.dialogFormVisible = false
                }else{
                    this.$message.error(res.data.info);
                }
            });
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

img {
    width: 200px;
    height: 100px;
}
</style>