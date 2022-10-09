import Home from './components/Home.vue'
import Apontamentos from './components/Apontamentos.vue'

export const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'apontamentos',
    path: '/apontamentos',
    component: Apontamentos
}];