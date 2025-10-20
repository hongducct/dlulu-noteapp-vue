import { createRouter, createWebHistory } from 'vue-router';

// Sử dụng lazy-loading để tối ưu tốc độ tải trang
// Component sẽ chỉ được tải khi người dùng truy cập vào route đó
const DashboardView = () => import('@/views/DashboardView.vue');
const NotesView = () => import('@/views/NotesView.vue');
const TodoListView = () => import('@/views/TodoListView.vue');
const CalendarView = () => import('@/views/CalendarView.vue');
const TeamsView = () => import('@/views/TeamsView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const RegisterView = () => import('@/views/RegisterView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const TestView = () => import('@/views/TestView.vue');

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true } // Ví dụ: Route này yêu cầu đăng nhập
    },
    {
        path: '/notes',
        name: 'notes',
        component: NotesView,
        meta: { requiresAuth: true }
    },
    {
        path: '/todolist',
        name: 'todolist',
        component: TodoListView,
        meta: { requiresAuth: true }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarView,
        meta: { requiresAuth: true }
    },
    {
        path: '/teams',
        name: 'teams',
        component: TeamsView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/test',
        name: 'test',
        component: TestView
    },
    // Bắt các route không tồn tại, đưa về trang 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Logic để kiểm tra quyền truy cập (Navigation Guard)
// Sẽ được hoàn thiện khi có hệ thống login
router.beforeEach((to, from, next) => {
    const isAuthenticated = false; // Giả sử người dùng chưa đăng nhập
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Nếu route yêu cầu đăng nhập mà người dùng chưa đăng nhập
        // thì chuyển hướng đến trang login
        next({ name: 'login' });
    } else {
        // Nếu không thì cho phép truy cập
        next();
    }
});


export default router;
