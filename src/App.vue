<script setup lang="ts">
import { onMounted, ref, toValue } from 'vue'
import MySection from '@/components/MySection.vue'
import { sb } from '@/lib/supabaseClient.js'

/**
 *
 * @type {Ref<Array<{id: number, title: string, projects: Array<{
 *   id: number,
 *   title: string,
 *   projectUrl: string,
 *   testing: Array<string>,
 *   description: string,
 *   level: number,
 *   sectionId: number
 *
 * }>}> | null>}
 */
const pr = ref()

onMounted(async () => {
  const result = await sb
    .from('sections')
    .select('*, projects(*)')
    .order('level', { referencedTable: 'projects', ascending: true })
  if (!result.error && result.status === 200) {
    pr.value = result.data
  }
})

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
    <MySection
      v-for="section of pr"
      :key="section.name"
      :section="section.title"
      :data="section.projects"
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
