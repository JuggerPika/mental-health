<template>
	<div class="login-form">
		<form @submit.prevent="login">
			<h2>
				Увійдіть<br />
				у ваш аккаунт
			</h2>
			<div>
				<!-- <label for="email">Електронна пошта:</label> -->
				<input
					type="email"
					v-model="email"
					id="email"
					placeholder="Email*"
					required
				/>
			</div>
			<div>
				<!-- <label for="password">Пароль:</label> -->
				<input
					type="password"
					v-model="password"
					id="password"
					placeholder="Password*"
					required
				/>
			</div>
			<button type="submit">Увійти</button>
			<p>{{ errorMessage }}</p>
		</form>

		<p class="create-acc">
			Немає аккаунту? <router-link to="/register">Створити</router-link>
		</p>

		<p class="forget-pass">
			<router-link to="/forgot-password" @click.prevent="forgotPassword">
				Забули пароль?
			</router-link>
		</p>
	</div>
</template>

<script>
import { auth } from "../data/.firebase";
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
				await signInWithEmailAndPassword(
					auth,
					this.email,
					this.password
				);

				this.$router.push("/dashboard");
			} catch (error) {
				this.errorMessage = error.message;
			}
		},

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

<style scoped>
.login-form {
	height: 86vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.login-form h2 {
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

.create-acc {
	margin-top: 20px;
}
</style>
