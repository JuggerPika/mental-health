import { createStore } from "vuex";
import courses from "./modules/courses";

const store = createStore({
	modules: {
		courses,
	},
});

export default store;
