import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

// 动态设置rem基准值
import 'amfe-flexible'
// 加载dayjs初始化配置
import './utils/day.js'

import { Button, Cell, CellGroup, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Dialog, Tab, Tabs, List, PullRefresh, Popup, Search, Loading, Divider, Picker, DatetimePicker } from 'vant';

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Picker);
Vue.use(DatetimePicker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
