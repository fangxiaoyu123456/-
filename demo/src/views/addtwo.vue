<template>
    <div>
        <el-button class="btn" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="家教管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-input v-model="form.img" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="机构图片" :label-width="formLabelWidth">
                    <el-input v-model="form.teacherImg" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="报名人数" :label-width="formLabelWidth">
                    <el-input v-model="form.num" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">添 加</el-button>
            </div>
        </el-dialog>

        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column type="index" width="100" label="序号"></el-table-column>
            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="num" label="报名人数" width="180"></el-table-column>
            <el-table-column label="授课机构">
                <template slot-scope="scope">
                    <img :src="scope.row.teacherImg" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
            form: {
                img: "",
                teacherImg: "",
                num: ""
            },
            tableData: [],
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: "120px"
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$axios({
                url: API.teacherTop,
                method: "get"
            }).then(res => {
                this.tableData = res.data.data;
            });
        },
        add() {
            this.$axios({
                url: API.addTeacherTop,
                method: "get",
                params: this.form
            }).then(res => {
                if (res.data.isok) {
                    this.dialogFormVisible = false;
                    this.init();
                    this.$message({
                        message: res.data.info,
                        type: "success"
                    });
                } else {
                    this.$message.error(res.data.info);
                }
            });
        },
        handleDelete(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$axios({
                        url: API.delTeacherTop,
                        method: "get",
                        params: {
                            id: id
                        }
                    }).then(res => {
                        this.init();
                        this.$message({
                            type: "success",
                            message: res.data.info
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: res.data.info
                    });
                });
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

img {
    width: 180px;
}
</style>