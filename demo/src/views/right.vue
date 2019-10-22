<template>
<div class="right">
    <h3>{{$route.name}}</h3>
    <router-view></router-view>
</div>
</template>
<script>
import API from '../common/js/api';
export default {
}
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
.right{
    background $color3    
    flex 1
}
h3{
    height 50px
    line-height 50px
    font-size 30px
    margin-left 30px
}
</style>