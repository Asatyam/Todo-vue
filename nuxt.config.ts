// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
        transpile: ['@vuepic/vue-datepicker']
    }

})
