<template>
	<div>
		<h2>Вхід</h2>
		<form @submit.prevent="login">
			<div>
				<label for="email">Електронна пошта:</label>
				<input
					type="email"
					v-model="email"
					id="email"
					placeholder="Введіть електронну пошту"
					required
				/>
			</div>
			<div>
				<label for="password">Пароль:</label>
				<input
					type="password"
					v-model="password"
					id="password"
					placeholder="Введіть пароль"
					required
				/>
			</div>
			<button type="submit">Увійти</button>
			<p>{{ errorMessage }}</p>
		</form>

		<!-- Кнопка для переходу до форми реєстрації -->
		<p>
			Немає аккаунту? <router-link to="/register">Створити</router-link>
		</p>
		<!-- Кнопка для скидання пароля -->
		<p>
			<router-link to="/forgot-password" @click.prevent="forgotPassword">
				Забули пароль?
			</router-link>
		</p>
	</div>
</template>

<script>
import { auth } from "../data/firebase";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";

export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		async login() {
			try {
				// Авторизація користувача
				await signInWithEmailAndPassword(
					auth,
					this.email,
					this.password
				);
				// Перенаправлення на Dashboard після успішного входу
				this.$router.push("/dashboard");
			} catch (error) {
				this.errorMessage = error.message; // Показуємо повідомлення про помилку
			}
		},
		// Функція для скидання пароля
		async forgotPassword() {
			try {
				await sendPasswordResetEmail(auth, this.email);
				alert(
					"Інструкції для скидання пароля надіслані на вашу електронну пошту."
				);
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
	},
};
</script>
