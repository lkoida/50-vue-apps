<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const routes = computed(() => router.options.routes)
</script>
<template>
  <nav class="nav-container">
    <ol class="nav">
      <li class="nav-item" v-for="route of routes" :key="route.path">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ol>
  </nav>
  <router-view />
</template>
<style scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 32px;
  margin-block-end: 24px;

  & .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    & .nav-item {
      display: flex;
      height: 100%;
      & a {
        display: inline-flex;
        align-items: center;
        height: 100%;
        padding-inline: 12px;
        text-decoration: none;

        &[class$='active'] {
          border-block-end: orangered 1px solid;
        }
      }
    }
  }
}
</style>
