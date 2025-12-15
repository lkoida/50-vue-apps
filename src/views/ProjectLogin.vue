<script setup>
import { onMounted, ref, toValue } from 'vue'
import { sb } from '@/lib/supabaseClient.js'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore.js'

const email = ref('')
const password = ref('')

const router = useRouter()

const usersStore = useUsersStore()

onMounted(() => {
  sb.auth.onAuthStateChange((event, session) => {
    if (['INITIAL_SESSION', 'SIGNED_IN'].includes(event)) {
      router.push({ name: 'projects' })
    }
    console.log(event, session)
  })
})

async function login() {
  await usersStore.login({ email: toValue(email), password: toValue(password) })
}
</script>

<template>
  <form @submit.prevent="login">
    <label>
      <span>Login</span>
      <input type="text" name="user_name" placeholder="user@test.com" v-model.trim="email" />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="user_pass" placeholder="password" v-model.trim="password" />
    </label>

    <button>Login</button>
  </form>
</template>

<style scoped>
& form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: 450px;
  min-width: 350px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;
  &:focus-within {
    box-shadow: 5px 2px 20px 20px color-mix(in oklch shorter hue, var(--bg-dark), white 5%);
  }

  & label {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
    & input {
      width: 100%;
      height: 42px;
      font-size: 1.2rem;
      padding-inline-start: 4px;
    }
  }

  & button {
    height: 42px;
    font-size: 1.2rem;
  }
}
</style>
