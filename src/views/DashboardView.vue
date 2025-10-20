<template>
    <div class="p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Bảng điều khiển</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Card Todolist -->
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Công việc hôm nay</h2>
                <p class="text-gray-500">Bạn có 3 công việc cần hoàn thành.</p>
                <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Xem chi tiết</button>
            </div>

            <!-- Card Ghi chú gần đây -->
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Ghi chú gần đây</h2>
                <p class="text-gray-500">Ghi chú "Ý tưởng cho project mới" vừa được cập nhật.</p>
                <button class="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Xem tất cả ghi chú</button>
            </div>

            <!-- Card Lịch -->
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Lịch</h2>
                <p class="text-gray-500">Hôm nay là ngày 17/9 Âm lịch.</p>
                 <button class="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Xem lịch</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// Logic cho dashboard sẽ được thêm ở đây
</script>
