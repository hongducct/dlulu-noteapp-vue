<template>
    <div class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
        <div>
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg text-gray-800">{{ title }}</h3>
                <span class="text-xs font-semibold px-2 py-1 rounded-full"
                      :class="isPublic ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'">
                    {{ isPublic ? 'Công khai' : 'Riêng tư' }}
                </span>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ content }}</p>
        </div>
        <div>
            <span class="text-xs font-medium text-white px-2 py-1 rounded-full bg-blue-400">
                {{ type }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    content: String,
    type: String, // Ví dụ: "Nhắc nhở", "Ý tưởng", "Công thức"
    isPublic: Boolean
});
</script>
