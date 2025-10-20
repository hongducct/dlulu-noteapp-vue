<template>
  <v-app>
    <!-- Coming Soon Header -->
    <v-app-bar
      :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'primary'"
      :dark="!$vuetify.theme.current.dark"
      prominent
      height="80"
      class="header-bar"
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
            <v-chip 
              :color="$vuetify.theme.current.dark ? 'warning' : 'warning'" 
              variant="elevated" 
              prepend-icon="mdi-clock-outline"
            >
              {{ countdownText }}
            </v-chip>
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
              prepend-icon="mdi-rocket-launch"
              @click="tryDemo"
            >
              {{ $t('navigation.tryNow') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <v-container fluid class="pa-0">
          <v-row no-gutters align="center" class="min-h-screen">
            <v-col cols="12" lg="6" class="hero-left">
              <v-container class="py-16">
                <div class="hero-content">
                  <h1 class="hero-title">
                    {{ $t('app.description') }}
                    <span class="text-primary">thông minh</span>
                  </h1>
                  <p class="hero-subtitle">
                    {{ $t('app.subDescription') }}
                  </p>
                  <div class="hero-actions">
                    <v-btn
                      color="primary"
                      size="x-large"
                      prepend-icon="mdi-play"
                      @click="scrollToFeatures"
                      class="hero-btn"
                    >
                      {{ $t('navigation.viewFeatures') }}
                    </v-btn>
                    <v-btn
                      color="primary"
                      variant="outlined"
                      size="x-large"
                      prepend-icon="mdi-calendar"
                      @click="scrollToCalendar"
                      class="hero-btn"
                    >
                      {{ $t('navigation.viewCalendar') }}
                    </v-btn>
                  </div>
                </div>
              </v-container>
            </v-col>
            <v-col cols="12" lg="6" class="hero-right">
              <div class="demo-container">
                <v-card
                  class="demo-preview-card"
                  elevation="16"
                  rounded="xl"
                >
                  <v-card-text class="pa-0">
                    <div class="demo-preview">
                      <div class="demo-header">
                        <div class="demo-dots">
                          <span class="demo-dot red"></span>
                          <span class="demo-dot yellow"></span>
                          <span class="demo-dot green"></span>
                        </div>
                        <div class="demo-title">{{ $t('demo.title') }}</div>
                      </div>
                      <div class="demo-content">
                        <div class="demo-sidebar">
                          <div class="demo-menu-item active">
                            <v-icon size="20">mdi-note-text</v-icon>
                            <span>{{ $t('features.smartNotes.title') }}</span>
                          </div>
                          <div class="demo-menu-item">
                            <v-icon size="20">mdi-checkbox-marked-circle</v-icon>
                            <span>{{ $t('features.todoList.title') }}</span>
                          </div>
                          <div class="demo-menu-item">
                            <v-icon size="20">mdi-calendar</v-icon>
                            <span>{{ $t('features.lunarCalendar.title') }}</span>
                          </div>
                        </div>
                        <div class="demo-main">
                          <div class="demo-note">
                            <div class="demo-note-header">
                              <v-icon color="primary">mdi-note-text</v-icon>
                              <span>{{ $t('demo.sampleNote') }}</span>
                            </div>
                            <div class="demo-note-content">
                              {{ $t('demo.sampleNoteContent') }}
                            </div>
                          </div>
                          <div class="demo-todo">
                            <v-checkbox size="small"></v-checkbox>
                            <span>{{ $t('demo.sampleTodo') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <v-container class="py-16">
          <v-row>
            <v-col cols="12" class="text-center mb-12">
              <h2 class="section-title">{{ $t('features.title') }}</h2>
              <p class="section-subtitle">{{ $t('features.subtitle') }}</p>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col
              v-for="(feature, index) in features"
              :key="index"
              cols="12"
              sm="6"
              lg="4"
            >
              <v-card
                class="h-100 feature-card"
                elevation="6"
                hover
                rounded="xl"
              >
                <v-card-text class="pa-8 text-center">
                  <v-avatar
                    :color="feature.color"
                    size="90"
                    class="mb-6"
                  >
                    <v-icon
                      :icon="feature.icon"
                      size="45"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                  <h3 class="feature-title">
                    {{ $t(feature.titleKey) }}
                  </h3>
                  <p class="feature-description">
                    {{ $t(feature.descriptionKey) }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Calendar Demo Section -->
      <section id="calendar" class="calendar-section">
        <v-container class="py-16">
          <v-row>
            <v-col cols="12" class="text-center mb-12">
              <h2 class="section-title">{{ $t('calendar.title') }}</h2>
              <p class="section-subtitle">{{ $t('calendar.subtitle') }}</p>
            </v-col>
          </v-row>
          
          <v-row justify="center">
            <v-col cols="12" xl="10">
              <LunarCalendar
                :todos="sampleTodos"
                :notes="sampleNotes"
                @date-select="handleDateSelect"
              />
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <v-container class="py-16">
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <v-card
                color="primary"
                class="cta-card"
                rounded="xl"
                elevation="12"
              >
                <v-card-text class="pa-12">
                  <h2 class="cta-title">
                    {{ $t('cta.title') }}
                  </h2>
                  <p class="cta-subtitle">
                    {{ $t('cta.subtitle') }}
                  </p>
                  <div class="cta-actions">
                    <v-btn
                      color="white"
                      size="x-large"
                      variant="elevated"
                      prepend-icon="mdi-rocket-launch"
                      @click="tryDemo"
                      class="cta-btn"
                    >
                      {{ $t('navigation.startNow') }}
                    </v-btn>
                    <v-btn
                      color="white"
                      variant="outlined"
                      size="x-large"
                      prepend-icon="mdi-email"
                      href="mailto:contact@dlulunote.com"
                      class="cta-btn"
                    >
                      {{ $t('navigation.contact') }}
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Footer -->
      <v-footer class="footer">
        <v-container>
          <v-row>
            <v-col cols="12" class="text-center">
              <p class="footer-text">{{ $t('footer.copyright') }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import LunarCalendar from './LunarCalendar.vue'

const { locale } = useI18n()
const theme = useTheme()

const emit = defineEmits(['auth-success', 'show-login', 'try-calendar'])

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let countdownInterval = null

const features = [
  {
    icon: 'mdi-note-text',
    titleKey: 'features.smartNotes.title',
    descriptionKey: 'features.smartNotes.description',
    color: 'primary'
  },
  {
    icon: 'mdi-checkbox-marked-circle',
    titleKey: 'features.todoList.title',
    descriptionKey: 'features.todoList.description',
    color: 'success'
  },
  {
    icon: 'mdi-calendar',
    titleKey: 'features.lunarCalendar.title',
    descriptionKey: 'features.lunarCalendar.description',
    color: 'warning'
  },
  {
    icon: 'mdi-account-group',
    titleKey: 'features.teamwork.title',
    descriptionKey: 'features.teamwork.description',
    color: 'info'
  },
  {
    icon: 'mdi-bell',
    titleKey: 'features.reminders.title',
    descriptionKey: 'features.reminders.description',
    color: 'error'
  },
  {
    icon: 'mdi-chart-line',
    titleKey: 'features.statistics.title',
    descriptionKey: 'features.statistics.description',
    color: 'purple'
  }
]

// Sample data for calendar demo
const sampleTodos = ref([
  {
    id: '1',
    title: 'Hoàn thành báo cáo',
    description: 'Làm báo cáo cuối tháng',
    completed: false,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    teamId: null
  },
  {
    id: '2',
    title: 'Họp team',
    description: 'Họp định kỳ hàng tuần',
    completed: true,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    teamId: null
  }
])

const sampleNotes = ref([
  {
    id: '1',
    title: 'Ghi chú đổ xăng',
    type: 'gas-refill',
    content: {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      liters: '50',
      cost: '1200000',
      station: 'Petrolimex'
    },
    visibility: 'private'
  },
  {
    id: '2',
    title: 'Nhắc nhở họp',
    type: 'reminder',
    content: {
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      time: '09:00',
      description: 'Họp với khách hàng quan trọng'
    },
    visibility: 'private'
  }
])

const currentLocale = computed(() => locale.value)

const countdownText = computed(() => {
  if (days.value > 0) {
    return `${days.value} ${locale.value === 'vi' ? 'ngày còn lại' : 'days left'}`
  } else if (hours.value > 0) {
    return `${hours.value} ${locale.value === 'vi' ? 'giờ còn lại' : 'hours left'}`
  } else if (minutes.value > 0) {
    return `${minutes.value} ${locale.value === 'vi' ? 'phút còn lại' : 'minutes left'}`
  } else {
    return locale.value === 'vi' ? 'Sắp ra mắt!' : 'Coming Soon!'
  }
})

const updateCountdown = () => {
  const now = new Date().getTime()
  const launchDate = new Date('2024-12-31 23:59:59').getTime()
  const distance = launchDate - now

  if (distance > 0) {
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  } else {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  }
}

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToCalendar = () => {
  document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })
}

const handleDateSelect = (date) => {
  console.log('Selected date:', date)
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const changeLocale = (newLocale) => {
  locale.value = newLocale
}

const tryDemo = () => {
  emit('show-login')
}

const tryCalendar = () => {
  emit('try-calendar')
}

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
/* Global Styles */
.main-content {
  padding: 0;
}

.min-h-screen {
  min-height: 100vh;
}

/* Header Styles */
.header-bar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.hero-section::before {
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

.hero-left {
  position: relative;
  z-index: 2;
}

.hero-right {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-btn {
  min-width: 200px;
}

.demo-container {
  max-width: 500px;
  width: 100%;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-100px) rotate(360deg); }
}

/* Demo Preview Card */
.demo-preview-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.demo-preview {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-header {
  background: #f1f3f4;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.demo-dots {
  display: flex;
  gap: 6px;
}

.demo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.demo-dot.red { background: #ff5f57; }
.demo-dot.yellow { background: #ffbd2e; }
.demo-dot.green { background: #28ca42; }

.demo-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.demo-content {
  display: flex;
  min-height: 300px;
}

.demo-sidebar {
  width: 200px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  padding: 16px 0;
}

.demo-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-menu-item:hover {
  background: #e3f2fd;
  color: #1976d2;
}

.demo-menu-item.active {
  background: #e3f2fd;
  color: #1976d2;
  border-right: 3px solid #1976d2;
}

.demo-main {
  flex: 1;
  padding: 16px;
  background: white;
}

.demo-note {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #1976d2;
}

.demo-note-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.demo-note-content {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.demo-todo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  color: #333;
  font-size: 14px;
}

/* Feature Cards */
.feature-card {
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .demo-content {
    flex-direction: column;
  }
  
  .demo-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .demo-menu-item {
    justify-content: center;
  }
  
  .demo-menu-item.active {
    border-right: none;
    border-bottom: 3px solid #1976d2;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Section Styles */
.features-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.calendar-section {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
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

.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
}

/* Typography */
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #666;
  margin-bottom: 0;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.feature-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: white;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.cta-btn {
  min-width: 200px;
}

.footer-text {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Responsive Design */
@media (min-width: 768px) {
  .hero-actions {
    flex-direction: row;
    gap: 1.5rem;
  }
  
  .cta-actions {
    flex-direction: row;
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .hero-left {
    padding-right: 2rem;
  }
  
  .hero-right {
    padding-left: 2rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Gap utilities */
.gap-3 {
  gap: 12px;
}

.gap-2 {
  gap: 8px;
}
</style>