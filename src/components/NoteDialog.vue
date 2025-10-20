<template>
  <v-dialog v-model="dialogOpen" max-width="600" persistent>
    <v-card>
      <v-card-title>
        {{ note ? 'Chỉnh sửa ghi chú' : 'Tạo ghi chú mới' }}
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
              <v-select
                v-model="formData.type"
                :items="noteTypes"
                label="Loại ghi chú"
                :rules="[v => !!v || 'Loại ghi chú là bắt buộc']"
                required
                @update:model-value="onTypeChange"
              ></v-select>
            </v-col>
            
            <!-- Text Note -->
            <v-col v-if="formData.type === 'text'" cols="12">
              <v-textarea
                v-model="formData.content"
                label="Nội dung"
                rows="4"
                :rules="[v => !!v || 'Nội dung là bắt buộc']"
                required
              ></v-textarea>
            </v-col>
            
            <!-- Gas Refill Note -->
            <template v-if="formData.type === 'gas-refill'">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.date"
                  label="Ngày đổ xăng"
                  type="date"
                  :rules="[v => !!v || 'Ngày là bắt buộc']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.liters"
                  label="Số lít"
                  type="number"
                  suffix="lít"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.cost"
                  label="Chi phí"
                  type="number"
                  suffix="VNĐ"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.station"
                  label="Trạm xăng"
                ></v-text-field>
              </v-col>
            </template>
            
            <!-- Trash Day Note -->
            <template v-if="formData.type === 'trash-day'">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.date"
                  label="Ngày đổ rác"
                  type="date"
                  :rules="[v => !!v || 'Ngày là bắt buộc']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.content.type"
                  :items="trashTypes"
                  label="Loại rác"
                  :rules="[v => !!v || 'Loại rác là bắt buộc']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.content.notes"
                  label="Ghi chú thêm"
                  rows="2"
                ></v-textarea>
              </v-col>
            </template>
            
            <!-- Bill Payment Note -->
            <template v-if="formData.type === 'bill-payment'">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.date"
                  label="Ngày thanh toán"
                  type="date"
                  :rules="[v => !!v || 'Ngày là bắt buộc']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.service"
                  label="Dịch vụ"
                  :rules="[v => !!v || 'Dịch vụ là bắt buộc']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.amount"
                  label="Số tiền"
                  type="number"
                  suffix="VNĐ"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.content.status"
                  :items="paymentStatuses"
                  label="Trạng thái"
                  :rules="[v => !!v || 'Trạng thái là bắt buộc']"
                  required
                ></v-select>
              </v-col>
            </template>
            
            <!-- Reminder Note -->
            <template v-if="formData.type === 'reminder'">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.date"
                  label="Ngày nhắc nhở"
                  type="date"
                  :rules="[v => !!v || 'Ngày là bắt buộc']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.content.time"
                  label="Giờ nhắc nhở"
                  type="time"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.content.description"
                  label="Mô tả"
                  rows="3"
                ></v-textarea>
              </v-col>
            </template>
            
            <v-col cols="12">
              <v-select
                v-model="formData.visibility"
                :items="visibilityOptions"
                label="Quyền riêng tư"
                :rules="[v => !!v || 'Quyền riêng tư là bắt buộc']"
                required
              ></v-select>
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
          @click="saveNote"
        >
          {{ note ? 'Cập nhật' : 'Tạo' }}
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
  note: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

// State
const form = ref(null)
const valid = ref(false)

const formData = ref({
  title: '',
  type: 'text',
  content: '',
  visibility: 'private'
})

// Options
const noteTypes = [
  { title: '📝 Văn bản', value: 'text' },
  { title: '⛽ Đổ xăng', value: 'gas-refill' },
  { title: '🗑️ Đổ rác', value: 'trash-day' },
  { title: '💰 Hóa đơn', value: 'bill-payment' },
  { title: '⏰ Nhắc nhở', value: 'reminder' }
]

const trashTypes = [
  'Rác thải sinh hoạt',
  'Rác tái chế',
  'Rác hữu cơ',
  'Rác nguy hại'
]

const paymentStatuses = [
  { title: 'Đã thanh toán', value: 'paid' },
  { title: 'Chưa thanh toán', value: 'pending' },
  { title: 'Quá hạn', value: 'overdue' }
]

const visibilityOptions = [
  { title: 'Riêng tư', value: 'private' },
  { title: 'Công khai', value: 'public' },
  { title: 'Chia sẻ với người cụ thể', value: 'specific' },
  { title: 'Chia sẻ bằng link', value: 'link' }
]

// Computed
const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const resetForm = () => {
  formData.value = {
    title: '',
    type: 'text',
    content: '',
    visibility: 'private'
  }
}

const initForm = () => {
  if (props.note) {
    formData.value = {
      title: props.note.title || '',
      type: props.note.type || 'text',
      content: props.note.content || '',
      visibility: props.note.visibility || 'private'
    }
  } else {
    resetForm()
  }
}

const onTypeChange = () => {
  // Reset content based on type
  switch (formData.value.type) {
    case 'text':
      formData.value.content = ''
      break
    case 'gas-refill':
      formData.value.content = {
        date: '',
        liters: '',
        cost: '',
        station: ''
      }
      break
    case 'trash-day':
      formData.value.content = {
        date: '',
        type: '',
        notes: ''
      }
      break
    case 'bill-payment':
      formData.value.content = {
        date: '',
        service: '',
        amount: '',
        status: 'pending'
      }
      break
    case 'reminder':
      formData.value.content = {
        date: '',
        time: '',
        description: ''
      }
      break
  }
}

const saveNote = () => {
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

watch(() => props.note, () => {
  if (props.modelValue) {
    initForm()
  }
})
</script>
