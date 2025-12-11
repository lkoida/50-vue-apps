<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <h1>50 tiny projects on vue js</h1>
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
}
</style>
