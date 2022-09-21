<script setup>
import { useClient, defaultPlugins } from 'villus'
import * as Realm from 'realm-web'
import { useQuery } from 'villus'
import { ref } from 'vue'


const realmApp = new Realm.App({ id: import.meta.env.VITE_REALM_ID });

// Anonymous login
// const credentials = Realm.Credentials.anonymous();
// let user
// try {
//   user = await realmApp.logIn(credentials);
//   console.log(user.accessToken)
// } catch(err) {
//   console.error("Failed to log in", err);
// }

async function loginApiKey(key) {
  // Create an API key credentials
  const credentials = Realm.Credentials.apiKey(key)
  try {
    const user = await realmApp.logIn(credentials)
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === realmApp.currentUser.id)
    return user
  } catch (error) {
    console.error("Failed to log in", error);
  }
}

const user = await loginApiKey(import.meta.env.VITE_API_KEY)
console.log("Successfully logged in!", user);

function authPlugin({ opContext }) {
  // opContext.headers.apiKey = import.meta.env.VITE_API_KEY;
  opContext.headers.Authorization = `Bearer ${user.accessToken}`;
}

useClient({
  url: import.meta.env.VITE_MONGODB_URL,
  use: [authPlugin, ...defaultPlugins()]
})

const allFilms = `
  query query {
  movie {
    _id
		cast
		countries
		directors
		fullplot
		genres
		languages
		lastupdated
		metacritic
		num_mflix_comments
		plot
		poster
		rated
		released
		runtime
		title
		type
		writers
		year
  }
}
`
  
const { data } = useQuery({
  query: allFilms,
})

defineProps({
  msg: String
})

const count = ref(0)


</script>

<template>
  <pre>{{ user }}</pre>
  <h1>Data</h1>
  <pre>{{ data }}</pre>
  <h2>{{ msg }}</h2>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
