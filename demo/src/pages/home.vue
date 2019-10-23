<template>
    <div>
        <el-tabs v-model="activeName" class="wrap">
            <el-tab-pane label="家政banner" name="first">
                <v-house></v-house>
            </el-tab-pane>
            <el-tab-pane label="人员管理" name="second">
                <v-person></v-person>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import API from "../common/js/api";
import vHouse from '../views/house';
import vPerson from '../views/person'
export default {
    components:{
        vHouse,
        vPerson
    },
    data() {
      return {
        activeName: 'first'
      };
    },
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
.wrap{
    width 90% 
    margin 20px auto
}
</style>