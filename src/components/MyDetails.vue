<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  difficulty: string
  description: string
  testing: Array<string>
}>()

const isDone = defineModel('isDone')

const difficultyMap = {
  easy: `★☆☆☆`,
  medium: '★★☆☆',
  hard: '★★★☆',
  'very-hard': '★★★★',
}
</script>
<template>
  <details class="details">
    <summary class="summary">
      {{ props.title }} <span class="difficulty"> {{ difficultyMap[props.difficulty] }}</span>
    </summary>
    <p class="description">{{ props.description }}</p>
    <ul class="testing">
      <li v-for="test in testing" :key="test">{{ test }}</li>
    </ul>

  </details>
</template>

<style scoped>
.details {
  border-bottom: 1px solid black;
  min-height: 48px;
   & .summary {
     cursor: pointer;
   }
}
</style>
