<template>
	<div id="app">
		<AudioBar
			v-if="currentTrack"
			:track="currentTrack"
			:isPlaying="isPlaying"
			@toggle-play-pause="togglePlayPause"
			@seek="seekTrack"
		/>
		<router-view @play-track="playTrack" />
		<Navbar />
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AudioBar from "./components/AudioBar.vue";
import { Howl } from "howler";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { fetchUserCourses } from "./services/firestoreService";
import { sections } from "./data/coursesData";

export default {
	components: {
		Navbar,
		AudioBar,
	},
	data() {
		return {
			currentTrack: null,
			isPlaying: false,
			sound: null,
		};
	},
	methods: {
		seekTrack(newTime) {
			if (this.sound) {
				this.sound.seek(newTime); // Виконує перемотування
				this.currentTrack.currentTime = newTime; // Оновлює поточний час треку
			} else {
				console.error("Sound object is not initialized.");
			}
		},

		playTrack(track) {
			if (this.sound) {
				this.sound.stop();
			}

			this.currentTrack = track;
			this.isPlaying = true;

			this.sound = new Howl({
				src: [track.src],
				html5: true,
				volume: 0.8,
				onend: () => {
					this.isPlaying = false;
				},
			});

			this.sound.play();
			this.updateProgress();
		},

		updateProgress() {
			if (this.sound) {
				setInterval(() => {
					if (this.isPlaying) {
						const currentTime = this.sound.seek();
						const duration = this.sound.duration();
						this.currentTrack.currentTime = currentTime;
						this.currentTrack.duration = duration;
					}
				}, 200);
			}
		},

		togglePlayPause() {
			if (this.sound) {
				if (this.isPlaying) {
					this.sound.pause();
				} else {
					this.sound.play();
				}
				this.isPlaying = !this.isPlaying;
			}
		},
	},
	created() {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const fetchedCourses = await fetchUserCourses(user.uid);
				const finalCourses =
					fetchedCourses.length > 0
						? fetchedCourses
						: sections.flatMap((s) => s.items);
				this.$store.dispatch("courses/initCourses", finalCourses);
			} else {
				this.$store.dispatch(
					"courses/initCourses",
					sections.flatMap((s) => s.items)
				);
			}
		});
	},
};
</script>

<style>
#app {
	font-family: Arial, sans-serif;
}
</style>
