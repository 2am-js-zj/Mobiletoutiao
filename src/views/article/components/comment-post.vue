<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postBtn"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default:null
    }
  },
  props: {
      target: {
          type: [Number, String, Object],
          required:true
  }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
    methods: {
        async postBtn() {
            try {
                const {data} =await addComment({
                    target:this.target.toString(),//评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
                    content: this.message,//评论内容	
                    art_id:this.articleId?this.articleId.toString():null,//文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。	
                })
                console.log(data)
                // 发布成功后

                // 关闭弹出层
                // 将发布内容显示到顶部
                this.$emit('close',data.data)
                
                // 清空输入框
                this.message=''
                this.$toast.success('发表评论成功!')
            } catch (err) {
                this.$toast.fail('评论失败!请稍后重试!')
            }
        }
    }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>