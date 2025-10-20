<template>
  <v-app>
    <!-- Coming Soon Header -->
    <v-app-bar
      :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'primary'"
      :dark="!$vuetify.theme.current.dark"
      prominent
      height="80"
    >
      <v-container fluid class="px-4">
        <v-row align="center" no-gutters>
          <v-col cols="auto">
            <v-avatar size="50" :color="$vuetify.theme.current.dark ? 'primary' : 'white'">
              <v-icon :color="$vuetify.theme.current.dark ? 'white' : 'primary'" size="30">mdi-note-text</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="ml-3">
            <div>
              <h1 class="text-h5 font-weight-bold">{{ $t('app.title') }}</h1>
              <p class="text-caption mb-0 opacity-90">{{ $t('app.subtitle') }}</p>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="d-flex align-center gap-3">
            <v-btn
              :icon="$vuetify.theme.current.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              variant="text"
              @click="toggleTheme"
            ></v-btn>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  :prepend-icon="currentLocale === 'vi' ? 'mdi-flag' : 'mdi-flag-outline'"
                  variant="text"
                  v-bind="props"
                >
                  {{ currentLocale === 'vi' ? 'VI' : 'EN' }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeLocale('vi')">
                  <v-list-item-title>🇻🇳 Tiếng Việt</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeLocale('en')">
                  <v-list-item-title>🇺🇸 English</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              color="white"
              variant="elevated"
              prepend-icon="mdi-arrow-left"
              @click="goBack"
            >
              {{ $t('navigation.back') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <v-row no-gutters class="min-h-screen">
          <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
            <div class="w-100" style="max-width: 400px;">
              <div class="text-center mb-8">
                <v-avatar size="80" color="primary" class="mb-4">
                  <v-icon size="40" color="white">mdi-login</v-icon>
                </v-avatar>
                <h1 class="text-h4 font-weight-bold mb-2">{{ $t('login.title') }}</h1>
                <p class="text-body-1 text-grey-darken-1">{{ $t('login.subtitle') }}</p>
              </div>

              <v-card elevation="8" rounded="xl">
                <v-card-text class="pa-8">
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model="email"
                      :label="$t('login.email')"
                      type="email"
                      :rules="emailRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-email"
                      class="mb-4"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      :label="$t('login.password')"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordRules"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showPassword = !showPassword"
                      class="mb-6"
                    ></v-text-field>

                    <v-btn
                      color="primary"
                      size="large"
                      block
                      :loading="loading"
                      :disabled="!valid"
                      @click="handleLogin"
                      class="mb-4"
                    >
                      {{ $t('login.login') }}
                    </v-btn>

                    <div class="text-center">
                      <v-btn
                        variant="text"
                        color="primary"
                        @click="showRegister = true"
                      >
                        {{ $t('login.noAccount') }} {{ $t('login.register') }}
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>

              <div class="text-center mt-6">
                <v-btn
                  color="primary"
                  variant="outlined"
                  prepend-icon="mdi-calendar"
                  @click="tryCalendar"
                >
                  {{ $t('navigation.viewCalendar') }}
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-none d-md-flex">
            <div class="login-bg w-100 h-100 d-flex align-center justify-center">
              <div class="text-center text-white pa-8">
                <v-icon size="120" class="mb-6">mdi-note-text</v-icon>
                <h2 class="text-h3 font-weight-bold mb-4">{{ $t('app.title') }}</h2>
                <p class="text-h6 opacity-90">{{ $t('app.description') }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Register Dialog -->
    <v-dialog v-model="showRegister" max-width="500">
      <v-card>
        <v-card-title class="text-h5">{{ $t('login.register') }}</v-card-title>
        <v-card-text>
          <v-form ref="registerForm" v-model="registerValid">
            <v-text-field
              v-model="registerEmail"
              :label="$t('login.email')"
              type="email"
              variant="outlined"
              prepend-inner-icon="mdi-email"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="registerPassword"
              :label="$t('login.password')"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :label="$t('login.confirmPassword')"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock-check"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showRegister = false">{{ $t('navigation.cancel') }}</v-btn>
          <v-btn color="primary" @click="handleRegister">{{ $t('login.register') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { locale } = useI18n()
const theme = useTheme()

const emit = defineEmits(['login-success', 'go-back', 'try-calendar'])

// State
const form = ref(null)
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showRegister = ref(false)
const registerValid = ref(false)

const email = ref('')
const password = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

// Computed
const currentLocale = computed(() => locale.value)

// Rules
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters'
]

// Methods
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const changeLocale = (newLocale) => {
  locale.value = newLocale
}

const handleLogin = async () => {
  if (valid.value) {
    loading.value = true
    // Simulate login
    setTimeout(() => {
      loading.value = false
      emit('login-success')
    }, 2000)
  }
}

const handleRegister = () => {
  if (registerValid.value) {
    showRegister.value = false
    // Simulate register
    emit('login-success')
  }
}

const goBack = () => {
  emit('go-back')
}

const tryCalendar = () => {
  emit('try-calendar')
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.login-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="3" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="90" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  animation: float 20s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-100px) rotate(360deg); }
}

.gap-3 {
  gap: 12px;
}
</style>
