<template>
    <div class="search-container">
        <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <!-- 搜索框 -->
        <form action="/" class="search-form">
            <van-search
              v-model="searchText"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
              background="#3296fa"
              @focus="isResultShow=false"
            />
        </form>
        <!-- 搜索结果 -->
        <search-result 
         v-if="isResultShow"
         :searchText="searchText"
        />

        <!-- 联想建议 -->
        <SearchSuggestion
         v-else-if="searchText"
         :searchText="searchText"
         @search="onSearch"
         ></SearchSuggestion>

        <!--搜索历史记录-->
        <search-history v-else :searchHistory="searchHistory" @delete="deleteHistory" @search="searchbtn" @empty="searchHistory=[]"></search-history>
    </div>
</template>
<script>
import searchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import SearchSuggestion from './components/search-suggestion.vue';
import { setItem, getItem } from '@/utils/storage'
export default {
  components: { searchHistory, SearchResult, SearchSuggestion },
    props: {
        
    },
    data() {
      return {
          searchText: '',
          isResultShow: false,//控制搜索结果的展示
          searchHistory:getItem('TOUTIAO_SEARCH_HISTORIES')||[],
      };
    },
    methods: {
      onSearch(val) {
        // 存储历史记录
        const index = this.searchHistory.indexOf(val)
        if (index!==-1) {
          this.searchHistory.splice(index,1)
        }
        this.searchHistory.unshift(val)

        // 展示搜索结果
        this.isResultShow = true

        // 更新文本框内容
        this.searchText=val
        console.log(val)
      },
      onCancel() {
        this.$router.back()
      },
      deleteHistory(index) {
        this.searchHistory.splice(index,1)
      },
      searchbtn(index) {
        this.onSearch(this.searchHistory[index])
      }
  },
  watch: {
    searchHistory(value) {
    setItem('TOUTIAO_SEARCH_HISTORIES',value)
   }   
  }
}
</script>
<style scoped lang="less">
    .search-container{
      padding-top: 108px;
        .van-search__action{
            color: #fff;
        }
        .search-form{
          position: fixed;
          top:0;
          left: 0;
          right: 0;
          z-index: 1;
        }
    }
</style>