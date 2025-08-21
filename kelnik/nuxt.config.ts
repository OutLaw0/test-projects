import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/styles/fonts.css',
    '@/assets/styles/main.css',
    'nouislider/dist/nouislider.css'
  ],
  app: {
    head: {
      title: 'Квартиры — каталог',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { charset: 'utf-8' }
      ]
    }
  },
  nitro: {
    preset: 'node-server'
  },
  compatibilityDate: '2024-11-01'
}); 