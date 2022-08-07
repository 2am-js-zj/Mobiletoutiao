<template>
    <div class="home-container">
        <van-nav-bar
         class="page-nav-bar"
         fixed
         >
        <van-button
         class="search-btn" 
         slot="title"
         type="info"
         size="small"
         round
         icon="search"
         to="/search"
        >搜索</van-button>
        </van-nav-bar>
        <!-- 频道导航栏 -->
        <!-- 
            通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 
            通过 animated 属性可以开启切换标签内容时的转场动画。
        -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable fixed>
          <van-tab 
          :title="item.name"
          v-for="item in channels"
          :key="item.id"
          >
          <ArticleList :channel="item"></ArticleList>
          </van-tab>
          <div slot="nav-right" class="placeholder"></div>
          <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
            <i class="iconfont icon-gengduo"></i>
          </div>
        </van-tabs>
        <!-- 弹出层 频道列表 -->
        <van-popup
            v-model="isChannelEditShow"
            closeable
            close-icon-position="top-left"
            position="bottom"
            :style="{ height: '90%' }"
            >
            <ChannelEdit :mychannels="channels" :active="active" @activeChange="change" @sub1="sub"></ChannelEdit>
            </van-popup>
    </div>
</template>
<script>
import { getUserChannels } from '@/api/user';
import ArticleList from '@/views/home/components/article-list.vue';
import ChannelEdit from './components/channel-edit.vue';
import { mapState } from 'vuex';
import { getItem } from '@/utils/storage';
export default {
    created() {
        this.loadChannels();
    },
    data() {
        return {
            active: 0,
            channels: [],
            isChannelEditShow:false,//控制频道弹出层的展示状态
        };
    },
    methods: {
        sub(x) {
            this.active=x
        },
        change(index) {
            this.isChannelEditShow=false
            this.active = index
            
        },
        async loadChannels() {
            try {
                let channels = []
                if (this.user) {
                    // 已登录，请求获取用户频道列表
                    const { data } = await getUserChannels()
                    channels=data.data.channels
                } else {
                    // 未登录，判断是否有本地存储的频道列表数据
                    const localChannels=getItem('TOUTIAO_CHANNELS')
                    //   有，拿来使用
                    if (localChannels) {
                        channels=localChannels
                    }
                    //   没有，请求获取默认频道列表
                    else {
                        // 请求获取默认的频道列表
                        const { data } = await getUserChannels()
                        channels=data.data.channels
                    }
                }
                this.channels=channels
            }
            catch (err) {
                this.$toast("获取频道列表失败！");
            }
        }
    },
    components: { ArticleList, ChannelEdit },
    computed: {
        ...mapState(['user'])
    }
}
</script>
<style scoped lang="less">
.home-container{
        padding-top: 174px;
        padding-bottom: 100px;
        
/deep/.van-nav-bar__title{
        max-width: unset !important;
    }
    
    .search-btn{
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 38px;
        .van-icon{
            font-size:32px;
        }
    }

 /deep/ .channel-tabs{
        .van-tabs__wrap{
            position: fixed;
            top: 92px;
            z-index: 1;
            height: 82px;
            left: 0;
            right: 0;
            .van-tabs__nav{
                padding-bottom: 0;
            }
        }
        .van-tab{
            min-width: 200px;
            border-right: 1px solid #edeff3;
            font-size: 30px;
            color: #777;
        }
        .van-tab--active{
            color: #333;
        }
        .van-tabs__line{
            width: 31px !important;
            height: 6px;
            color:#3296fa;
            bottom: 8px;
        }
        .placeholder{
            width: 66px;
            height: 8px;
            flex-shrink: 0;
        }
        .hamburger-btn{
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            opacity: 0.902;
            i.icon-gengduo{
                font-size: 33px;
            }
            &:before{
                content: "";
                width: 1px;
                height: 100%;
                background: url(../../assets/gradient-gray-line.png);
                position: absolute;
                left:0;
                background-size:contain;
            }
        }
    }
}
    
</style>