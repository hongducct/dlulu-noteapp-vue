<template>
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <router-link :to="{ name: 'dashboard' }" class="text-2xl font-bold text-blue-600">
                        LifeHub
                    </router-link>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <router-link :to="{ name: 'dashboard' }" class="nav-link">Bảng điều khiển</router-link>
                            <router-link :to="{ name: 'notes' }" class="nav-link">Ghi chú</router-link>
                            <router-link :to="{ name: 'todolist' }" class="nav-link">Todolist</router-link>
                            <router-link :to="{ name: 'calendar' }" class="nav-link">Lịch</router-link>
                            <router-link :to="{ name: 'teams' }" class="nav-link">Nhóm</router-link>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                     <div class="ml-4 flex items-center md:ml-6">
                        <!-- Tạm thời để nút Login / Logout -->
                        <router-link :to="{ name: 'login' }" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                            Đăng nhập
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
</script>

<style scoped lang="postcss">
/* CSS cho trạng thái active của link */
.nav-link {
    @apply text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium;
}
.router-link-exact-active.nav-link {
    @apply bg-blue-500 text-white;
}
</style>
