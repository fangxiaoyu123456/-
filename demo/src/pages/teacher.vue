<template>
    <div class="wrap">
        <el-tabs>
            <!-- 家教banner -->
            <el-tab-pane label="家教banner">
                <v-add></v-add>
            </el-tab-pane>
            <!-- 家教类型 -->
            <el-tab-pane label="家教类型">
                <v-addone></v-addone>
            </el-tab-pane>
            <!-- 家教排行 -->
            <el-tab-pane label="家教排行">
                <v-addtwo></v-addtwo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import API from "../common/js/api";
import vAdd from '../views/add'
import vAddone from '../views/addone'
import vAddtwo from '../views/addtwo'
export default {
    components:{
        vAdd,
        vAddone,
        vAddtwo
    },
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.wrap {
    width: 80%;
    margin: 20px auto;
}

img {
    width: 180px;
}
</style>