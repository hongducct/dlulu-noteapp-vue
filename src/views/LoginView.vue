<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>
            <form @submit.prevent>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-semibold mb-2">Mật khẩu</label>
                    <input type="password" id="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="********">
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Đăng nhập
                </button>
            </form>
            <p class="text-center mt-4 text-sm text-gray-600">
                Chưa có tài khoản? <router-link :to="{ name: 'register' }" class="text-blue-500 hover:underline">Đăng ký ngay</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
// Logic xử lý đăng nhập
</script>
