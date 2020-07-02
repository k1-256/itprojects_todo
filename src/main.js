import Vue from 'vue';
import VueMasonry from 'vue-masonry-css';
import VueJSModal from 'vue-js-modal';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMasonry);
Vue.use(VueJSModal, { dialog: true });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
