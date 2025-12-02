<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyDetails from '@/components/MyDetails.vue'
import { projects } from './projects'

const pr = ref<
  Array<{
    id: number
    title: string
    difficulty: string
    description: string
    testing: Array<string>
  }>
>()

onMounted(() => {
  if (!localStorage.getItem('pr')) {
    localStorage.setItem('pr', JSON.stringify(projects))
    pr.value = projects
  } else {
    pr.value = JSON.parse(localStorage.getItem('pr'))
  }
})

const difficultyMap = {
  easy: `★☆☆☆`,
  medium: '★★☆☆',
  hard: '★★★☆',
  'very-hard': '★★★★',
}
</script>

<template>
  <h1>50 tiny projects on vue js</h1>
  <MyDetails
    v-for="project in pr"
    :key="project.id"
    :id="project.id"
    name="50-tiny-projects"
    :title="project.title"
    :difficulty="project.difficulty"
    :description="project.description"
    :testing="project.testing"
  />
</template>

<style scoped></style>
