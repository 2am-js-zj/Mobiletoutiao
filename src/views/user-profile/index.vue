<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
        title="个人信息"
        class="page-nav-bar"
        left-arrow
        @click-left="$router.back()"
        />
        <!-- /导航栏 -->
        <input type="file" hidden ref="file" @change="onFileChange">
        <!-- 个人信息 -->
        <van-cell 
        title="头像"
         is-link
         class="photo-cell"
         center
         @click="$refs.file.click()"
         >
            <van-image
              class="avatar"
              fit="cover"
              round
              :src="user.photo"
            />
        </van-cell>
        <van-cell 
        title="昵称" 
        :value="user.name" 
        is-link
        @click="show=true"
        />
        <van-cell 
        title="性别" 
        :value="user.gender===0?'男':'女'" 
        is-link
        @click="showsex=true"
        />
        <van-cell title="生日" :value="user.birthday" is-link @click="showbirthday=true"/>
        <!-- /个人信息 -->

        <!-- 编辑昵称 -->
        <van-popup 
        v-model="show" 
        position="bottom" 
        :style="{ height: '70%' }"
        >
        <UpdateName @close="show=false" v-model="user.name" v-if="show"></UpdateName>
        </van-popup>
        <!-- /编辑昵称 -->

        <!-- 编辑性别 -->
        <van-popup 
        v-model="showsex" 
        position="bottom" 
        :style="{ height: '70%' }"
        >
        <UpdateSex 
        @close="showsex=false"
        v-model="user.gender"
        v-if="showsex"
        ></UpdateSex>
        </van-popup>
        <!-- /编辑性别 -->


        <!-- 编辑生日 -->
        <van-popup 
        v-model="showbirthday" 
        position="bottom" 
        :style="{ height: '42%' }"
        >
        <UpdateBirthday v-model="user.birthday" v-if="showbirthday" @close="showbirthday=false"></UpdateBirthday>
        </van-popup>
        <!-- /编辑生日 -->

        <!-- 编辑头像 -->
        <van-popup 
        v-model="showavatar"
        position="bottom"  
        :style="{ height: '100%' }"
        >
        <UpdatePhoto v-if="showavatar" :img="photo" @close="showavatar=false" @updataPhoto="user.photo=$event"></UpdatePhoto>
        </van-popup>
        <!-- /编辑头像 -->
        

        

    </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateSex from './components/update-sex.vue'
import UpdateName from './components/update-name.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
    created() {
        this.loadUserProfile();
    },
    methods: {
        onFileChange() {
            // 获取文件对象
            const file=this.$refs.file.files[0]
            // 基于文章对象获得blob数据
            const data = window.URL.createObjectURL(file)
            console.log(data)
            this.showavatar = true
            this.photo = data
            this.$refs.file.value=''
        },
        async loadUserProfile() {
            try {
                const { data } = await getUserProfile();
                this.user = data.data;
            }
            catch (err) {
                console.log(err);
            }
        },
        showPopup() {
            this.show = true;
        },
    },
    data() {
        return {
            user: {},
            show: false,
            showsex: false,
            showbirthday: false,
            showavatar: false,
            photo:'',
        };
    },
    components: { UpdateBirthday, UpdateSex, UpdateName, UpdatePhoto }
}
</script>
<style scoped lang="less">
.user-profile{
    .avatar{
        width: 60px;
        height: 60px;
    }
    .van-popup{
        background-color: #f5f7f9;
    }
}
    
</style>