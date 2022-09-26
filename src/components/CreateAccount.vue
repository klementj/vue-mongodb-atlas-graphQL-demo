<script setup>
import { ref } from 'vue'
import * as Realm from 'realm-web'
const app = Realm.getApp(import.meta.env.VITE_REALM_ID)

const email = ref("")
const password  = ref("")
const firstName  = ref("")
const lastName  = ref("")
const error  = ref(null)
const response  = ref(null)

const createAccountEmailPassword = async () => {
  try {
    // Create user 
    await app.emailPasswordAuth.registerUser(email.value, password.value)

    // Authenticate the user
    await app.logIn(
      Realm.Credentials.emailPassword(email.value, password.value)
    )

    // Save profile information
    const mongodb = app.currentUser.mongoClient("mongodb-atlas")
    const collection = mongodb.db("vueRealmDB").collection("profile")

    const resp = await collection.insertOne({
      userID: app.currentUser.id,
      first: firstName.value,
      last: lastName.value,
    })

    response.value = resp

  } catch (err) {
    console.error("Failed to Log In ", err)
    error.value = err
  }

}

</script>

<template>
<h1>Create Account</h1>
<label for="firstName">
  First Name
</label>
<br />
<input type="text" name="firstName" id="firstName" v-model="firstName" autocomplete="name">
<br />
<label for="lastName">
  Last Name
</label>
<br />
<input type="lastName" name="lastName" id="lastName" v-model="lastName" autocomplete="given-name">
<br />

<label for="email">
  Email
</label>
<br />
<input type="email" name="email" id="email" v-model="email" autocomplete="email">
<br />

<label for="password">
  Password <br />
  <input type="password" name="password" id="password" v-model="password" autocomplete="new-password">
</label>
<br />

<p v-if="error">{{ error.errorCode }} - {{ error.error }}</p>
<p v-if="response">{{ response }}</p>

<button @click="createAccountEmailPassword">Create Account</button>
</template>