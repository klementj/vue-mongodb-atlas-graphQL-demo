<script setup>
import * as Realm from 'realm-web'
const realmApp = new Realm.App({ id: import.meta.env.VITE_REALM_ID });

const email = "someone@example.com";
const password = "Pa55w0rd";
// await realmApp.emailPasswordAuth.registerUser({ email, password });
</script>

<template>
<label for="email">
  HEJ
  <input type="email" name="email" id="email">
</label>

<label for="password">
  <input type="password" name="password" id="password">
</label>
</template>