<template>
    <div class="wrap">
        <el-tabs>
            <!-- 维修 -->
            <el-tab-pane label="维修">
                <el-button @click="wellAdd">添加</el-button>
                <el-dialog title="添加维修" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="评分" :label-width="formLabelWidth">
                            <el-input v-model="form.score" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-input v-model="form.type" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="点赞数量" :label-width="formLabelWidth">
                            <el-input v-model="form.likeNum" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="关注人数" :label-width="formLabelWidth">
                            <el-input v-model="form.readNum" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商家地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="距离" :label-width="formLabelWidth">
                            <el-input v-model="form.len" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商家信息" :label-width="formLabelWidth">
                            <el-input v-model="form.info" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" :label-width="formLabelWidth">
                            <el-input v-model="form.tel" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="add(0)" v-if="id==0">添 加</el-button>
                        <el-button type="primary" @click="update" v-if="id!=0">修改</el-button>
                    </div>
                </el-dialog>

                <el-table :data="tableData" height="250" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="180"></el-table-column>
                    <el-table-column prop="name" label="水站名称" width="180"></el-table-column>
                    <el-table-column prop="tel" label="电话" width="180"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn" @click="handleEdit(scope.row.id)">编辑</el-button>
                            <v-del class="btn" :idx="scope.row.id" @shanchu="del"></v-del>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- 维修评论 -->
            <el-tab-pane label="维修评论">
                <el-select v-model="value" class="box" placeholder="请选择">
                    <el-option label="全部" value></el-option>
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-table
                    :data="tableData1"
                    height="250"
                    border
                    style="width: 100%;margin:20px auto"
                >
                    <el-table-column type="index" label="序号" width="180"></el-table-column>
                    <el-table-column prop="name" label="用户名称" width="180"></el-table-column>
                    <el-table-column prop="content" label="评论内容" width="180"></el-table-column>
                    <el-table-column prop="time" label="时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.time|transTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <v-del class="btn" :idx="scope.row.id" @shanchu="delet"></v-del>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
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
                name: "",
                score: "",
                type: "",
                address: "",
                tel: "",
                len: "",
                likeNum: "",
                readNum: "",
                info: ""
            },
            id: "",
            formLabelWidth: "120px",
            tableData: [],
            options: [],
            value: "",
            tableData1: []
        };
    },
    mounted() {
        this.init();
        this.init1();
    },
    methods: {
        dell(scope) {
            console.log(scope);
        },
        //维修
        init() {
            this.$axios({
                url: API.findRepair,
                method: "get"
            }).then(res => {
                this.tableData = res.data.data;
                this.options = res.data.data;
            });
        },
        // 评论
        init1() {
            this.$axios({
                url: API.findRepairComment,
                method: "get"
            }).then(res => {
                this.tableData1 = res.data.data;
            });
        },
        del(id) {
            this.$axios({
                url: API.delRepair,
                method: "get",
                params: {
                    id: id
                }
            })
                .then(res => {
                    if (res.data.isok) {
                        this.$message({
                            message: res.data.info,
                            type: "success"
                        });
                        this.init();
                    }
                })
                .catch(err => {
                    this.$message.error(res.data.info);
                });
        },
        delet(id) {
            this.$axios({
                url: API.delRepairComment,
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
                    this.init1()
                }else{
                    this.$message.error(res.data.info);
                }
            });
        },
        add(id) {
            this.id = id;
            this.$axios({
                url: API.addRepair,
                method: "get",
                params: this.form
            }).then(res => {
                if (res.data.isok) {
                    this.dialogFormVisible = false;
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
        handleEdit(id) {
            this.id = id;
            this.$axios({
                url: API.findRepair,
                method: "get",
                params: {
                    id: id
                }
            }).then(res => {
                this.dialogFormVisible = true;
                this.form = res.data.data[0];
            });
        },
        wellAdd() {
            this.dialogFormVisible = true;
            this.form = {
                name: "",
                score: "",
                type: "",
                address: "",
                tel: "",
                len: "",
                likeNum: "",
                readNum: "",
                info: ""
            };
        },
        update() {
            this.$axios({
                url: API.updateRepair,
                method: "get",
                params: this.form
            })
                .then(res => {
                    if (res.data.isok) {
                        this.$message({
                            message: res.data.info,
                            type: "success"
                        });
                        this.dialogFormVisible = false;
                        this.init();
                    } else {
                        this.$message.error(res.data.info);
                    }
                })
                .catch(err => {});
        }
    },
    watch: {
        value() {
            this.$axios({
                url: API.findRepairComment,
                method: "get",
                params: {
                    repairId: this.value
                }
            })
                .then(res => {
                    this.tableData1 = res.data.data;
                })
                .catch(err => {});
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.wrap {
    width: 80%;
    margin: 20px auto;
}

.box {
    width: 80%;
    text-align: left;
    margin-left: 100px;
    margin-top: 20px;
}

.btn {
    display: inline;
}
</style>