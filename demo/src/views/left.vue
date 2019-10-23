<template>
<div class="left">
    <!-- <a active-class="select">管理员管理</a> -->
    <router-link to="/index/manage" active-class="select" v-if="type=='0'">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select" v-if="type=='1'">banner管理</router-link>
    <router-link to="/index/teacher" active-class="select" v-if="type=='1'">家教管理</router-link>
    <router-link to="/index/water" active-class="select" v-if="type=='1'">水站管理</router-link>
    <router-link to="/index/repair" active-class="select" v-if="type=='1'">维修管理</router-link>
    <router-link to="/index/home" active-class="select" v-if="type=='1'">家政管理</router-link>
    <router-link to="/index/changePass" active-class="select" v-if="type=='1'">修改密码</router-link>
</div>
</template>
<script>
import API from '../common/js/api';
export default {
    data(){
        return {
            type:sessionStorage.getItem('isType')
        }
    }
}
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
.left{
    width 200px
    background $color1
    a{
        display block
        width 90%
        height 30px
        line-height 30px
        margin 5px auto
        color $color4
        text-align center
        &:hover{
            background $color2   
            transition all 0.3s 
            color $color3
            text-decoration none
        }
    }
    .select{
        background $color2
        color $color3    
    }
}
</style>