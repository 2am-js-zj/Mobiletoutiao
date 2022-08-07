<template>
<div class="update-photo">
    <img :src="img" class="img" ref="img">
    
    <div class="toolbar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="done" @click="onConfirm">完成</div>
    </div>
</div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updateUserPhoto } from '@/api/user'
export default {
    mounted() {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true,
        })
    },
    props: {
        img: {
            type:[String,Object],
            required:true
        }
    },
    data() {
        return {
            cropper:null,
        }
    },
    methods: {
        onConfirm() {
            // 基于服务端的裁切使用getData方法 获取裁切参数
            // console.log(this.cropper.getData())
            
            // 纯客户端的裁切使用 getCropperCanvas获取裁切的文件对象
            this.cropper.getCroppedCanvas().toBlob(blob => {
                // 这种使用方法是错误的
                // 如果接口要求 Content-Type 是 application/json
                // 则传递普通 Javascript 对象
                // updateUserPhoto({
                //     photo:blob
                // })

                // 如果接口要求 Content-Type 是 multipart/form-data
                // 则你必须传递FormData对象
                this.updataPhoto(blob)
            })
        },
        async updataPhoto(blob) {
             this.$toast.loading({
                message: '保存中...',
                forbidClick: true, //禁止背景点击
                duration:0,//持续展示
             })
            try {
             // 这种使用方法是错误的
             // 如果接口要求 Content-Type 是 application/json
             // 则传递普通 Javascript 对象
             // updateUserPhoto({
             //     photo:blob
             // }) 
             // 如果接口要求 Content-Type 是 multipart/form-data
             // 则你必须传递FormData对象
             const formData = new FormData()
             formData.append('photo', blob)
             const { data } = await updateUserPhoto(formData)
             console.log(data)
             // 关闭弹出层
             this.$emit('close')
             // 更新头像
             this.$emit('updataPhoto', data.data.photo)
             this.$toast.success('头像上传成功!')
             } catch (err) {
                 this.$toast.fail('头像上传失败!')
             }
             
        }
    }
    
}
</script>
<style scoped lang="less">
.update-photo{
    background-color: #000;
    height: 100%;
    .toolbar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel, .done{
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            z-index: 6;
        }
        
    }
}
    .img{
        max-width: 100%;
    }
</style>