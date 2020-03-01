import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment/moment'


Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.filter('dateFormat', function(daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(daraStr).format(pattern)
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')