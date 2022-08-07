<template>
    <van-icon
        :color="value===1 ? '#e5645f':''"
        :name="value===1 ? 'good-job':'good-job-o'"
        @click="onCollect"
        :loading="loading"
      />
</template>
<script>
import { addLike,deleteLike } from '@/api/article'
export default {
    props: {
        value: {
            type: Number,
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
                let status=-1 //默认无状态
                if (this.value===1) {
                    // 若已喜欢，则取消
                    await deleteLike(this.articleId)
                } else {
                    // 若未喜欢，则喜欢
                    await addLike(this.articleId)
                    status=1
                }

                // 更新视图
                this.$emit('input', status)
                this.$toast.success(status===1?'点赞成功':'取消点赞成功')
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