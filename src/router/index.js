import { createRouter, createWebHistory } from "vue-router";
import Courses from "../views/Courses.vue";
import Community from "../views/Community.vue";
import Resources from "../views/Resources.vue";
import CourseDetail from "../views/CourseDetail.vue";
import Register from "../views/RegisterUser.vue";
import Login from "../views/LoginUser.vue";
import Dashboard from "../views/DashboardAuth.vue";
import ForgotPassword from "../views/ForgotPassword.vue"; // Імпортуємо новий компонент для скидання пароля

const routes = [
	{ path: "/courses", component: Courses },
	{ path: "/community", component: Community },
	{ path: "/resources", component: Resources },
	{ path: "/", redirect: "/courses" },
	{
		path: "/courses/:id",
		name: "CourseDetail",
		component: CourseDetail,
	},
	{
		path: "/register", // Маршрут для реєстрації
		name: "Register",
		component: Register,
	},
	{
		path: "/login", // Маршрут для входу
		name: "Login",
		component: Login,
	},
	{
		path: "/dashboard", // Маршрут для Dashboard
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/forgot-password", // Новий маршрут для скидання пароля
		name: "ForgotPassword",
		component: ForgotPassword,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
