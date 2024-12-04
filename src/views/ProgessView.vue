<template>
	<div class="main">
		<div v-if="completedCourses.length > 0" class="title">
			<h2>Завершені курси</h2>
		</div>
		<ul class="flex-container">
			<li
				v-for="course in completedCourses"
				:key="course.id"
				class="img-container"
			>
				<router-link
					:to="{
						name: 'CourseDetail',
						params: { id: course.id },
					}"
					class="course-link"
				>
					<img
						:src="course.image"
						:alt="course.title"
						class="images"
					/>
				</router-link>
			</li>

			<div v-if="completedCourses.length === 0" class="no-courses">
				<p>Поки не пройдено жодного курсу.</p>
			</div>
		</ul>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters("courses", ["completedCourses"]),
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="css" scoped>
.main {
	margin: 20px;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title h2,
.title p {
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
	margin: 10px;
	font-weight: 500;
}

.flex-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	padding: 0px 20px;
	list-style: none;
}

.img-container::after {
	content: "Complete";
	color: green;
	display: flex;
	justify-content: center;
	padding-top: 5px;
}

.images {
	width: 150px;
	height: 200px;
}
.images::after {
	content: "Complete";
	color: green;
	display: flex;
	justify-content: center;
	padding-top: 20px;
}
</style>
