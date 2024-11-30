<script setup lang="ts">
import { useAsyncData, useAuth, useRequestHeaders } from '#imports'

const { data, status, lastRefreshedAt, getCsrfToken, getProviders, signIn, signOut, getSession } = useAuth()

definePageMeta({
  auth: false, 
  layout: 'login',
})

const providers = await getProviders()
const csrfToken = await getCsrfToken()

const email = ref('')
const password = ref('')

// TEMP: Due to a bug in Nuxt `$fetch` (and thus in `useFetch`),
// we need to transform `undefined` returned from `$fetch` to `null`.
// The issue seems to be in type coalescing happening under the hood of `$fetch`:
// `null` and `''` are both transformed into `undefined` which is not correct.
/*const { data: token } = await useAsyncData(
  '/api/token',
  async () => {
    const headers = useRequestHeaders(['cookie'])
    const result = await $fetch('/api/token', { headers })
    return result ?? null
  }
)*/

const handleSignIn = async () => {
  try {
    const response = await signIn('credentials', {
      callbackUrl: '/',        
      username: email.value, 
      password: password.value,
    });

    if (response?.error) {
      console.error('Login failed:', response.error);
    } else {
      console.log('Login successful');
    }
  } catch (err) {
    console.error('An error occurred during sign-in:', err);
  }
};

</script>


<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form @submit.prevent="handleSignIn" class="space-y-4"> 
            <UInput
              type="text"
              v-model="email"
              color="white"
              variant="outline"
              placeholder="Email"
              size="lg"
              class="w-full rounded-md"
            />
            <UInput
              type="password"
              v-model="password"
              color="white"
              variant="outline"
              placeholder="Password"
              size="lg"
              class="w-full rounded-md"
            />
          <button
            type="submit"
            class="w-full bg-pampas-600 text-white font-medium py-2 rounded-md hover:bg-pampas-900 transition"
          >
            Login
          </button>
        </form>
        <div class="mt-4 text-center">
          <button
            @click="signIn('github', { callbackUrl: '/' })"
            class="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  </template>