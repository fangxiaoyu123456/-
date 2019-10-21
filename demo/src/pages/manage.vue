<template>
  <div>
    <el-button class="btn" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加|修改管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input placeholder="请输入账号" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="confirm" autocomplete="off" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" placeholder="描述"></el-input>
        </el-form-item>

        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.time" autocomplete="off" placeholder="时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="tableData" height="250" border style="width: 80%;margin:20px auto">
      <el-table-column type="index" label="序号" width="217"></el-table-column>
      <el-table-column prop="name" label="姓名" width="217"></el-table-column>
      <el-table-column prop="des" label="属性" width="217"></el-table-column>
      <el-table-column label="时间" width="217">
        <template slot-scope="scope">
          <span>{{scope.row.time|transTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="217">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">查看</el-button>
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
      tableData: [],
      gridData: [],
      form: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      confirm: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "90px",
      id: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(res => {
        this.tableData = res.data.data;
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
            url: API.delManage,
            method: "post",
            data: {
              id: id
            }
          }).then(res => {
            this.init();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.$axios({
        url: API.addManage,
        method: "post",
        data: this.form
      }).then(res => {
        if (res.data.isok) {
          this.init();
          this.dialogFormVisible = false;
        } else {
          this.$message({
            type: "info",
            message: "添加失败"
          });
        }
      });
    },
    handleEdit() {
      this.dialogFormVisible = true;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.btn {
  margin-left: 20px;
}
</style>