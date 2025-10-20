import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// i18n
import { createI18n } from 'vue-i18n'
import vi from './locales/vi.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'vi',
  fallbackLocale: 'en',
  messages: {
    vi,
    en
  }
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          accent: '#8c9eff',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#fafafa',
          surface: '#ffffff'
        }
      },
      dark: {
        colors: {
          primary: '#8c9eff',
          secondary: '#9575cd',
          accent: '#667eea',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#121212',
          surface: '#1e1e1e'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(i18n)
app.mount('#app')

