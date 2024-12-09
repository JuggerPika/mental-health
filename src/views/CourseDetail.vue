<template>
	<div class="course-detail">
		<div class="our-course">
			<div class="course-image">
				<div>
					<p>{{ course?.title }}</p>
				</div>
				<button @click="startPlaying">Слухати курс</button>
			</div>
			<div class="left-c"></div>
			<h2>Про що курс</h2>
			<p>{{ course.description }}</p>
		</div>

		<div v-if="course">
			<input
				type="checkbox"
				v-model="course.completed"
				:id="'course-' + course.id"
				:disabled="!course.clickable"
				@change="toggleCourseCompletion(course)"
			/>
			<label :for="'course-' + course.id">Позначити завершиним</label>
		</div>
		<div v-else>
			<p>Курс не знайдено</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { saveCourseData } from "../services/firestoreService";
import { auth } from "../firebase";

export default {
	data() {
		return {
			course: null,
		};
	},
	computed: {
		...mapState({
			courses: (state) => state.courses.allCourses,
		}),
		currentUser() {
			return auth.currentUser;
		},
	},
	created() {
		const id = this.$route.params.id;

		// Якщо список курсів ще не завантажений (наприклад, пустий масив), почекайте або використовуйте watch
		if (this.courses.length === 0) {
			// Можна почекати кілька мілісекунд (не найкраща практика) або перейти на інший хук
			setTimeout(() => {
				const course = this.courses.find((c) => c.id === id);
				if (!course) {
					this.$router.replace("/404");
				} else {
					this.course = course;
				}
			}, 500);
		} else {
			const course = this.courses.find((c) => c.id === id);
			if (!course) {
				this.$router.replace("/404");
			} else {
				this.course = course;
			}
		}
	},
	methods: {
		...mapActions("courses", ["updateCourseStatus"]),
		async toggleCourseCompletion(course) {
			await this.updateCourseStatus({
				id: course.id,
				completed: course.completed,
			});
			if (this.currentUser && this.currentUser.uid) {
				try {
					await saveCourseData(this.currentUser.uid, course);
				} catch (error) {
					console.error("Error saving course data:", error);
				}
			}
		},
		startPlaying() {
			if (this.course && this.course.music) {
				this.$emit("play-track", {
					title: this.course.title,
					image: this.course.image,
					src: this.course.music,
					duration: 300,
				});
			} else {
				console.error("Audio file not found for this course.");
			}
		},
	},
};
</script>

<style scoped>
.course-detail {
	max-width: 800px;
	margin: 0 auto;
	padding: 10px 20px;
	text-align: center;
	font-family: Arial, sans-serif;
	display: flex;
	flex-direction: column;
	align-items: start;
}

.our-course {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.our-course h2 {
	margin-top: 20px;
	font-size: 24px;
}

.our-course p {
	font-size: 14px;
	text-align: left;
}

.course-image {
	width: 100%;
	height: auto;
	max-width: 650px;
	height: 300px;
	margin: 0px auto;
	border-radius: 25px;
	background-image: url("../assets/bg1.jpg");
	background-position: center;
	background-size: cover;
	display: flex;
	justify-content: end;
	align-items: start;
	flex-direction: column;
	padding: 20px;
	text-align: left;
}

.course-image p {
	color: white;
	font-size: 16px;
	display: flex;
	justify-content: center;
	width: 180px;
	line-height: 22px;
	text-align: left;
}

button {
	margin-bottom: 10px;
	padding: 10px 40px;
	font-size: 16px;
	border: none;
	border-radius: 5px;
	background-color: #fff;
	color: #000;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: grey;
	color: white;
}

input[type="checkbox"] {
	margin-right: 10px;
	transform: scale(1.2);
	cursor: pointer;
}

.btn-return {
	position: fixed;
	background-color: black;
	width: 50px;
	height: 50px;
	right: 30px;
	bottom: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	transition: 333ms ease-in-out;
}

.btn-return img {
	width: 40px;
}
</style>
