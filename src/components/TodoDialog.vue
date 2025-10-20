<template>
  <v-dialog v-model="dialogOpen" max-width="600" persistent>
    <v-card>
      <v-card-title>
        {{ todo ? 'Chỉnh sửa việc cần làm' : 'Tạo việc cần làm mới' }}
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.title"
                label="Tiêu đề"
                :rules="[v => !!v || 'Tiêu đề là bắt buộc']"
                required
              ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                label="Mô tả"
                rows="3"
              ></v-textarea>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.dueDate"
                label="Ngày hết hạn"
                type="date"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.teamId"
                :items="teamOptions"
                label="Team"
                clearable
              ></v-select>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.priority"
                :items="priorityOptions"
                label="Độ ưu tiên"
                :rules="[v => !!v || 'Độ ưu tiên là bắt buộc']"
                required
              ></v-select>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.category"
                :items="categoryOptions"
                label="Danh mục"
              ></v-select>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="formData.tags"
                label="Tags (phân cách bằng dấu phẩy)"
                placeholder="Ví dụ: quan trọng, khẩn cấp, công việc"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Hủy</v-btn>
        <v-btn
          color="primary"
          :disabled="!valid"
          @click="saveTodo"
        >
          {{ todo ? 'Cập nhật' : 'Tạo' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  todo: {
    type: Object,
    default: null
  },
  teams: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

// State
const form = ref(null)
const valid = ref(false)

const formData = ref({
  title: '',
  description: '',
  dueDate: '',
  teamId: null,
  priority: 'medium',
  category: '',
  tags: ''
})

// Options
const priorityOptions = [
  { title: '🔴 Cao', value: 'high' },
  { title: '🟡 Trung bình', value: 'medium' },
  { title: '🟢 Thấp', value: 'low' }
]

const categoryOptions = [
  'Công việc',
  'Cá nhân',
  'Học tập',
  'Sức khỏe',
  'Tài chính',
  'Gia đình',
  'Khác'
]

// Computed
const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const teamOptions = computed(() => {
  return props.teams.map(team => ({
    title: team.name,
    value: team.id
  }))
})

// Methods
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    dueDate: '',
    teamId: null,
    priority: 'medium',
    category: '',
    tags: ''
  }
}

const initForm = () => {
  if (props.todo) {
    formData.value = {
      title: props.todo.title || '',
      description: props.todo.description || '',
      dueDate: props.todo.dueDate ? props.todo.dueDate.split('T')[0] : '',
      teamId: props.todo.teamId || null,
      priority: props.todo.priority || 'medium',
      category: props.todo.category || '',
      tags: props.todo.tags ? props.todo.tags.join(', ') : ''
    }
  } else {
    resetForm()
  }
}

const saveTodo = () => {
  if (valid.value) {
    const todoData = {
      ...formData.value,
      tags: formData.value.tags ? formData.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    }
    emit('save', todoData)
    closeDialog()
  }
}

const closeDialog = () => {
  dialogOpen.value = false
  resetForm()
}

// Watchers
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    initForm()
  }
})

watch(() => props.todo, () => {
  if (props.modelValue) {
    initForm()
  }
})
</script>
