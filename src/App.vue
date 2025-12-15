<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <main>
    <h1>50 tiny projects on vue js <button v-show="usersStore.isLoggedIn" @click="usersStore.logout">Logout</button></h1>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 45vw;
}
</style>
