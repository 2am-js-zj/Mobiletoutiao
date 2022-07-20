import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

// 动态设置rem基准值
import 'amfe-flexible'

import { Button, Cell, CellGroup } from 'vant';

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
