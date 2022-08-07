<template>
    <div class="search-suggestion">
        <van-cell 
         v-for="(item,index) in searchSuggestionList"
         :key="index"
         icon="search"
         @click="$emit('search',item)"
         >
         <span v-html="highlight(item)" slot="title"></span>
         </van-cell>
    </div>
</template>
<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载 有好处只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
    props: {
        searchText:{
            type: String,
            require:true
        }
    },
    data() {
        return{
            searchSuggestionList: [],
        }
    },
    watch: {
        // 监听内容变化
        searchText: {
            immediate: true,
            // 当searchText发生改变,就会调用 handel() 函数
            // handel()函数名称是固定的
            // handler(value) {
            //     this.loadSuggestions(value)
            // }
            handler: debounce(function (value) {
                this.loadSuggestions(value)
            },500)
        }
    },
    methods: {
        async loadSuggestions(value) {
            try {
                const { data } = await getSearchSuggestions(value)
                console.log(data)
                this.searchSuggestionList=data.data.options
            } catch (err) {
                console.log(err)
            }
        },
        highlight(item) {
            const highlightStr = `<span class="active">${this.searchText}</span>`
            // RegExp 正则表达式构造函数
            //     参数一：匹配模式字符串，会根据这个字符串 创建正则对象
            //     参数二：匹配模式，要写到字符串中
            const reg=new RegExp(this.searchText,'gi')
            return item.replace(reg, highlightStr)
        }
        
    }
}
</script>
<style scoped lang="less">
    /deep/.active{
        color: red;
    }
</style>