<template>
    <div class="container">
        <!-- 已登录头部 -->
        <div v-if="user" class="header user-info">
            <div class="base-info">
                <div class="left">
                    <van-image
                        :src="userInfo.photo"
                        class="avatar"
                        round
                        fit="cover"/>
                        <span class="name">{{userInfo.name}}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round type="default" to="/user/profile">编辑资料</van-button>
                </div>
            </div>
            <div class="data-stats">
                <div class="data-item"><span class="count">{{userInfo.art_count}}</span><span class="text">头条</span></div>
                <div class="data-item"><span class="count">{{userInfo.follow_count}}</span><span class="text">关注</span></div>
                <div class="data-item"><span class="count">{{userInfo.fans_count}}</span><span class="text">粉丝</span></div>
                <div class="data-item"><span class="count">{{userInfo.like_count}}</span><span class="text">获赞</span></div>
            </div>
        </div>
        <!-- 未登录头部 -->
        <div v-else class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img src="~@/assets/mobile.png" class="mobile-img">
                <span class="text">登录 / 注册</span>
            </div>
        </div>
        
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-shoucang"></i>
                <span class="text" slot="text">收藏</span>
            </van-grid-item>

            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span class="text" slot="text">历史</span>
            </van-grid-item>
        </van-grid>
        <!-- 宫格导航 -->
        <!-- 消息通知，小智同学，退出登录 -->
        <van-cell-group clickable>
            <van-cell title="消息通知" is-link/>
            <van-cell title="小智同学" is-link class="md9"/>
            <van-cell v-if="user" title="退出登录" class="lgout-cell" @click="onLogout"/>
        </van-cell-group>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
import { constants } from 'buffer'
export default {
    created(){
        if(this.user){
        this.loadUserInfo()
        }
    },
    data() {
        return {
            userInfo:{}//用户信息
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        onLogout() {
            // 退出提示
            // 在组件中需要使用 this.$dialog 来调用弹窗组件
            this.$dialog.confirm({
              title: '确认退出吗',
            })
              .then(() => {
                // on confirm
                  this.$store.commit("setUser", null)
              })
              .catch(() => {
                // on cancel
                console.log('no')
              })
            // 确认退出，清除登录状态容器中的user和本地存储的都删除

        },
        async loadUserInfo() {
            try {
                this.$toast('获取数据成功')
                const { data } = await getUserInfo()
                this.userInfo=data.data
            } catch (err) {
                this.$toast('获取数据失败')
                console.log(err)
            }
        }
    }
}
</script>
<style scoped lang="less">
    .header{
        height: 361px;
        // 可以使用全局less里的@  在css使用@时 前面要加 ~
        background:url('~@/assets/banner.png');
        background-size: cover;
        
    }
    .not-login {
        display: flex;
        justify-content: center;
        align-content: center;
        .login-btn{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            .mobile-img{
                width: 132px;
                height: 132px;
            }
            .text{
                font-size: 28px;
                color: #fff;
                margin-top: 15px;
            }
        }
    }
    
    .user-info{
        .base-info{
            height: 231px;
            padding: 76px 32px 23px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                align-items: center;
                .avatar{
                    width: 132px;
                    height: 132px;
                    margin-right: 23px;
                    border: 4px solid #fff;
                }
                .name{
                    font-size: 30px;
                    color: #fff;
                    
               }
            }
        }
        .data-stats {
            height: 130px;
            display: flex;
            justify-content: space-around;
            .data-item{
                height: 130px;
                flex:1;
                display:flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #fff;
                .text {
                    font-size: 23px;
                    
                }
                .count {
                    font-size: 36px;
                }
            }
        }
    }
    
    .grid-nav{
        .grid-item{
        height: 141px;
        .iconfont {
            font-size: 45px;
        }
        .icon-shoucang{
            color:#eb5253
        }
        .icon-lishi{
            color:#dd9d1d
        }
        span.text{
            font-size: 28px;
        }
        }
    }
    .lgout-cell{
        text-align: center;
        color:#d86262;
    }
    .md9{
        margin-bottom: 9px;
    }
        
</style>