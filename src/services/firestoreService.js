// services/firestoreService.js
import { db, auth } from "../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

export async function saveCourseData(userId, course) {
	const user = auth.currentUser;
	if (!user) {
		console.error("User is not logged in");
		return;
	}
	const docRef = doc(db, `users/${userId}/courses`, course.id);
	await setDoc(docRef, {
		title: course.title,
		description: course.description,
		completed: course.completed,
		clickable: course.clickable ?? true,
		id: course.id,
	});
}

export async function fetchUserCourses(userId) {
	const userCoursesRef = collection(db, `users/${userId}/courses`);
	const querySnapshot = await getDocs(userCoursesRef);
	const courses = [];
	querySnapshot.forEach((doc) => {
		courses.push({ id: doc.id, ...doc.data() });
	});
	return courses;
}
