import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import {
  routes
} from './routes';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faDesktop,
  faThList,
  faBook,
  faEllipsisV,
  faTimes,
  faPrint,
  faArrowUp,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';
//import VueSocketIO from 'vue-socket.io';
import dotenv from 'dotenv';
import moment from "moment";

dotenv.config();

//const socketPort = process.env.PORT_SOCKET || 3005;

library.add(faDesktop, faThList, faBook, faEllipsisV, faTimes, faPrint, faArrowUp, faStepForward);

Vue.component('font-awesome-icon', FontAwesomeIcon);

/*
Vue.use(new VueSocketIO({
  connection: `http://127.0.0.1:3007`
}));

Vue.use(new VueSocketIO({
  connection: `http://127.0.0.1:3005`
}));
*/

Vue.use(VueResource);
Vue.use(VueRouter);


const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm:ss');
  }
});

new Vue({
  router: router,
  render: h => h(App),
  renderError(h, error) {
    return h('ERROR', {
      style: {
        color: 'red'
      }
    }, error.stack)
  },
}).$mount('#app');