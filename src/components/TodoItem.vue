<template>
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
        <div class="flex items-center">
            <input type="checkbox" :checked="done" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <label class="ml-3 text-gray-700" :class="{ 'line-through text-gray-400': done }">
                {{ text }}
            </label>
        </div>
        <button class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>

<script setup>
defineProps({
    text: String,
    done: Boolean
});
</script>
