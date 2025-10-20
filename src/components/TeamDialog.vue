<template>
  <v-dialog v-model="dialogOpen" max-width="600" persistent>
    <v-card>
      <v-card-title>
        {{ team ? 'Chỉnh sửa team' : 'Tạo team mới' }}
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.name"
                label="Tên team"
                :rules="[v => !!v || 'Tên team là bắt buộc']"
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
            
            <v-col cols="12">
              <v-text-field
                v-model="newMemberEmail"
                label="Thêm thành viên"
                placeholder="Nhập email thành viên"
                @keyup.enter="addMember"
                append-inner-icon="mdi-plus"
                @click:append-inner="addMember"
              ></v-text-field>
            </v-col>
            
            <v-col v-if="formData.members.length > 0" cols="12">
              <v-card variant="outlined">
                <v-card-title class="text-subtitle-1 pa-3">
                  Thành viên ({{ formData.members.length }})
                </v-card-title>
                <v-card-text class="pt-0">
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip
                      v-for="(member, index) in formData.members"
                      :key="index"
                      closable
                      @click:close="removeMember(index)"
                      color="primary"
                      variant="outlined"
                    >
                      {{ member }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            
            <v-col cols="12">
              <v-select
                v-model="formData.visibility"
                :items="visibilityOptions"
                label="Quyền riêng tư"
                :rules="[v => !!v || 'Quyền riêng tư là bắt buộc']"
                required
              ></v-select>
            </v-col>
            
            <v-col cols="12">
              <v-switch
                v-model="formData.allowInvites"
                label="Cho phép thành viên mời người khác"
                color="primary"
              ></v-switch>
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
          @click="saveTeam"
        >
          {{ team ? 'Cập nhật' : 'Tạo' }}
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
  team: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

// State
const form = ref(null)
const valid = ref(false)
const newMemberEmail = ref('')

const formData = ref({
  name: '',
  description: '',
  members: [],
  visibility: 'private',
  allowInvites: true
})

// Options
const visibilityOptions = [
  { title: 'Riêng tư', value: 'private' },
  { title: 'Công khai', value: 'public' },
  { title: 'Chỉ thành viên', value: 'members' }
]

// Computed
const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    members: [],
    visibility: 'private',
    allowInvites: true
  }
  newMemberEmail.value = ''
}

const initForm = () => {
  if (props.team) {
    formData.value = {
      name: props.team.name || '',
      description: props.team.description || '',
      members: [...(props.team.members || [])],
      visibility: props.team.visibility || 'private',
      allowInvites: props.team.allowInvites !== false
    }
  } else {
    resetForm()
  }
}

const addMember = () => {
  const email = newMemberEmail.value.trim()
  if (email && isValidEmail(email) && !formData.value.members.includes(email)) {
    formData.value.members.push(email)
    newMemberEmail.value = ''
  }
}

const removeMember = (index) => {
  formData.value.members.splice(index, 1)
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const saveTeam = () => {
  if (valid.value) {
    emit('save', { ...formData.value })
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

watch(() => props.team, () => {
  if (props.modelValue) {
    initForm()
  }
})
</script>
