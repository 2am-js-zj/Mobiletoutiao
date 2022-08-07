<template>
    <div class="search-result">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
           :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
        </van-list>
    </div>
</template>
<script>
import { getSearchResults } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required:true
    }
  },
  created() {
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage:10,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        // 1.请求获取数据
          const { data } = await getSearchResults({
          page: this.page, //页码
          per_page: this.perPage,//每一页展示多少条数据
          q: this.searchText//查询关键词
          })
        if (Math.random() > 0.6) {
            JSON.parse('asdasda')
          }

        // 2.把数据添加到列表当中
        const {results}=data.data
        this.list.push(...results)
        // 3.将本次加载的loading关闭
        this.loading=false
        // 4.判断是否还有数据
        if (results.length) {
        //    有：则获取下一个数据的页码
          this.page++
        } else {
        //    没有：则将加载状态finished设置为结束
          this.finished=true
        }
      } catch (err) {
        this.loading = false
        this.error=true
      }
    },
  },
}
</script>
<style scoped lang="less">
    
</style>