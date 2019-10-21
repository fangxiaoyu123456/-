<template>
<div class="left">
    <!-- <a active-class="select">管理员管理</a> -->
    <router-link to="/index/manage" active-class="select">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select">banner管理</router-link>
    <router-link to="/index/teacher" active-class="select">家教管理</router-link>
    <router-link to="/index/water" active-class="select">水站管理</router-link>
    <router-link to="/index/repair" active-class="select">维修管理</router-link>
    <router-link to="/index/home" active-class="select">家政管理</router-link>
    <router-link to="/index/changePass" active-class="select">修改密码</router-link>
</div>
</template>
<script>
import API from '../common/js/api';
export default {
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