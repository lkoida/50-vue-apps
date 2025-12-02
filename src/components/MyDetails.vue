<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  difficulty: string
  description: string
  testing: Array<string>
}>()
</script>
<template>
  <details>
    <summary>{{props.title}} {{props.difficulty}}</summary>
    <p class="description">{{props.description}}</p>
    <ul class="testing">
      <li v-for="test in testing" :key="test">{{test}}</li>
    </ul>
  </details>
</template>

<style scoped></style>
