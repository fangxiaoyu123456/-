<template>
  <div class="wrap">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="main">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vHeader from '../views/header'
import vLeft from '../views/left'
import vRight from '../views/right'
export default {
    components:{
        vHeader,
        vLeft,
        vRight
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';
.wrap {
  height: 100vh;
  display flex
  flex-direction column
  .header{
      height 80px
    }
    .main{
        flex 1
        display flex    
    }
}
</style>