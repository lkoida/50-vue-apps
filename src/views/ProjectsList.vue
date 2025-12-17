<script setup>
import MySection from '@/components/MySection.vue'
import { onMounted, ref } from 'vue'
import { sb } from '@/lib/supabaseClient.js'

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

onMounted(async () => {
  const result = await sb
    .from('sections')
    .select('*, projects(*)')
    .order('level', { referencedTable: 'projects', ascending: true })
  if (!result.error && result.status === 200) {
    pr.value = result.data
  }
})
</script>

<template>
  <MySection
    v-for="section of pr"
    :key="section.name"
    :section="section.title"
    :data="section.projects"
    name="outer-startic-name"
  />
</template>

<style scoped></style>
