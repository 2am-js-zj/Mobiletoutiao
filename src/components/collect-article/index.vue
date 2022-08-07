<template>
    <van-icon
        :color="value ? '#ffa500':''"
        :name="value ? 'star':'star-o'"
        @click="onCollect"
        :loading="loading"
      />
</template>
<script>
import { addCollect,deleteCollect } from '@/api/article'
export default {
    props: {
        value: {
            type: Boolean,
            required:true,
        },
        articleId: {
            required:true
        }
    },
    data() {
        return {
            loading:false,
        }
    },
    methods: {
        async onCollect() {
            this.loading=true
            try {
                if (this.value) {
                    // 若已收藏，则取消
                    await deleteCollect(this.articleId)
                } else {
                    // 若未收藏，则收藏
                    await addCollect(this.articleId)
                }

                // 更新视图
                this.$emit('input',!this.value)
            } catch (err) {
                console.log(err)
                this.$toast('操作失败，请稍后重试')
            }
            this.loading=false
        },
    }
}
</script>
<style scoped lang="less">
    
</style>