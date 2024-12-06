<template>
	<div class="course-detail">
		<div class="our-course">
			<div class="course-image" style="">
				<div>
					<p>{{ course.title }}</p>
				</div>

				<button @click="startPlaying">Слухати курс</button>
			</div>
			<h2>Про що курс</h2>
			<p v-if="course?.description">{{ course.description }}</p>
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
	</div>
</template>

<script>
import { sections } from "../data/coursesData";
import { mapState, mapActions } from "vuex";

export default {
	name: "CourseDetail",
	data() {
		return {
			course: null,
		};
	},
	computed: {
		...mapState({
			courses: (state) => state.courses.allCourses,
		}),
	},
	created() {
		const id = this.$route.params.id;
		this.course = this.getCourseById(id);

		if (!this.course) {
			this.$router.replace("/404");
		}
	},
	methods: {
		getCourseById(id) {
			for (const section of sections) {
				const course = section.items.find((item) => item.id === id);
				if (course) {
					course.completed = course.completed ?? false;
					return course;
				}
			}
			return null;
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
		goBack() {
			this.$router.back();
		},

		...mapActions(["updateCourseStatus"]),
		toggleCourseCompletion(course) {
			this.updateCourseStatus({
				id: course.id,
				completed: course.completed,
			});
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
}

.our-course h2 {
	margin-top: 20px;
}

.our-course p {
	margin: 10px 0 5px 0px;
	font-size: 18px;
	text-align: left;
}
.course-image {
	width: 100%;
	height: auto;
	max-width: 650px;
	height: 200px;
	margin: 0px auto;
	border-radius: 25px;
	/* background-image: url("../assets/729337793887.jpg"); */
	/* background-position: center; */
	background-size: cover;
	display: flex;
	justify-content: end;
	align-items: end;
	flex-direction: column;
	padding: 20px;
}

.course-image p {
	color: #000;
	display: flex;
	justify-content: center;
	width: 180px;
	line-height: 22px;
	text-align: right;
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
	background-color: #0056b3;
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
