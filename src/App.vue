<script setup>
import { onMounted, ref, toValue } from 'vue'
import MySection from '@/components/MySection.vue'
import projects from '@/projects.json'

const pr = ref()

onMounted(() => {
  if (!localStorage.getItem('pr')) {
    localStorage.setItem('pr', JSON.stringify(projects))
    pr.value = projects
  } else {
    pr.value = JSON.parse(localStorage.getItem('pr'))
  }
})

function flushStore() {
  if (localStorage.getItem('pr')) {
    localStorage.removeItem('pr')
    window.location.reload()
  }
}

function setStatus(data) {
  const projectIndex = pr.value[data.section].findIndex((project) => project.id === data.projectId)

  pr.value[data.section][projectIndex]['isDone'] = true

  localStorage.setItem('pr', JSON.stringify(toValue(pr)))
}

function setUrl(data) {
  const projectIndex = pr.value[data.section].findIndex((project) => project.id === data.projectId)
  pr.value[data.section][projectIndex]['projectURL'] = data.link
}
</script>

<template>
  <main>
    <h1>50 tiny projects on vue js</h1>
    <button class="remove" @click="flushStore">Flush store</button>
    <MySection
      v-for="(project, name) of pr"
      :key="project.id"
      :section="name"
      :data="project"
      name="name"
      @set:checked="setStatus"
      @set:url="setUrl"
    />
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  max-width: 50vw;
}
</style>
