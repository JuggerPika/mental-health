<template>
	<div class="close">
		<h2>Error</h2>
	</div>

	<nav class="nav">
		<a href="#" class="menu-btn" @click="toggleMenu">
			<img src="./../assets/menu.svg" alt="Menu" />
		</a>

		<h2>Курси</h2>

		<a href="#" class="account-btn">
			<img src="./../assets/account.svg" alt="Account" />
		</a>

		<ul class="menu" :class="{ active: isMenuOpen }">
			<li><router-link to="/courses">Курси</router-link></li>
			<li><router-link to="/community">Прогресс</router-link></li>
			<li><router-link to="/resources">Ресурси</router-link></li>
		</ul>
	</nav>
</template>

<script>
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
		};
	},
	watch: {
		$route(to) {
			this.updatePageTitle(to.path);
		},
	},
	created() {
		this.updatePageTitle(this.$route.path);
	},
	methods: {
		updatePageTitle(path) {
			this.currentPageTitle = this.pageTitles[path] || "Сторінка";
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
	},
};
</script>

<style>
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

		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: red;

		font-size: 64px;
		color: white;
	}

	.menu.active ul {
		z-index: 5;
	}
}
</style>

<style scoped>
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
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu.active {
	position: absolute;
	top: 80px;
	display: flex;
	width: 100%;
	max-width: 550px;
	left: 0;
	z-index: 10;
}

.menu-btn img {
	width: 36px;
	height: 36px;
	cursor: pointer;
}

.account-btn img {
	width: 42px;
	height: 42px;
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
