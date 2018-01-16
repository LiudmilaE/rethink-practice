// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://localhost:8081');

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
  },
  sockets: {
    connect() {
      console.log('sockets connected')
    },
    disconnect() {
      console.log('sockets disconnected')
    },
    articleAdd: function(val){
      console.log(val)
      console.log('this method was fired by the socket server. eg: io.emit("articleAdd", data)')
    }
  },
})
