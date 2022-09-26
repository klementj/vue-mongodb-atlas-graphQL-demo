import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/Home.vue' 
import LoginPage from './pages/Login.vue' 

import * as Realm from 'realm-web'
new Realm.App({ id: import.meta.env.VITE_REALM_ID });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
  ]
})

router.beforeEach((to, from) => {
  const app = Realm.getApp(import.meta.env.VITE_REALM_ID)
  const isAuth = app.currentUser
  console.log('isAuth: ', !isAuth);
  console.log('to.path: ', to.path);

})

createApp(App).use(router).mount('#app')
