<template>
    <div class="p-8 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Danh sách công việc</h1>
        
        <!-- Phần chọn ngày -->
        <div class="mb-6 flex flex-col items-center">
            <label for="todo-date" class="font-semibold text-gray-600 mb-2">Chọn ngày để xem/thêm công việc:</label>
            <input type="date" id="todo-date" v-model="selectedDate" class="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
        </div>

        <!-- Danh sách công việc -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Công việc cho ngày: {{ formattedDate }}</h2>
            
            <!-- Thêm công việc mới -->
            <div class="flex gap-2 mb-4">
                <input type="text" placeholder="Thêm một công việc mới..." class="flex-grow p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Thêm</button>
            </div>
            
            <!-- List -->
            <div class="space-y-3">
                <TodoItem text="Hoàn thành giao diện Todolist" :done="true" />
                <TodoItem text="Tích hợp API lấy danh sách công việc" :done="false" />
                <TodoItem text="Tạo chức năng chia sẻ team" :done="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TodoItem from '@/components/TodoItem.vue';

const selectedDate = ref(new Date().toISOString().slice(0, 10));

const formattedDate = computed(() => {
    if (!selectedDate.value) return '';
    const date = new Date(selectedDate.value);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});
</script>
