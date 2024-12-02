<template>
	<div>
		<h2 v-if="user">Привіт, {{ user.email }}!</h2>
		<p v-if="user">Ласкаво просимо до вашої особистої сторінки.</p>
		<p v-else>Завантаження даних користувача...</p>
		<button v-if="user" @click="logout">Вийти</button>
	</div>
</template>

<script>
import { auth } from "../data/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default {
	data() {
		return {
			user: null,
		};
	},
	methods: {
		async logout() {
			await signOut(auth); // Вихід з системи
			this.$router.push("/login"); // Перенаправлення на сторінку входу
		},
	},
	mounted() {
		// Перевірка стану користувача за допомогою onAuthStateChanged
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.user = user;
			} else {
				this.$router.push("/login"); // Якщо немає користувача, перенаправляємо на login
			}
		});
	},
};
</script>
