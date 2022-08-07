<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('clickClose')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="scrop-wrap">
      <!-- 当前评论项 -->
    <CommontItem :comment="comment"/>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <CommentList
     :source="comment.com_id"
      :type="'c'"
      :list="commentList"
      />
    <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button size="small" round class="postBtn" @click="show=true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
    <CommentPost
    :target="comment.com_id"
    @close="onPostSuccess"
    ></CommentPost>
    </van-popup>
    
  </div>
</template>

<script>
import CommontItem from './commont-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: { CommontItem, CommentList, CommentPost },
  
  props: {
      comment: {
          type: Object,
          required:true,
      }
  },
  data () {
    return {
      show: false,
      commentList:[]//评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess(data) {
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.show=false
      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
      
    }
  }
}
</script>
<style scoped>
.post-wrap{
  height: 88px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top:1px solid #d8d8d8;
}
.postBtn{
    width: 60%;
  }
  .scrop-wrap{
    position: fixed;
    top: 210px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
</style>