// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import querystring from 'query-string'
import '@/assets/css/bootstrap.css'
import '@/assets/css/stack-interface.css'
import '@/assets/css/theme-serpent.css'
import '@/assets/css/custom.css'

// premise
import VueResource from 'vue-resource'
import global from './global.js'
Vue.prototype.$querystring = querystring
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true

// global setting
Vue.prototype.$global = global

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.requireAuth)) { // if need login
        if (to.name === 'Login') {
            next()
        } else {
            let token
            if (global.tokenStorageType === 0) {
                token = sessionStorage.getItem('token')
            } else {
                token = localStorage.getItem('token')
            }
            if (token != null) {
                Vue.http.post(global.apiHead + '/oauth/islogin', { token, state: global.state }).then((response) => {
                    console.log(response.body)
                    if (response.body.r === 'OK') {
                        next()
                    } else {
                        alert('r: ' + response.body.r)
                        next('/Login')
                    }
                }, (response) => {
                    alert(response)
                    next('/Login')
                })
            } else {
                next('/Login')
            }
        }
    } else {
        next()
    }
})

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
