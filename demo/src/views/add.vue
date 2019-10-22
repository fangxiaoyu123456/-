<template>
    <div>
        <el-button class="btn" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="家教管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-input v-model="form.img" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">添 加</el-button>
            </div>
        </el-dialog>

        <el-table :data="tableData" height="250" border style="width: 100%;margin:20px auto">
            <el-table-column type="index" label="序号" width="220"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt />
                </template>
            </el-table-column>
            <el-table-column prop="des" label="描述"></el-table-column>
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
                des: ""
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
                url: API.teacherBanner,
                method: "get"
            }).then(res => {
                this.tableData = res.data.data;
            });
        },
        add() {
            this.$axios({
                url: API.addTeacherBanner,
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
                        url: API.delTeacherBanner,
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