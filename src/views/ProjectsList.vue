<script setup>
import { onMounted, ref } from 'vue'
import MySection from '@/components/MySection.vue'
import { useProjectStore } from '@/stores/projectStore.ts'

/**
 *
 * @type {Ref<Array<{id: number, title: string, projects: Array<{
 *   id: number,
 *   title: string,
 *   projecturl: string,
 *   testing: Array<string>,
 *   description: string,
 *   level: number,
 *   sectionid: number,
 *   isdone: boolean
 *
 * }>}> | null>}
 */
const pr = ref()

const { getProjects } = useProjectStore()

onMounted(async () => {
  pr.value =  await getProjects()
})
</script>

<template>
  <section>
    <MySection
      v-for="section of pr"
      :key="section.name"
      :section="section.title"
      :data="section.projects"
      name="outer-startic-name"
    />
  </section>
</template>

<style scoped>
section {
  width: 50%;
  padding-inline: 24px;
  align-self: start;
}
</style>
