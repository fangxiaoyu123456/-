<template>
    <div>
        <el-button size="mini" type="danger" @click="open" class="btn">删除</el-button>
    </div>
</template>
<script>
import API from "../common/js/api";
export default {
    props: ["idx"],
    methods: {
        open() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$emit("shanchu", this.idx);
            })
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.btn {
    display: inline;
}
</style>