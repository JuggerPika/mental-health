// src/store/modules/courses.js

import { sections } from "../../data/coursesData.js";

const state = {
	allCourses: sections.flatMap((section) => section.items),
};

const mutations = {
	SET_COURSES(state, courses) {
		state.allCourses = courses;
	},
	UPDATE_COURSE_STATUS(state, { id, completed }) {
		const course = state.allCourses.find((course) => course.id === id);
		if (course) {
			course.completed = completed;
		}
	},
};

const getters = {
	completedCourses: (state) =>
		state.allCourses.filter((course) => course.completed),
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
};
