<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button type="danger" plain round size="small" class="edit-btn" @click="isEdit=!isEdit">{{ isEdit?'完成':'编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10" class="mygrid">
          <van-grid-item 
           class="grid-item" 
           v-for="(channel,index) in mychannels"
           :key="index"
           @click="onMyChannelClick(channel,index)"
           >
            <van-icon slot="icon" 
             name="clear" 
             v-if="isEdit && !fixedChannels.includes(channel.id)">
            </van-icon>
            <span slot="text" class="text" :class="{active:index===active}">{{channel.name}}</span>
          </van-grid-item>
        </van-grid>

        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title" class="title-text" >频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recommend-grid">
          <van-grid-item v-for="(item,index) in recommendChannels" :key="index" icon="plus" class="grid-item" @click="onAddChannel(item)"><span slot="text" class="text">{{item.name}}</span></van-grid-item>
        </van-grid>
    </div>
</template>
<script>
import { getAllChannels, addUserChannel,deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
export default {
    props: {
        mychannels: {
            type: Array,
            require:true
        },
        active:{
            require:true
        }
    },
    data() {
        return {
            allChannels: [],
            isEdit: false,//控制编辑状态的显示
            fixedChannels:[0],//固定频道，不允许删除
        }
    },
    created() {
        this.loadAllChannels()
    },
    methods: {
        async loadAllChannels() {
            try {
                const { data } = await getAllChannels()
                this.allChannels=data.data.channels
            } catch (err) {
                this.$toast('所有频道获取失败！')
            }
        },
        async onAddChannel(channel) {
            console.log(channel)
            this.mychannels.push(channel)

            // 数据持久化处理
            // 未登录，把数据存储到本地
            if (!this.user) {
                console.log(1)
                setItem('TOUTIAO_CHANNELS',this.mychannels)
            } else {
            // 已登录，把数据存储到接口上
                try {
                await addUserChannel({
                    id: channel.id,
                    seq:this.mychannels.length
                })
                } catch (err) {
                    this.$toast('添加频道失败！')
                    console.log(err)
            }
                
            }
        },
        onMyChannelClick(channel, index) {
            // 如果是编辑状态则执行删除
            if (this.isEdit) {
                if (this.fixedChannels.includes(channel.id)) {
                    // 如果是固定频道，则不删除
                    return
                }
                if (index <= this.active) {
                    // 让激活频道的索引 -1
                    this.$emit("sub1",this.active-1)
                }
                this.mychannels.splice(index, 1)
                //4.处理持久化
                this.deleteChannel(channel)
            } else {
            // 如果是未编辑状态则关闭弹窗 并且 切换到该分类频道下
            this.$emit("activeChange",index)
            }
        },
        async deleteChannel(channel) {
            try {
                if (this.user) {
                // 已登录，则数据更新到线上
                    await deleteUserChannel(channel.id)
                } else {
                    // 未登录将数据更新到本地
                    setItem('TOUTIAO_CHANNELS',this.mychannels)
                }
            } catch (err) {
                this.$toast('操作失败')
            }
        }
    },
    computed: {
        ...mapState(['user']),
        // 计算属性会观测内部依赖数据的变化，如果依赖的数据发生变化，则计算属性会重新执行
        recommendChannels() {
            return this.allChannels.filter(channel => {
                return !this.mychannels.find(item => {
                    return item.id===channel.id
                })
            })     
        }
        // recommendChannels() {
        //     const channels = []
        //     this.allChannels.forEach(channel => {
        //         // find遍历数组，找到满足条件的元素项,返回满足条件的元素项
        //         const ret=this.mychannels.find(mychannel => {
        //             return mychannel.id===channel.id
        //         })
        //         // 如果我的频道中不包含该频道项，则收集到推荐频道中
        //         if (!ret) {
        //             channels.push(channel)
        //         }
        //     });
        //     // 把计算结果返回
        //     return channels      
        // }
    }
}
</script>
<style scoped lang="less">
    .channel-edit{
        padding: 85px 0;
        .title-text{
            font-size: 32px;
            color: #333;
        }
        .edit-btn{
            width: 104px;
            height: 48px;
            font-size: 26px;
            color:#f85959;
            border:solid 1px #f85959;
        }

       /deep/ .grid-item{
            width: 160px;
            height: 86px;
            .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text,.text{
                font-size: 28px;
                color: #222;
                margin-top: 0;   
            }
            .active{
                color: #f85959;
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
            }
        }
        /deep/.mygrid{
            .grid-item{
                .van-icon{
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    font-size: 30px;
                    color: #cacaca;
                    z-index: 3;
                }
            }
        }

       /deep/ .recommend-grid{
            .grid-item{
                .van-grid-item__content{
                    white-space: nowrap;
                    flex-direction: row;
                    .van-icon-plus{
                        font-size: 28px;
                    }
                    .van-grid-item__text{
                        margin-top: 0;
                        margin-right: 6px;
                    }
                }
            }
        }
    }
</style>