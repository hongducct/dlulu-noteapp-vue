<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <span>{{ monthNames[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}</span>
      <div class="d-flex gap-2">
        <v-btn
          variant="outlined"
          size="small"
          prepend-icon="mdi-calendar-today"
          @click="goToToday"
        >
          Hôm nay
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          icon="mdi-chevron-left"
          @click="previousMonth"
        ></v-btn>
        <v-btn
          variant="outlined"
          size="small"
          icon="mdi-chevron-right"
          @click="nextMonth"
        ></v-btn>
      </div>
    </v-card-title>
    
    <v-card-text>
      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <!-- Week day headers -->
        <div
          v-for="day in weekDays"
          :key="day"
          class="calendar-header"
        >
          {{ day }}
        </div>

        <!-- Calendar days -->
        <div
          v-for="(date, index) in days"
          :key="index"
          class="calendar-day"
          :class="{
            'calendar-day-empty': !date,
            'calendar-day-today': isToday(date),
            'calendar-day-selected': selectedDate && isSameDate(date, selectedDate)
          }"
          @click="handleDateClick(date)"
        >
          <div v-if="date" class="calendar-day-content">
            <div class="calendar-day-number">
              {{ date.getDate() }}
            </div>
            <div class="calendar-day-lunar">
              {{ getLunarDate(date) }}
            </div>
            <div v-if="hasItems(date)" class="calendar-day-indicators">
              <v-icon
                v-if="getTodosForDate(date).length > 0"
                size="8"
                color="primary"
              >
                mdi-circle
              </v-icon>
              <v-icon
                v-if="getNotesForDate(date).length > 0"
                size="8"
                color="success"
              >
                mdi-circle
              </v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="d-flex align-center gap-4 mt-4 text-caption text-grey">
        <div class="d-flex align-center gap-2">
          <v-icon size="12" color="primary">mdi-circle</v-icon>
          <span>Việc cần làm</span>
        </div>
        <div class="d-flex align-center gap-2">
          <v-icon size="12" color="success">mdi-circle</v-icon>
          <span>Ghi chú</span>
        </div>
        <div class="d-flex align-center gap-2">
          <span>* = Tháng nhuận</span>
        </div>
      </div>
    </v-card-text>

    <!-- Day Detail Dialog -->
    <v-dialog v-model="showDayDetail" max-width="600">
      <v-card>
        <v-card-title>
          <div>
            <div>{{ selectedDate ? formatDate(selectedDate) : '' }}</div>
            <div v-if="selectedLunar" class="text-caption text-grey">
              Âm lịch: {{ selectedLunar.day }}/{{ selectedLunar.month }}/{{ selectedLunar.year }}
              {{ selectedLunar.isLeap ? ' (nhuận)' : '' }}
            </div>
          </div>
        </v-card-title>
        
        <v-card-text>
          <div v-if="selectedDateItems.todos.length > 0" class="mb-4">
            <h3 class="text-h6 mb-2">Việc cần làm</h3>
            <v-card
              v-for="todo in selectedDateItems.todos"
              :key="todo.id"
              class="mb-2"
              variant="outlined"
            >
              <v-card-text class="py-2">
                <div class="d-flex align-center gap-2">
                  <v-icon
                    :color="todo.completed ? 'success' : 'primary'"
                    size="small"
                  >
                    mdi-circle
                  </v-icon>
                  <div>
                    <div :class="{ 'text-decoration-line-through text-grey': todo.completed }">
                      {{ todo.title }}
                    </div>
                    <div v-if="todo.description" class="text-caption text-grey">
                      {{ todo.description }}
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <div v-if="selectedDateItems.notes.length > 0" class="mb-4">
            <h3 class="text-h6 mb-2">Ghi chú</h3>
            <v-card
              v-for="note in selectedDateItems.notes"
              :key="note.id"
              class="mb-2"
              variant="outlined"
            >
              <v-card-text class="py-2">
                <div class="d-flex align-center gap-2">
                  <v-icon :icon="getNoteIcon(note.type)" size="small"></v-icon>
                  <div>
                    <div>{{ note.title }}</div>
                    <v-chip size="x-small" color="secondary" class="mt-1">
                      {{ getNoteTypeLabel(note.type) }}
                    </v-chip>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <div v-if="selectedDateItems.todos.length === 0 && selectedDateItems.notes.length === 0" class="text-center py-8 text-grey">
            Không có việc cần làm hoặc ghi chú nào cho ngày này
          </div>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showDayDetail = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { convertSolarToLunar } from '../utils/lunar-calendar.js'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  },
  notes: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['date-select'])

