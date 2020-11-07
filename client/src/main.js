import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import VueRouter from 'vue-router';

import CardDisplay from './components/CardDisplay'
import CardAddition from './components/CardAddition'

Vue.use(VueApollo);
Vue.use(VueRouter);

const apolloClient = new ApolloClient({

  uri: "http://localhost:4000/graphql"

})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false


const routes = [
  { path: '/add-card', component: CardAddition },
  { path: '/', component: CardDisplay }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
