<script setup>
import { ref } from 'vue'
import * as Realm from 'realm-web'
const app = Realm.getApp(import.meta.env.VITE_REALM_ID)

const email = ref("")
const password  = ref("")
const error  = ref(null)

const loginEmailPassword = async () => {
  const credentials = Realm.Credentials.emailPassword( email.value, password.value)
  try {
    const user = await app.logIn(credentials)
  } catch (err) {
    console.error("Failed to Log In ", err)
    error.value = err
  }

}

</script>

<template>
<h1>Sign In</h1>
<label for="email">
  Email
</label>
<br />
<input type="email" name="email" id="email" v-model="email">
<br />

<label for="password">
  Password <br />
  <input type="password" name="password" id="password" v-model="password">
</label>
<br />

<p v-if="error">{{ error.errorCode }} - {{ error.error }}</p>

<button @click="loginEmailPassword">Sign in</button>
</template>