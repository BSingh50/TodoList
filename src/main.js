import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';
import list from './components/todo-page';
import vuetify from './plugins/vuetify';
import {store} from './store/store';

Vue.use(Router);
Vue.config.productionTip = false

const router = new Router({
  routes: [
  {
    path: '/list/:id/:listType',
    name: 'list',
    component: list
}
  ],
  mode: 'history'
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
