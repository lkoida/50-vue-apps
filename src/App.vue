<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyDetails from '@/components/MyDetails.vue'
import { projects } from './projects'

export type ProjectType = {
  id: number
  title: string
  difficulty: string
  description: string
  testing: Array<string>
  isDone?: boolean
}

const pr = ref<Array<ProjectType>>()
const complexityMap = {
  easy: 0,
  medium: 1,
  hard: 2,
  'very-hard': 3,
}

function compare(a: ProjectType, b: ProjectType) {
  return complexityMap[a.difficulty] - complexityMap[b.difficulty]
}

onMounted(() => {
  if (!localStorage.getItem('pr')) {
    localStorage.setItem('pr', JSON.stringify(projects))
    pr.value = projects.toSorted(compare)
  } else {
    pr.value = JSON.parse(localStorage.getItem('pr')).toSorted(compare)
  }
})
</script>

<template>
  <main>
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
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  max-width: 50vw;
}
</style>
