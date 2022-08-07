<template>
    <div class="container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- 标签导航栏 -->
        <van-tabbar route>
           <van-tabbar-item to="/home">
            <i slot="icon" class="iconfont icon-shouye"></i>
            <span class="text">首页</span>
           </van-tabbar-item>
           <van-tabbar-item to="/qa"><i slot="icon" class="iconfont icon-wenda"></i><span class="text">问答</span></van-tabbar-item>
           <van-tabbar-item to="/video"><i slot="icon" class="iconfont icon-shipin"></i><span class="text">视频</span></van-tabbar-item>
           <van-tabbar-item to="/my"><i slot="icon" class="iconfont icon-wode"></i><span class="text" v-if="user" >我的</span><span class="text" v-else>未登录</span></van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
       return {
        
       };
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>
<style scoped lang="less">
    .iconfont{
        font-size: 40px;
    }
    .text{
        font-size: 20px;
    }
</style>