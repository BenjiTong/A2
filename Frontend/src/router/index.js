import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Redirect from '@/components/Redirect'
import TestD3 from '@/components/TestD3'
import MultiLineChart from '@/components/MultiLineChart'
import TestEmptyPage from '@/components/TestEmptyPage'
import WorldMap from '@/components/WorldMap'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            meta: { // 加一个自定义obj
                requireAuth: true // 这个参数 true 代表需要登录才能进入A
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/oauth/redirect',
            name: 'OauthRedirect',
            component: Redirect
        },
        {
            path: '/test/d3',
            name: 'TestD3',
            component: TestD3
        },
        {
            path: '/test/line_chart',
            name: 'TestLineChart',
            component: MultiLineChart
        },
        {
            path: '/test/empty',
            name: 'TestEmptyPage',
            component: TestEmptyPage
        },
        {
            path: '/test/world',
            name: 'WorldMap',
            component: WorldMap
        }
    ]
})
