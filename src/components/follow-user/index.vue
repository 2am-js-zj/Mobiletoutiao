<template>
         <van-button
          v-if="isFollowed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="loading"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="loading"
          >关注</van-button>
</template>
<script>
import { addFollow,deleteFollow } from '@/api/user'
export default {
    model: {
        prop: 'isFollowed',
        event:'update-is_followed',
    },
    props: {
        isFollowed: {
            type: Boolean,
            required:true,
        },
        userId: {
            type: [String, Number, Object],
            required:true,
        }
    },
    data() {
        return {
            loading:false,
        }
    },
    methods: {
        async onFollow() {
        this.loading=true
        try {
          if (this.isFollowed) {
            // 已关注，取消关注
            await deleteFollow(this.userId)
          } else {
            //未关注，关注
            await addFollow(this.userId)
          }
          this.$emit('update-is_followed',!this.isFollowed)
        } catch (err) {
          if (err.request.status === 400) {
            this.$toast('不能关注自己')
          } else {
            this.$toast('操作失败请重试')
          }
        }
         this.loading=false
      }
    }
}
</script>
<style scoped lang="less">
    
</style>