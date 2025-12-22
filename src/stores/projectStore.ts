import { defineStore } from 'pinia'
import { sb } from '@/lib/supabaseClient'

export const useProjectStore = defineStore('projectStore', () => {
  async function getProjects() {
    try {
      const response = await sb
        .from('sections')
        .select('*, projects(*)')
        .order('level', { referencedTable: 'projects', ascending: true })
      if (!response.error && response.status === 200) {
        return response.data
      }
      console.log(response.error)
    } catch (e) {
      console.error(e)
    }
  }

  async function markDone(id: number) {
    try {
      const { error } = await sb.from('projects').update({ isdone: true }).eq('id', id).select()
      if (error) {
        console.log(error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function setUrl(id: number, url: string) {
    const { error } = await sb.from('projects').update({ projecturl: url }).eq('id', id).select()

    if (error) {
      console.log(error)
    }
  }

  return {
    getProjects,
    markDone,
    setUrl,
  }
})
