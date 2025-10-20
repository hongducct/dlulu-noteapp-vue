<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="DluluNote"
        subtitle="Ghi chú & Todo"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :active="activeTab === item.value"
          @click="setActiveTab(item.value)"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="error"
            variant="outlined"
            prepend-icon="mdi-logout"
            @click="handleLogout"
          >
            Đăng xuất
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ getCurrentPageTitle() }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="activeTab === 'notes'"
        color="primary"
        prepend-icon="mdi-plus"
        @click="openNoteDialog"
      >
        Tạo ghi chú
      </v-btn>
      <v-btn
        v-if="activeTab === 'todos'"
        color="primary"
        prepend-icon="mdi-plus"
        @click="openTodoDialog"
      >
        Tạo việc cần làm
      </v-btn>
      <v-btn
        v-if="activeTab === 'teams'"
        color="primary"
        prepend-icon="mdi-plus"
        @click="openTeamDialog"
      >
        Tạo team
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h4 mb-4">Ghi chú ({{ notes.length }})</h2>
            </v-col>
          </v-row>
          
          <v-row v-if="notes.length > 0">
            <v-col
              v-for="note in notes"
              :key="note.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="h-100"
                hover
              >
                <v-card-title class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-icon :icon="getNoteIcon(note.type)" class="mr-2"></v-icon>
                    <span>{{ getNoteTypeLabel(note.type) }}</span>
                  </div>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        variant="text"
                        v-bind="props"
                      ></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editNote(note)">
                        <v-list-item-title>Sửa</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteNote(note)">
                        <v-list-item-title class="text-error">Xóa</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                
                <v-card-subtitle>{{ note.title }}</v-card-subtitle>
                
                <v-card-text>
                  <div v-html="renderNoteContent(note)"></div>
                </v-card-text>
                
                <v-card-actions>
                  <v-chip
                    :color="getVisibilityColor(note.visibility)"
                    size="small"
                  >
                    {{ getVisibilityLabel(note.visibility) }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="note.visibility === 'link'"
                    icon="mdi-link"
                    size="small"
                    variant="text"
                    @click="copyShareLink(note)"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          
          <v-card v-else>
            <v-card-text class="text-center py-12">
              <v-icon size="48" color="grey">mdi-note-text</v-icon>
              <p class="text-h6 mt-4 text-grey">Chưa có ghi chú nào</p>
            </v-card-text>
          </v-card>
        </div>

        <!-- Todos Tab -->
        <div v-if="activeTab === 'todos'">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h4 mb-4">Việc cần làm ({{ todos.length }})</h2>
            </v-col>
          </v-row>
          
          <v-row v-if="todos.length > 0">
            <v-col cols="12">
              <v-card
                v-for="todo in todos"
                :key="todo.id"
                class="mb-2"
              >
                <v-card-text>
                  <div class="d-flex align-center">
                    <v-checkbox
                      :model-value="todo.completed"
                      @update:model-value="toggleTodo(todo)"
                      class="mr-3"
                    ></v-checkbox>
                    
                    <div class="flex-grow-1">
                      <div
                        :class="{
                          'text-decoration-line-through text-grey': todo.completed
                        }"
                      >
                        {{ todo.title }}
                      </div>
                      <div
                        v-if="todo.description"
                        class="text-caption text-grey mt-1"
                      >
                        {{ todo.description }}
                      </div>
                      <div class="d-flex align-center mt-2">
                        <v-chip
                          v-if="todo.dueDate"
                          size="small"
                          color="primary"
                          variant="outlined"
                          class="mr-2"
                        >
                          📅 {{ formatDate(todo.dueDate) }} - Âm: {{ getLunarDateString(new Date(todo.dueDate)) }}
                        </v-chip>
                        <v-chip
                          v-if="getTeamName(todo.teamId)"
                          size="small"
                          color="secondary"
                          variant="outlined"
                        >
                          👥 {{ getTeamName(todo.teamId) }}
                        </v-chip>
                      </div>
                    </div>
                    
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon="mdi-dots-vertical"
                          variant="text"
                          v-bind="props"
                        ></v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="editTodo(todo)">
                          <v-list-item-title>Sửa</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="deleteTodo(todo)">
                          <v-list-item-title class="text-error">Xóa</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
          <v-card v-else>
            <v-card-text class="text-center py-12">
              <v-icon size="48" color="grey">mdi-checkbox-marked-circle</v-icon>
              <p class="text-h6 mt-4 text-grey">Chưa có việc cần làm nào</p>
            </v-card-text>
          </v-card>
        </div>

        <!-- Calendar Tab -->
        <div v-if="activeTab === 'calendar'">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h4 mb-4">Lịch âm</h2>
            </v-col>
          </v-row>
          
          <LunarCalendar
            :todos="todos"
            :notes="notes"
            @date-select="handleDateSelect"
          />
        </div>

        <!-- Teams Tab -->
        <div v-if="activeTab === 'teams'">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h4 mb-4">Teams ({{ teams.length }})</h2>
            </v-col>
          </v-row>
          
          <v-row v-if="teams.length > 0">
            <v-col
              v-for="team in teams"
              :key="team.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="h-100"
                hover
              >
                <v-card-title class="d-flex align-center justify-space-between">
                  <span>{{ team.name }}</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        variant="text"
                        v-bind="props"
                      ></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="editTeam(team)">
                        <v-list-item-title>Sửa</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteTeam(team)">
                        <v-list-item-title class="text-error">Xóa</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                
                <v-card-text>
                  <p class="text-caption text-grey mb-2">
                    {{ team.members?.length || 0 }} thành viên
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip
                      v-for="email in (team.members || []).slice(0, 3)"
                      :key="email"
                      size="small"
                      color="secondary"
                      variant="outlined"
                    >
                      {{ email.split('@')[0] }}
                    </v-chip>
                    <v-chip
                      v-if="(team.members || []).length > 3"
                      size="small"
                      color="grey"
                      variant="outlined"
                    >
                      +{{ (team.members || []).length - 3 }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
          <v-card v-else>
            <v-card-text class="text-center py-12">
              <v-icon size="48" color="grey">mdi-account-group</v-icon>
              <p class="text-h6 mt-4 text-grey">Chưa có team nào</p>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-main>

    <!-- Dialogs -->
    <NoteDialog
      v-model="noteDialogOpen"
      :note="editingNote"
      @save="handleSaveNote"
    />
    
    <TodoDialog
      v-model="todoDialogOpen"
      :todo="editingTodo"
      :teams="teams"
      @save="handleSaveTodo"
    />
    
    <TeamDialog
      v-model="teamDialogOpen"
      :team="editingTeam"
      @save="handleSaveTeam"
    />

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialogOpen" max-width="400">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa {{ itemToDelete?.type === 'note' ? 'ghi chú' : 'việc cần làm' }} này không? 
          Hành động này không thể hoàn tác.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialogOpen = false">Hủy</v-btn>
          <v-btn color="error" @click="confirmDelete">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getLunarDateString } from '../utils/lunar-calendar.js'
