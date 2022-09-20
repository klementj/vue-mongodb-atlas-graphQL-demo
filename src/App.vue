<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

import { useClient } from 'villus'
import * as Realm from 'realm-web'

useClient({
  url: import.meta.env.VITE_SWAPI_URL
})

const realmApp = new Realm.App({ id: import.meta.env.VITE_REALM_ID });
const credentials = Realm.Credentials.anonymous();
try {
  const user = await realmApp.logIn(credentials);
  console.log(user)
} catch(err) {
  console.error("Failed to log in", err);
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
