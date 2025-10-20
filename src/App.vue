<script setup>
import { ref, onMounted } from 'vue'
import ComingSoon from './components/ComingSoon.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import LunarCalendar from './components/LunarCalendar.vue'

// State
const currentView = ref('coming-soon') // 'coming-soon', 'login', 'dashboard', 'calendar'
const isAuthenticated = ref(false)
const isLoading = ref(true)

// Sample data for calendar
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

// Methods
const handleShowLogin = () => {
  currentView.value = 'login'
}

const handleTryCalendar = () => {
  currentView.value = 'calendar'
}

const handleAuthSuccess = () => {
  isAuthenticated.value = true
  currentView.value = 'dashboard'
}

const handleGoBack = () => {
  currentView.value = 'coming-soon'
}

const handleLogout = () => {
  isAuthenticated.value = false
  currentView.value = 'coming-soon'
}

const checkAuth = () => {
  // Simulate auth check
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div id="app">
    <div v-if="isLoading" class="loading-container">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
      <p class="mt-4">Đang tải...</p>
    </div>
    
    <ComingSoon
      v-else-if="currentView === 'coming-soon'"
      @show-login="handleShowLogin"
      @try-calendar="handleTryCalendar"
    />
    
    <Login
      v-else-if="currentView === 'login'"
      @login-success="handleAuthSuccess"
      @go-back="handleGoBack"
      @try-calendar="handleTryCalendar"
    />
    
    <Dashboard
      v-else-if="currentView === 'dashboard'"
      @logout="handleLogout"
    />
    
    <LunarCalendar
      v-else-if="currentView === 'calendar'"
      :todos="sampleTodos"
      :notes="sampleNotes"
      @date-select="() => {}"
    />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
