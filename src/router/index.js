import { createRouter, createWebHistory } from "vue-router";
import Courses from "../views/Courses.vue";
import Community from "../views/Community.vue";
import Resources from "../views/Resources.vue";
import CourseDetail from "../views/CourseDetail.vue";
// import Register from "../views/Register.vue"; // Імпортуємо компонент реєстрації

const routes = [
	{ path: "/courses", component: Courses },
	{ path: "/community", component: Community },
	{ path: "/resources", component: Resources },
	{ path: "/", redirect: "/courses" }, // Redirect на /courses
	{
		path: "/courses/:id",
		name: "CourseDetail",
		component: CourseDetail,
	},
	// {
	// 	path: "/register", // Маршрут для реєстрації
	// 	name: "Register",
	// 	component: Register,
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
