<template>
    <div>
        <el-button @click="wellAdd">添加</el-button>
        <el-dialog title="添加家政人员" :visible.sync="dialogFormVisible">
            <el-form v-model="aaa">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="aaa.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="aaa.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="aaa.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资格认证" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="aaa.qualification">
                        <el-checkbox label="身份证"></el-checkbox>
                        <el-checkbox label="学位证"></el-checkbox>
                        <el-checkbox label="健康证"></el-checkbox>
                        <el-checkbox label="上岗证"></el-checkbox>
                        <el-checkbox label="母婴护理师证"></el-checkbox>
                        <el-checkbox label="催乳师证"></el-checkbox>
                        <el-checkbox label="产后恢复师证"></el-checkbox>
                        <el-checkbox label="助理家政管理师"></el-checkbox>
                        <el-checkbox label="家政管理师"></el-checkbox>
                        <el-checkbox label="高级家政管理师"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="服务项目" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="aaa.type">
                        <el-checkbox label="保姆"></el-checkbox>
                        <el-checkbox label="月嫂"></el-checkbox>
                        <el-checkbox label="钟点工"></el-checkbox>
                        <el-checkbox label="保洁"></el-checkbox>
                        <el-checkbox label="家电清洗"></el-checkbox>
                        <el-checkbox label="家具保养"></el-checkbox>
                        <el-checkbox label="新居开荒"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="学历" :label-width="formLabelWidth">
                    <el-select v-model="aaa.edu" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.edu"
                            :label="item.label"
                            :value="item.edu"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作年限" :label-width="formLabelWidth">
                    <el-input v-model="aaa.year" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="级别" :label-width="formLabelWidth">
                    <el-input v-model="aaa.vNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="aaa.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="城市" :label-width="formLabelWidth">
                    <el-input v-model="aaa.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="经验" :label-width="formLabelWidth">
                    <el-input v-model="aaa.experience" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="点赞数量" :label-width="formLabelWidth">
                    <el-input v-model="aaa.likeNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关注人数" :label-width="formLabelWidth">
                    <el-input v-model="aaa.readNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="距离" :label-width="formLabelWidth">
                    <el-input v-model="aaa.len" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="自我评价" :label-width="formLabelWidth">
                    <el-input v-model="aaa.info" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="免冠照片" :label-width="formLabelWidth">
                    <el-input v-model="aaa.img" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add(0)" v-if="id==0">添 加</el-button>
                <el-button type="primary" @click="update" v-if="id!=0">修改</el-button>
            </div>
        </el-dialog>
        <!-- 导航 -->
        <el-select v-model="value" placeholder="请选择" class="box">
            <el-option label="全部" value></el-option>
            <el-option v-for="item in optionsss" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <!-- table -->
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="tel" label="电话"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="edu" label="学历"></el-table-column>
            <el-table-column label="服务类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type|arr}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" class="btn" @click="handleEdit(scope.row.id)">查看</el-button>
                    <v-del class="btn" :idx="scope.row.id" @shanchu="del"></v-del>
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
            aaa: {
                name: "",
                img: "",
                year: "",
                vNum: "",
                price: "",
                city: "",
                age: "",
                edu: "",
                experience: "",
                readNum: "",
                likeNum: "",
                len: "",
                tel: "",
                info: "",
                qualification: [],
                type: []
            },

            id: "",
            formLabelWidth: "120px",
            tableData: [],
            options: [
                {
                    edu: "小学",
                    label: "小学"
                },
                {
                    edu: "初中",
                    label: "初中"
                },
                {
                    edu: "高中",
                    label: "高中"
                },
                {
                    edu: "本科",
                    label: "本科"
                },
                {
                    edu: "研究生",
                    label: "研究生"
                },
                {
                    edu: "博士",
                    label: "博士"
                }
            ],
            optionsss: [],
            value: ""
        };
    },
    mounted() {
        this.init();
        this.$axios({
            url: API.getHomeType,
            method: "get"
        }).then(res => {
            this.optionsss = res.data.type;
        });
    },
    methods: {
        wellAdd() {
            this.dialogFormVisible = true;
            this.aaa = {
                name: "",
                img: "",
                year: "",
                vNum: "",
                price: "",
                city: "",
                age: "",
                edu: "",
                experience: "",
                readNum: "",
                likeNum: "",
                len: "",
                tel: "",
                info: "",
                qualification: [],
                type: []
            };
        },

        init() {
            this.$axios({
                url: API.findHomeWorker,
                method: "get"
            }).then(res => {
                this.tableData = res.data.data;
            });
        },
        //查看
        handleEdit(id) {
            this.id = id;
            this.$axios({
                url: API.findHomeWorker,
                method: "get",
                params: {
                    id: id
                }
            }).then(res => {
                this.dialogFormVisible = true;
                var data = res.data.data[0];
                if (data.type.indexOf("[") != -1) {
                    data.type = JSON.parse(res.data.data[0].type);
                } else {
                    data.type = data.type.split(",");
                }

                if (data.qualification.indexOf("[") != -1) {
                    data.qualification = JSON.parse(
                        res.data.data[0].qualification
                    );
                } else {
                    data.qualification = data.qualification.split(",");
                }
                this.aaa = data;
            });
        },
        add(id) {
            this.id = id;
            this.$axios({
                url: API.addHomeWorker,
                method: "get",
                params: this.aaa
            })
                .then(res => {
                    this.$message({
                        message: res.data.info,
                        type: "success"
                    });
                    this.init();
                    this.dialogFormVisible = false;
                })
                .catch(err => {
                    console.log("mdzz");
                });
        },
        del(id) {
            this.$axios({
                url: API.delHomeWorker,
                method: "get",
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data.isok) {
                    this.dialogTableVisible = false;
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
        update() {
            this.$axios({
                url: API.updateHomeWorker,
                method: "get",
                params: this.aaa
            }).then(res => {
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
            });
        }
    },
    watch: {
        value() {
            this.$axios({
                url: API.findHomeWorker,
                method: "get",
                params: {
                    type: this.value
                }
            }).then(res => {
                this.tableData = res.data.data;
            });
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.box {
    display: block;
    width: 80%;
    margin: 20px auto;
}
</style>