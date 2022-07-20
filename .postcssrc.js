module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            // 这里的rootValue是设置为设计稿宽度的1/10
            // 但是vant是基于375写的 
            // 所以必须设置为37.5
            // rootValue: 37.5,

            // postcss-pxtorem 处理每个css文件都会来调用这个函数
            // 被处理的css文件信息通过参数传递给该函数
            rootValue({ file }) {
                // obj是样式的对象
                // console.log('处理的css文件' + file)
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*']
        }
    }
}