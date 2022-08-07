<template>
    <div class="article-list">
        <van-pull-refresh v-model="refreshing"
         @refresh="onRefresh"
        :success-text="refreshingSuccessText"
        success-duration="1000"
        animation-duration="500"

        >
        <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
         :error.sync="error"
         error-text="请求失败，点击重新加载"
         >
            <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
            <ArticleItem v-for="(article,index) in list" :key="index" :article="article" />
        </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue';
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            timestamp: null,
            error: false,
            refreshing: false,
            refreshingSuccessText: "刷新成功", //下拉刷新成功提示文本
        };
    },
    props: {
        channel: {
            type: Object,
            require: true
        }
    },
    methods: {
        // 初始化或滚动到底部的时候会触发调用onload
        // 若初始化触发onload之后数据铺不满 则会再触发一次
        async onLoad() {
            // console.log('onLoad')
            // 1.请求获取数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            try {
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(),
                });
                //模拟随机失败的情况
                // if (Math.random() > 0.5) {
                //     JSON.parse('asdasda')
                // }
                // console.log(data)
                const { results } = data.data;
                // console.log(results)
                // this.list+=result
                this.list.push(...results);
                // 本次数据加载结束之后要把加载状态设置为结束
                this.loading = false;
                if (results.length) {
                    //更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp;
                }
                else {
                    // 没有数据了，将finished设置为true
                    this.finished = true;
                }
            }
            catch (err) {
                this.error = true;
                this.$toast("获取更多数据失败");
                this.loading = false;
            }
        },
        async onRefresh() {
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            try {
                // 将数据追加到列表的顶部
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: Date.now(), //下拉刷新 每次获取最新数据 所以传递当前最新时间戳
                });
                //模拟随机失败的情况
                if (Math.random() > 0.3) {
                    JSON.parse("asdasda");
                }
                const { results } = data.data;
                console.log(results);
                // 将数据追加到列表的顶部
                this.list.unshift(...results);
                // 关闭下拉刷新的loading状态
                this.refreshing = false;
                // 更新下拉刷新成功提示的文本
                this.refreshingSuccessText = `刷新成功更新了${results.length}条数据`;
            }
            catch (err) {
                this.refreshingSuccessText = `刷新失败！！！`;
                this.refreshing = false;
            }
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    },
    components: { ArticleItem }
}
</script>
<style scoped lang="less">
.article-list{
    height: 80vh;
    overflow-y:auto;
}
</style>