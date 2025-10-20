<template>
    <div class="p-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Ghi chú của bạn</h1>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors">
                + Tạo ghi chú mới
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- Sử dụng component NoteCard -->
            <NoteCard 
                title="Ngày đổ xăng" 
                content="Nhớ đổ đầy bình" 
                type="Nhắc nhở"
                :is-public="true"
            />
            <NoteCard 
                title="Ý tưởng project mới" 
                content="Làm một app ghi chú đa năng với Vue và NestJS." 
                type="Ý tưởng"
                :is-public="false"
            />
             <NoteCard 
                title="Công thức nấu ăn" 
                content="Công thức làm món gà nướng mật ong..." 
                type="Công thức"
                :is-public="true"
            />
        </div>
    </div>
</template>

<script setup>
import NoteCard from '@/components/NoteCard.vue';
</script>
