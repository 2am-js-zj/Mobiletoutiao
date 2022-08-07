<template>
        <!-- 
            只有List在可视范围内才会检查滚动位置，触发onload
         -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- <van-cell v-for="item in list" :key="item.com_id" :title="item.content" />s -->
          <CommontItem 
          v-for="(item,index) in list"
          :key="index"
          :comment="item"
          @replyClick="$emit('replyClick',$event)"
          />
        </van-list>
</template>
<script>
import { getComments } from '@/api/comment';
import CommontItem from './commont-item.vue';
export default {
    created() {
        // 当手动onload的时候 不会自动开启初始的loading
        this.loading=true
        this.onLoad();
    },
    props: {
        source: {
            required: true
        },
        list: {
            type:Array,
            // 数组或者对象必须用函数给值
            default: () => []
        },
        type: {
            // 自定义Prop数据验证
            Validator(value) {
                // 传入的数组,必须是下面括号内的某一个
                return ['a','c'].includes(value)
            },
            required:true,
            
        }
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 2,
            error: false,
        };
    },
    methods: {
        async onLoad() {
            try {
                // 请求获取数据
                // 
                const { data } = await getComments({
                    type:this.type,
                    source: this.source.toString(),
                    //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    offset: this.offset,
                    limit: this.limit,
                });
                // // 模拟错误情况
                // if(Math.random()>0.4){
                //     JSON.parse('asdaad')
                // }
                const { results } = data.data;
                // 把文章评论的总数量传递到外部
                this.$emit("onload-success", data.data);
                // 将数据添加到列表中
                this.list.push(...results);
                // 将loading设置为false
                this.loading = false;
                //  判断是否还有数据
                if (results.length) {
                    // 有 获取下页数据数据页码
                    this.offset = data.data.last_id;
                }
                else {
                    //  没有 finished设置未true
                    this.finished = true;
                }
                this.$toast.success('成功')
            }
            catch (err) {
                this.error = true;
                this.loading = false;
            }
        },
    },
    components: { CommontItem }
}
</script>
<style scoped lang="less">
    
</style>