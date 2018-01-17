// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://localhost:3000'); //should be the same as on server side
SocketInstance.on('connection', function (data) {
  console.log(data);
})

Vue.use(VueSocketIO, SocketInstance)
Vue.use(Buefy);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    user: null,
    //newArticle: null,
  },
})
