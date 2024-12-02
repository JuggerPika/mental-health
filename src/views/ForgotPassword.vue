<template>
	<div>
		<h2>Відновлення пароля</h2>
		<form @submit.prevent="sendResetEmail">
			<div>
				<label for="email">Електронна пошта:</label>
				<input
					type="email"
					v-model="email"
					id="email"
					placeholder="Введіть вашу електронну пошту"
					required
				/>
			</div>
			<button type="submit">Відправити інструкції</button>
			<p>{{ errorMessage }}</p>
		</form>
	</div>
</template>

<script>
import { auth } from "../data/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default {
	data() {
		return {
			email: "",
			errorMessage: "",
		};
	},
	methods: {
		async sendResetEmail() {
			try {
				// Відправлення інструкцій для скидання пароля
				await sendPasswordResetEmail(auth, this.email);
				alert(
					"Інструкції для скидання пароля надіслані на вашу електронну пошту."
				);
				this.$router.push("/login"); // Перенаправляємо на сторінку входу
			} catch (error) {
				this.errorMessage = error.message; // Показуємо повідомлення про помилку
			}
		},
	},
};
</script>
