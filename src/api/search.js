import request from "@/utils/request";
// 请求获取文章列表数据
export const getSearchSuggestions = q => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 获取搜索结果
export const getSearchResults = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}