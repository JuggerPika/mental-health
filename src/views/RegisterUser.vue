<template>
	<div class="reg-form">
		<form @submit.prevent="register">
			<h2>
				Зареєструвати<br />
				новий аккаунт
			</h2>
			<div>
				<!-- <label for="email">Електронна пошта:</label> -->
				<input
					type="email"
					v-model="email"
					id="email"
					placeholder="Введіть електронну пошту"
					required
				/>
			</div>
			<div>
				<!-- <label for="password">Пароль:</label> -->
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
		<p class="login-acc">
			Є аккаунт? <router-link to="/login">Увійти</router-link>
		</p>
	</div>
</template>

<script>
import { auth } from "../data/.firebase";
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

<style scoped>
.reg-form {
	height: 86vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.reg-form h2 {
	font-size: 24px;
	margin: 10px;
	text-align: center;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px 40px;
	border: 1px solid gainsboro;
	border-radius: 20px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

form div {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
}

form div input {
	border: none;
	outline: none;
	font-size: 16px;
	color: #777;
	font-weight: 300;
	border-bottom: 1px solid black;

	transition: 333ms ease-in-out;
}

form button {
	border: none;
	margin-top: 30px;
	border-radius: 5px;
	padding: 5px 0px;
	background: lightskyblue;
	color: white;
	transition: 333ms ease-in-out;
	border: 1px solid lightskyblue;
}

form button:focus {
	border: 1px solid lightskyblue;
	color: lightskyblue;
	background-color: transparent;
}

form button:hover {
	border: 1px solid black;
	color: black;
	background-color: transparent;
}

.login-acc {
	margin-top: 20px;
}
</style>
