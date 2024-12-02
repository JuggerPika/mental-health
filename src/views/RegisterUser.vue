<template>
	<div>
		<h2>Реєстрація</h2>
		<form @submit.prevent="register">
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
			<button type="submit">Зареєструватися</button>
			<p>{{ errorMessage }}</p>
		</form>

		<!-- Кнопка для переходу до форми входу -->
		<p>Є аккаунт? <router-link to="/login">Увійти</router-link></p>
	</div>
</template>

<script>
import { auth } from "../data/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		async register() {
			try {
				// Реєстрація користувача
				await createUserWithEmailAndPassword(
					auth,
					this.email,
					this.password
				);
				// Перенаправлення на Dashboard після реєстрації
				this.$router.push("/dashboard");
			} catch (error) {
				this.errorMessage = error.message; // Показуємо повідомлення про помилку
			}
		},
	},
};
</script>
