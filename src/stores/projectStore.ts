import { defineStore } from 'pinia'
import { sb } from '@/lib/supabaseClient'

export const useProjectStore = defineStore('projectStore', () => {
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
    markDone,
    setUrl,
  }
})
