<template>
  <h1>Home</h1>
  <pre v-if="user">
    {{user}}
  </pre>
</template>

<script setup>
import { ref } from 'vue'
import * as Realm from 'realm-web'
const app = Realm.getApp(import.meta.env.VITE_REALM_ID)

const user = ref(null)

 await app.logIn(
  Realm.Credentials.emailPassword('jon@doe.com', 't3stt3stt3st')
 )

 const mongodb = app.currentUser.mongoClient("mongodb-atlas")
 const collection = mongodb.db("vueRealmDB").collection("profile")
 const profile = await collection.findOne({ userID: app.currentUser.id})
 console.log('app.currentUSer: ', app.currentUser)
 console.log('User Profile', profile)
 user.value = profile

</script>