import LunarCalendar from './LunarCalendar.vue'
import NoteDialog from './NoteDialog.vue'
import TodoDialog from './TodoDialog.vue'
import TeamDialog from './TeamDialog.vue'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  }
})

// State
const drawer = ref(true)
const rail = ref(false)
const activeTab = ref('notes')

const notes = ref([])
const todos = ref([])
const teams = ref([])

// Dialog states
const noteDialogOpen = ref(false)
const todoDialogOpen = ref(false)
const teamDialogOpen = ref(false)
const deleteDialogOpen = ref(false)

const editingNote = ref(null)
const editingTodo = ref(null)
const editingTeam = ref(null)
const itemToDelete = ref(null)

// Menu items
const menuItems = [
  { title: 'Ghi chú', icon: 'mdi-note-text', value: 'notes' },
  { title: 'Việc cần làm', icon: 'mdi-checkbox-marked-circle', value: 'todos' },
  { title: 'Lịch âm', icon: 'mdi-calendar', value: 'calendar' },
  { title: 'Teams', icon: 'mdi-account-group', value: 'teams' }
]

// Computed
const getCurrentPageTitle = () => {
  const item = menuItems.find(item => item.value === activeTab.value)
  return item ? item.title : 'DluluNote'
}

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab
}

const handleLogout = () => {
  props.onLogout()
}

const openNoteDialog = () => {
  editingNote.value = null
  noteDialogOpen.value = true
}

const openTodoDialog = () => {
  editingTodo.value = null
  todoDialogOpen.value = true
}

const openTeamDialog = () => {
  editingTeam.value = null
  teamDialogOpen.value = true
}

const editNote = (note) => {
  editingNote.value = note
  noteDialogOpen.value = true
}

const editTodo = (todo) => {
  editingTodo.value = todo
  todoDialogOpen.value = true
}

const editTeam = (team) => {
  editingTeam.value = team
  teamDialogOpen.value = true
}

const deleteNote = (note) => {
  itemToDelete.value = { type: 'note', id: note.id }
  deleteDialogOpen.value = true
}

const deleteTodo = (todo) => {
  itemToDelete.value = { type: 'todo', id: todo.id }
  deleteDialogOpen.value = true
}

const deleteTeam = (team) => {
  itemToDelete.value = { type: 'team', id: team.id }
  deleteDialogOpen.value = true
}

const confirmDelete = () => {
  if (!itemToDelete.value) return
  
  if (itemToDelete.value.type === 'note') {
    notes.value = notes.value.filter(n => n.id !== itemToDelete.value.id)
  } else if (itemToDelete.value.type === 'todo') {
    todos.value = todos.value.filter(t => t.id !== itemToDelete.value.id)
  } else if (itemToDelete.value.type === 'team') {
    teams.value = teams.value.filter(t => t.id !== itemToDelete.value.id)
  }
  
  deleteDialogOpen.value = false
  itemToDelete.value = null
}

