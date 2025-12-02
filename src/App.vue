<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {projects} from './projects'

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
  if (!localStorage.getItem('pr')){
    localStorage.setItem('pr', JSON.stringify(projects))
    pr.value = projects
  } else {
    pr.value = JSON.parse(localStorage.getItem('pr'))
  }
})

const difficultyMap = {
  'easy': `★☆☆☆`,
  "medium": "★★☆☆",
  'hard': '★★★☆',
  'very-hard': '★★★★',
}

</script>

<template>
  <h1>50 tiny projects on vue js</h1>
  <ul>
    <li v-for="project of pr" :key="project.id">
      <h3 class="title">
        {{ project.title }} <span class="level">{{ difficultyMap[project.difficulty] }}</span>
      </h3>
      <p class="description">
        {{ project.description }}
      </p>

      <ul class="testing">
        <li v-for="consideration in project.testing" :key="consideration">{{consideration}}</li>
      </ul>
    </li>
  </ul>
</template>

<style scoped></style>
