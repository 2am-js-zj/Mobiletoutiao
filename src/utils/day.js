import Vue from "vue";
import dayjs from "dayjs";
import JSONBig from 'json-bigint'

// 能处理js中数据超出安全整数范围的问题
// JSONBig.parse()      //把json格式的字符串转为js对象
// JSONBig.stringify()  //把js对象转为json格式的字符串

// dayjs默认英文，我们这里配置中文

// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件 relativeTime 插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法
// 参数一：过滤器名称
// 参数二：过滤器函数
// 使用方式：{{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

// console.log(dayjs().format('YYYY-MM-DD'))
// // dayjs().format('YYYY-MM-DD')

// console.log(dayjs().to(dayjs('2001'))) //22年前


// dayjs().from(dayjs('1990')) 2 years ago
// dayjs().from(dayjs(), true) // 2 years

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()