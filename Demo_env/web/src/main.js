import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BigNumber from 'bignumber.js';
import './assets/css/luniverstar.css';
import './assets/vendor/css/bootstrap.css';
import {VuePlugin} from "vuera";
import VueEllipsis from "vue-ellipsis";
import VModal from "vue-js-modal";

Vue.use(VuePlugin);
Vue.use(VueAxios, axios);
Vue.use(BigNumber);
Vue.use(VueEllipsis);
Vue.use(VModal, {componentName: "qr-modal", injectModalsContainer: true});

Vue.config.productionTip = false;

Vue.directive("innerHtml", {
  inserted: function (el, binding) {
    el.innerHTML = binding.value;
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