const handleSaveNote = (noteData) => {
  if (editingNote.value) {
    const index = notes.value.findIndex(n => n.id === editingNote.value.id)
    if (index !== -1) {
      notes.value[index] = { ...editingNote.value, ...noteData }
    }
  } else {
    const newNote = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date().toISOString()
    }
    notes.value.unshift(newNote)
  }
  editingNote.value = null
}

const handleSaveTodo = (todoData) => {
  if (editingTodo.value) {
    const index = todos.value.findIndex(t => t.id === editingTodo.value.id)
    if (index !== -1) {
      todos.value[index] = { ...editingTodo.value, ...todoData }
    }
  } else {
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString()
    }
    todos.value.unshift(newTodo)
  }
  editingTodo.value = null
}

const handleSaveTeam = (teamData) => {
  if (editingTeam.value) {
    const index = teams.value.findIndex(t => t.id === editingTeam.value.id)
    if (index !== -1) {
      teams.value[index] = { ...editingTeam.value, ...teamData }
    }
  } else {
    const newTeam = {
      id: Date.now().toString(),
      ...teamData,
      createdAt: new Date().toISOString()
    }
    teams.value.unshift(newTeam)
  }
  editingTeam.value = null
}

const toggleTodo = (todo) => {
  todo.completed = !todo.completed
}

const handleDateSelect = (date) => {
  console.log('Selected date:', date)
}

const copyShareLink = (note) => {
  if (note.shareLink) {
    const link = `${window.location.origin}?share=${note.shareLink}`
    navigator.clipboard.writeText(link)
    // Show toast notification
  }
}

// Helper functions
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

const getVisibilityColor = (visibility) => {
  const colors = {
    'public': 'success',
    'specific': 'info',
    'link': 'warning',
    'private': 'grey'
  }
  return colors[visibility] || 'grey'
}

const getVisibilityLabel = (visibility) => {
  const labels = {
    'public': 'Công khai',
    'specific': 'Chia sẻ',
    'link': 'Link',
    'private': 'Riêng tư'
  }
  return labels[visibility] || 'Riêng tư'
}

const getTeamName = (teamId) => {
  const team = teams.value.find(t => t.id === teamId)
  return team ? team.name : ''
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const renderNoteContent = (note) => {
  switch (note.type) {
    case 'text':
      return `<p class="text-caption text-grey">${note.content}</p>`
    
    case 'gas-refill':
      return `
        <div class="text-caption space-y-1">
          <p>📅 ${formatDate(note.content.date)}</p>
          ${note.content.liters ? `<p>⛽ ${note.content.liters} lít</p>` : ''}
          ${note.content.cost ? `<p>💵 ${Number(note.content.cost).toLocaleString('vi-VN')} VNĐ</p>` : ''}
          ${note.content.station ? `<p>🏪 ${note.content.station}</p>` : ''}
        </div>
      `
    
    case 'trash-day':
      return `
        <div class="text-caption space-y-1">
          <p>📅 ${formatDate(note.content.date)}</p>
          <p>🗑️ ${note.content.type}</p>
          ${note.content.notes ? `<p class="text-grey">${note.content.notes}</p>` : ''}
        </div>
      `
    
    case 'bill-payment':
      return `
        <div class="text-caption space-y-1">
          <p>📅 ${formatDate(note.content.date)}</p>
          <p>🏢 ${note.content.service}</p>
          ${note.content.amount ? `<p>💵 ${Number(note.content.amount).toLocaleString('vi-VN')} VNĐ</p>` : ''}
          <v-chip size="x-small" color="${note.content.status === 'paid' ? 'success' : 'warning'}">
            ${note.content.status === 'paid' ? 'Đã thanh toán' : note.content.status === 'pending' ? 'Chưa thanh toán' : 'Quá hạn'}
          </v-chip>
        </div>
      `
    
    case 'reminder':
      return `
        <div class="text-caption space-y-1">
          <p>📅 ${formatDate(note.content.date)}</p>
          ${note.content.time ? `<p>⏰ ${note.content.time}</p>` : ''}
          ${note.content.description ? `<p class="text-grey">${note.content.description}</p>` : ''}
        </div>
      `
    
    default:
      return ''
  }
}

// Load sample data
onMounted(() => {
  // Load sample data
  notes.value = [
    {
      id: '1',
      title: 'Ghi chú mẫu',
      type: 'text',
      content: 'Đây là nội dung ghi chú mẫu',
      visibility: 'private',
      createdAt: new Date().toISOString()
    }
  ]
  
  todos.value = [
    {
      id: '1',
      title: 'Hoàn thành dự án',
      description: 'Làm xong báo cáo cuối kỳ',
      completed: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      teamId: null,
      createdAt: new Date().toISOString()
    }
  ]
  
  teams.value = [
    {
      id: '1',
      name: 'Team Development',
      members: ['dev1@example.com', 'dev2@example.com'],
      createdAt: new Date().toISOString()
    }
  ]
})
</script>

<style scoped>
.space-y-1 > * + * {
  margin-top: 0.25rem;
}
</style>
