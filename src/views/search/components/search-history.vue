<template>
    <div class="search-history">
        <van-cell title="搜索历史">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <div v-if="isDeleteShow">
            <span @click="empty">全部删除</span>
            <span @click="isDeleteShow=false">完成</span>
          </div>
          <van-icon name="delete" v-else @click="isDeleteShow=true"/>
        </van-cell>
        <van-cell 
        title="hello"
         v-for="(item,index) in searchHistory" 
         :key="index"
         @click="onSearchItemClick(index)"
         >
          <van-icon name="close" v-show="isDeleteShow"></van-icon>
          <span slot="title">{{item}}</span>
        </van-cell>
    </div>
</template>
<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      required:true
    }
  },
  data() {
    return {
      isDeleteShow:false,//控制删除显示状态
    }
  },
  methods: {
    onSearchItemClick(index) {
      if (this.isDeleteShow) {
        // 删除状态，点击删除
        this.$emit("delete",index)
      } else {
        // 非删除状态，点搜索
        this.$emit("search",index)
      }
    },
    empty() {
      this.$emit("empty")
    }
  }
}
</script>
<style scoped lang="less">
    
</style>