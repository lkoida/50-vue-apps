import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sb } from '@/lib/supabaseClient.js'

export const useUsersStore = defineStore('users', () => {
  const router = useRouter()
  const isLoggedIn = ref(false)


  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
      isLoggedIn.value = true
      router.push({ name: 'projects' })
    } else if(event === 'SIGNED_OUT') {
      isLoggedIn.value = false
      router.push({name: 'login'})
    }
  })

  async function login({email, password})  {
    const data = await sb.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!data.error) {
      isLoggedIn.value = true
      await router.push({ name: 'projects' })
    } else {
      console.log(data)
    }
  }

  async function logout() {
    try{
      await sb.auth.signOut()

    } catch (e) {
      console.log(e)
    }
  }


  return {isLoggedIn, login, logout}
})
