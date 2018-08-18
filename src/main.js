// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';

import './fonts/iconfont.css';

import './styles/reset.less';
import './styles/common.less';

import './styles/test.scss';

import * as filters from './filters';

// import './mock'

Vue.use(ElementUI, {
  size: 'mini'
});

// iconfont 图标组件
import ZIcon from './components/z-icon';
Vue.component('z-icon', ZIcon);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// 检查 token 是否失效
function checkToken() {
  const token = store.getters.token;

  return !!token
}

// 路由白名单
const whiteList = ['/login', '/redirect', '/test', '/404'];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else if (checkToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      // 权限判断
      // TODO

      next()
    }
  } else {
    ElementUI.Message.warning('登录已失效，请重新登录');
    store.dispatch('userLogout')
    next({
      path: '/login'
    })
    NProgress.done()
  }

});

router.afterEach((to, from) => {
  document.title = to.meta.title ? to.meta.title + ' - 客服系统' : '客服系统'
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
