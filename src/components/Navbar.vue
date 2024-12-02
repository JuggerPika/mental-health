<template>
	<div>
		<div class="close">
			<h2>Error</h2>
		</div>

		<nav class="nav">
			<a href="#" class="menu-btn" @click="toggleMenu">
				<img src="./../assets/menu-svgrepo-com.svg" alt="Menu" />
			</a>

			<h2>{{ currentPageTitle }}</h2>

			<!-- Якщо користувач не авторизований, відображаємо кнопку реєстрації/входу -->
			<router-link v-if="!user" class="account-btn" to="/login">
				<img src="./../assets/account-svgrepo-com.svg" alt="Account" />
			</router-link>

			<!-- Якщо користувач авторизований, показуємо кнопку для переходу на Dashboard -->
			<router-link v-if="user" class="account-btn" to="/dashboard">
				<img src="./../assets/account-svgrepo-com.svg" alt="Account" />
			</router-link>

			<ul class="menu" :class="{ active: isMenuOpen }">
				<li><router-link to="/courses">Курси</router-link></li>
				<li><router-link to="/community">Прогресс</router-link></li>
				<li><router-link to="/resources">Ресурси</router-link></li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { auth } from "../data/.firebase"; // Імпортуємо Firebase
import { onAuthStateChanged } from "firebase/auth"; // Імпортуємо необхідну функцію з Firebase

export default {
	name: "AppNavbar",
	data() {
		return {
			pageTitles: {
				"/courses": "Курси",
				"/community": "Прогресс",
				"/resources": "Ресурси",
			},
			currentPageTitle: "",
			isMenuOpen: false,
			user: null, // Додаємо змінну для зберігання користувача
		};
	},
	watch: {
		$route(to) {
			this.updatePageTitle(to.path);
		},
	},
	created() {
		this.updatePageTitle(this.$route.path);
		this.checkUserAuth(); // Перевірка авторизації при створенні компонента
	},
	methods: {
		updatePageTitle(path) {
			this.currentPageTitle = this.pageTitles[path] || "Сторінка";
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
		checkUserAuth() {
			// Перевірка авторизації користувача
			onAuthStateChanged(auth, (user) => {
				this.user = user; // Якщо користувач авторизований, зберігаємо його дані
			});
		},
	},
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.close {
	display: none;
}

@media (min-width: 550px) {
	.close {
		display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		z-index: 1;
		top: -20px;
		left: 0;
		width: 100%;
		height: 120%;
		background-color: red;

		font-size: 64px;
		color: white;
	}

	.menu.active ul {
		z-index: 5;
	}
}

.nav {
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px;
}

ul {
	display: none;
	flex-direction: column;
	list-style-type: none;
	gap: 0.4rem;
	padding: 0;
	margin: 0;
	background-color: #fff;
	border-radius: 5px;
}

.menu.active {
	position: absolute;
	top: 80px;
	display: flex;
	width: 100%;
	max-width: 550px;
	left: 0;
	z-index: 10;
	padding: 10px 0;
}

.menu-btn img {
	width: 35px;
	height: 35px;
	cursor: pointer;
}

.account-btn img {
	width: 30px;
	height: 30px;
	cursor: pointer;
}

ul li {
	padding: 10px 15px;
	text-align: center;
}

ul li a {
	text-decoration: none;
	color: #333;
	font-family: "Lato", sans-serif;
	font-weight: 400;
	transition: 333ms ease;
}

ul li a:hover {
	color: #007bff;
}
</style>
