import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/layout'

// const Home = resolve => require(['../views/home/index'], resolve)
// const e404 = resolve => require(['../views/misc/404'], resolve)
// const Login = resolve => require(['../views/login/index'], resolve)
// const modpwd = resolve => require(['../views/misc/modpwd'], resolve)
// const none = resolve => require(['../views/misc/none'], resolve)
// const settingPlatform = resolve => require(['../views/settings/platform'], resolve)

// const _import = file => resolve => require(['../views/' + file], resolve)

// const Home = _import('home/index')
// const e404 = _import('misc/404')
// const Login = _import('login/index')
// const modpwd = _import('misc/modpwd')
// const none = _import('misc/none')
// const settingPlatform = _import('settings/platform')

// import Home from '../views/home/index'
// import e404 from '../views/misc/404'
// import Login from '../views/login/index'
// import modpwd from '../views/misc/modpwd'
// import none from '../views/misc/none'
// import settingPlatform from '../views/settings/platform'

const Home = () => import('../views/home/index')
const e404 = () => import('../views/misc/404')
const Login = () => import('../views/login/index')
const modpwd = () => import('../views/misc/modpwd')
const none = () => import('../views/misc/none')
const settingPlatform = () => import('../views/settings/platform')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: Layout,
      redirect: '/index',
      children: [{
          path: 'index',
          component: Home,
          meta: {
            hideCurPos: true
          }
        },{
          path: 'modpwd',
          name: '修改密码',
          component: modpwd,
          meta: {
            title: '修改密码'
          }
        }
      ]
    },
    { path: '/kb', name: '知识库管理', component: Layout, redirect: '/kb/list', children: [
      { path: 'list', component:none, name: 'kb-list', meta: { title: '知识库列表' } },
    ] },
    { path: '/blacklist', name: '黑名单', component: Layout, redirect: '/blacklist/index', children: [
      { path: 'index', component: none, name: 'blacklist-index', meta: { title: '黑名单管理' } },
    ] },
    { path: '/feedback', name: '投诉反馈管理', component: Layout, redirect: '/feedback/list', children: [
      { path: 'list', component: none, name: 'feedback-list', meta: { title: '投诉反馈列表' } },
      { path: 'detail/:id', component: none, name: 'feedback-detail', meta: { title: '投诉反馈详情' } },
    ] },
    { path: '/settings', name: '设置', component: Layout, redirect: '/settings/platform', children: [
      { path: 'platform', component: settingPlatform, name: 'settings-platform', meta: { title: '应用管理' } },
      { path: 'link', component: none, name: 'settings-link', meta: { title: '应用跳转' } },
      { path: 'kb', component: none, name: 'settings-kb', meta: { title: '知识库分类' } },
      { path: 'feedback', component: none, name: 'settings-feedback', meta: { title: '投诉反馈分类' } },
      { path: 'work-order', component: none, name: 'work-order', meta: { title: '工单模板管理' } }
    ] },
    { path: '/system', name: '系统配置', component: Layout, redirect: '/system/role', children: [
      { path: 'menu', component: none, name: 'system-menu', meta: { title: '菜单管理' } },
      { path: 'role', component: none, name: 'system-role', meta: { title: '角色管理' } },
      { path: 'user', component: none, name: 'system-user', meta: { title: '管理员管理' } }
    ] },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: none
    },
    {
      path: '*',
      name: '404',
      component: Layout,
      redirect: '/404',
      children: [{
        path: '404',
        component: e404
      }]
    }
  ]
})
