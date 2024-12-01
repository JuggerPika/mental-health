<template>
	<div class="course-detail">
		<img
			v-if="course?.image"
			:src="course.image"
			:alt="course.title"
			class="course-image"
		/>
		<p v-if="course?.description">{{ course.description }}</p>
		<div v-if="course">
			<button @click="startPlaying">Play</button>
		</div>
		<div v-if="course">
			<input
				type="checkbox"
				v-model="course.completed"
				:id="'course-' + course.id"
				:disabled="!course.clickable"
			/>
			<label :for="'course-' + course.id">Mark as Completed</label>
		</div>
	</div>
</template>

<script>
import { sections } from "../data/coursesData";

export default {
	name: "CourseDetail",
	data() {
		return {
			course: null,
		};
	},
	created() {
		// Fetch course by ID
		const id = this.$route.params.id;
		this.course = this.getCourseById(id);

		// Redirect if course not found
		if (!this.course) {
			this.$router.replace("/404");
		}
	},
	methods: {
		/**
		 * Find course by ID from sections
		 */
		getCourseById(id) {
			for (const section of sections) {
				const course = section.items.find((item) => item.id === id);
				if (course) {
					// Ensure completed property exists
					course.completed = course.completed ?? false;
					return course;
				}
			}
			return null;
		},

		/**
		 * Start playing the audio and notify App.vue
		 */
		startPlaying() {
			if (this.course && this.course.music) {
				// Передаємо трек у батьківський компонент
				this.$emit("play-track", {
					title: this.course.title,
					artist: "Unknown Artist",
					image: this.course.image,
					src: this.course.music, // Шлях до аудіо
					duration: 300, // Симуляція тривалості
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
	padding: 20px;
	text-align: center;
	font-family: Arial, sans-serif;
}

.course-image {
	width: 100%;
	height: auto;
	max-width: 300px;
	margin: 0px auto;
	border-radius: 25px;
}

button {
	margin: 10px;
	padding: 10px 20px;
	font-size: 16px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: #fff;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #0056b3;
}

input[type="checkbox"] {
	margin-right: 10px;
	transform: scale(1.2);
	cursor: pointer;
}
</style>
