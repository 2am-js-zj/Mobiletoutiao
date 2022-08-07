<template>
    <div class="container">
        <!-- 导航栏 -->
        <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
        />
        <!-- /导航栏 -->

        <!-- 输入框 -->
        <div class="field-wrap">
            <van-field
              v-model.trim="loaclName"
              rows="2"
              autosize
              type="textarea"
              maxlength="7"
              placeholder="请输入昵称"
              show-word-limit
            />
        </div>
        
        <!-- /输入框 -->
    </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
    props: {
        value: {
            type: String,
            required:true,
        } 
    },
    data() {
        return {
            loaclName:this.value,
        }
    },
    methods: {
        async onConfirm() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, //禁止背景点击
                duration:0,//持续展示
            })
            try {
                const loaclName = this.loaclName
                if (!loaclName.length) {
                    this.$toast('昵称不能为空！')
                    return
                }
                await updateUserProfile({
                    name:loaclName
                })

                // 修改完成后:
                // 更新视图
                this.$emit('input',loaclName)
                // 关闭弹层
                this.$emit('close')
                // 提示成功
                this.$toast.success('修改成功！')
            } catch (err) {
                this.$toast.fail('修改失败！')
            }
        }
    }
}
</script>
<style scoped lang="less">
    .field-wrap{
        padding: 20px;
    }
</style>