// State
const currentDate = ref(new Date())
const selectedDate = ref(null)
const showDayDetail = ref(false)

// Constants
const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const monthNames = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
]

// Computed
const days = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  // Add all days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }

  return days
})

const selectedLunar = computed(() => {
  if (!selectedDate.value) return null
  return convertSolarToLunar(
    selectedDate.value.getDate(),
    selectedDate.value.getMonth() + 1,
    selectedDate.value.getFullYear()
  )
})

const selectedDateItems = computed(() => {
  if (!selectedDate.value) return { todos: [], notes: [] }
  
  const dateStr = selectedDate.value.toISOString().split('T')[0]
  
  const dayTodos = props.todos.filter(todo => {
    if (!todo.dueDate) return false
    const todoDate = new Date(todo.dueDate).toISOString().split('T')[0]
    return todoDate === dateStr
  })

  const dayNotes = props.notes.filter(note => {
    if (note.type === 'text') return false
    if (!note.content?.date) return false
    const noteDate = new Date(note.content.date).toISOString().split('T')[0]
    return noteDate === dateStr
  })

  return { todos: dayTodos, notes: dayNotes }
})

// Methods
const getDaysInMonth = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  // Add all days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }

  return days
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const isToday = (date) => {
  if (!date) return false
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const getLunarDate = (date) => {
  if (!date) return ''
  const lunar = convertSolarToLunar(
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  )
  return `${lunar.day}/${lunar.month}${lunar.isLeap ? '*' : ''}`
}

const getTodosForDate = (date) => {
  if (!date) return []
  const dateStr = date.toISOString().split('T')[0]
  return props.todos.filter(todo => {
    if (!todo.dueDate) return false
    const todoDate = new Date(todo.dueDate).toISOString().split('T')[0]
    return todoDate === dateStr
  })
}

const getNotesForDate = (date) => {
  if (!date) return []
  const dateStr = date.toISOString().split('T')[0]
  return props.notes.filter(note => {
    if (note.type === 'text') return false
    if (!note.content?.date) return false
    const noteDate = new Date(note.content.date).toISOString().split('T')[0]
    return noteDate === dateStr
  })
}

const hasItems = (date) => {
  return getTodosForDate(date).length > 0 || getNotesForDate(date).length > 0
}

const handleDateClick = (date) => {
  if (!date) return
  selectedDate.value = date
  showDayDetail.value = true
  emit('date-select', date)
}

const formatDate = (date) => {
  return date.toLocaleDateString('vi-VN')
}

const getNoteIcon = (type) => {
  const icons = {
    'text': 'mdi-note-text',
    'gas-refill': 'mdi-gas-station',
    'trash-day': 'mdi-delete',
    'bill-payment': 'mdi-receipt',
    'reminder': 'mdi-alarm'
  }
  return icons[type] || 'mdi-note-text'
}

const getNoteTypeLabel = (type) => {
  const labels = {
    'text': '📝 Văn bản',
    'gas-refill': '⛽ Đổ xăng',
    'trash-day': '🗑️ Đổ rác',
    'bill-payment': '💰 Hóa đơn',
    'reminder': '⏰ Nhắc nhở'
  }
  return labels[type] || type
}
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.calendar-header {
  padding: 8px 4px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-day {
  min-height: 60px;
  padding: 4px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.calendar-day-empty {
  background-color: #fafafa;
  cursor: default;
}

.calendar-day-empty:hover {
  background-color: #fafafa;
}

.calendar-day-today {
  background-color: #e3f2fd;
  border-color: #2196f3;
}

.calendar-day-today:hover {
  background-color: #bbdefb;
}

.calendar-day-selected {
  background-color: #2196f3;
  color: white;
}

.calendar-day-selected:hover {
  background-color: #1976d2;
}

.calendar-day-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.calendar-day-number {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2px;
}

.calendar-day-lunar {
  font-size: 0.75rem;
  opacity: 0.7;
}

.calendar-day-indicators {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
}
</style>
