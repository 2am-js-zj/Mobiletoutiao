// 封装本地存储操作模块
// 存储数据
export const setItem = (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        // 如果这个data不是有效的json格式数据
        // 那么会报错，执行下面一个语句
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
// 删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}