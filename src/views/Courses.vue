<template>
	<div>
		<div
			class="f-section"
			v-for="(section, sIndex) in sections"
			:key="sIndex"
		>
			<div class="title">
				<h2>{{ section.title }}</h2>
				<p>{{ getSectionProgress(section) }}%</p>
			</div>

			<div class="horizontal-scroll-container">
				<CourseCard
					v-for="(item, index) in section.items"
					:key="item.id || `non-clickable-${sIndex}-${index}`"
					:item="item"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { sections } from "../data/coursesData";
import CourseCard from "../components/CourseCard.vue";

export default {
	name: "CoursesView",
	components: {
		CourseCard,
	},
	data() {
		return {
			sections,
		};
	},
	methods: {
		getSectionProgress(section) {
			const totalCourses = section.items.filter(
				(item) => item.clickable
			).length;

			if (totalCourses === 0) return 0;

			const completedCourses = section.items.filter(
				(item) => item.completed && item.clickable
			).length;

			return Math.round((completedCourses / totalCourses) * 100);
		},
	},
};
</script>

<style scoped>
.f-section {
	max-width: 550px;
	margin: 0 auto;
	margin: 0px 20px;
	margin-bottom: 30px;
	z-index: 1;
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

.horizontal-scroll-container::-webkit-scrollbar {
	display: none;
}

.horizontal-scroll-container {
	display: flex;
	gap: 10px;
	overflow-x: auto;
	z-index: 1001;
}

.non-clickable {
	cursor: default;
}
</style>
