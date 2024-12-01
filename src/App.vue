<template>
	<div id="app">
		<Navbar />
		<router-view @play-track="playTrack" />
		<AudioBar
			v-if="currentTrack"
			:track="currentTrack"
			:isPlaying="isPlaying"
			@toggle-play-pause="togglePlayPause"
			@seek="seekTrack"
		/>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AudioBar from "./components/AudioBar.vue";
import { Howl } from "howler";

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
				console.log(`Seeking to: ${newTime}s`); // Перевірка
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
};
</script>

<style>
#app {
	font-family: Arial, sans-serif;
}
</style>
