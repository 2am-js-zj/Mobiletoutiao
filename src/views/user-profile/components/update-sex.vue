<template>
    <div class="container">
        <van-picker
          title="性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="$emit('close')"
          @change="onPickerChange"
          :default-index="value"
        />
    </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
    props: {
        value: {
            type: Number,
            required:true,
        }
    },
    data() {
        return {
            columns: ['男', '女'],
            localGender:this.value,
        };
    },
    methods: {
        async onConfirm() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, //禁止背景点击
                duration: 0,//持续展示
            })
            try {
                const localGender = this.localGender
                await updateUserProfile({
                   gender:localGender
                })

                // 修改完成后:
                // 更新视图
                this.$emit('input', localGender)
                // 关闭弹层
                this.$emit('close')
                // 提示成功
                this.$toast.success('修改成功！')
            } catch (err) {
                this.$toast.fail('修改失败！')
            }
        },
        onPickerChange(picker, value, index) {
            this.localGender=index
        }
  },  
}
</script>
<style scoped lang="less">
    
</style>