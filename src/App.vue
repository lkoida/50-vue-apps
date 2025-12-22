<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <main>
    <header class="header">
      <h1 class="title">50 tiny projects on vue js</h1>
      <button class="button logout" v-show="usersStore.isLoggedIn" @click="usersStore.logout">
        Logout
      </button>
      <menu class="menu" v-if="usersStore.isLoggedIn">
        <li class="menu-item">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
      </menu>
    </header>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 48px;
  max-width: 100svmax;
  min-height: 100vh;

  & header {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr 54px;
    padding-block-start: 12px;
    padding-inline: 24px;
    width: 100%;
    background: #312b42;
    box-shadow: 1px 1px 1px 1px #151018;
    position: sticky;
    top: 0;

    & .title {
      grid-row: 1;
    }
    & .logout {
      grid-row: 1;
      align-self: center;
      grid-column: 2;
      width: fit-content;
      padding-inline: 12px;
    }
    & menu {
      grid-row: 2;
      grid-column: 1;
    }
  }
}
</style>
