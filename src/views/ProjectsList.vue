<script setup>
import MySection from '@/components/MySection.vue'
import { onMounted, ref, toValue } from 'vue'
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

async function setStatus(data) {
  const { error } = await sb
    .from('projects')
    .update({ isdone: true })
    .eq('id', data.projectId)
    .select()
  if (error) {
    console.log(error)
  }
}

async function setUrl(data) {
  console.log(data)
  const { error } = await sb
    .from('projects')
    .update({ projecturl: toValue(data.link) })
    .eq('id', data.projectId)
    .select()

  if (error) {
    console.log(error)
  }
}
</script>

<template>
  <MySection
    v-for="section of pr"
    :key="section.name"
    :section="section.title"
    :data="section.projects"
    name="name"
    @set:checked="setStatus"
    @set:url="setUrl"
  />
</template>

<style scoped></style>
