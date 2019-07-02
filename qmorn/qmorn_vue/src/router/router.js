import App from '../App'

import login from '../page/user/Login.vue'
import main from '../page/main/Main.vue'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        redirect: '/user'
    }, {
        path: '/user',
        component: login
    }, {
        path: '/main',
        component: main
    }]
}]