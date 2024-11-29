// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth'
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    },
    baseURL: `http://localhost:${process.env.PORT ?? 3000}`
  }
})
