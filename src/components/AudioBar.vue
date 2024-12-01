<template>
	<div class="audio-bar" v-if="visible">
		<div class="progress-container" @click="seekTrack">
			<div
				class="progress"
				:style="{ width: progressPercentage + '%' }"
			></div>
		</div>
		<div class="for-bar">
			<div class="audio-info">
				<img :src="track.image" alt="Album cover" class="audio-cover" />
				<div class="audio-details">
					<h3>{{ track.title }}</h3>
					<p>{{ track.artist }}</p>
				</div>
			</div>
			<div class="audio-controls">
				<button @click="togglePlayPause">
					{{ isPlaying ? "⏸" : "▶️" }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		track: {
			type: Object,
			required: true,
		},
		isPlaying: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		progressPercentage() {
			return (this.track.currentTime / this.track.duration) * 100 || 0;
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		togglePlayPause() {
			this.$emit("toggle-play-pause");
		},

		show() {
			this.visible = true;
		},

		seekTrack(event) {
			// Визначаємо координати кліку
			const progressBar = event.currentTarget;
			const clickX = event.offsetX;
			const barWidth = progressBar.offsetWidth;

			// Обчислюємо новий час
			const newTime = (clickX / barWidth) * this.track.duration;

			// Відправляємо подію в App.vue
			this.$emit("seek", newTime);
		},
	},
	created() {
		this.show();
	},
};
</script>

<style scoped>
.audio-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	background-color: #fff;
	color: black;
	display: flex;
	flex-direction: column;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
	z-index: 1000;
}

button {
	border: none;
	background-color: white;
}

.for-bar {
	display: flex;
	justify-content: space-between;
	padding: 20px;
}

.audio-info {
	display: flex;
	align-items: center;
	gap: 15px;
}

.audio-cover {
	width: 50px;
	height: 60px;
	border-radius: 5px;
}

.audio-details h3,
.audio-details p {
	margin: 0;
}

.audio-controls {
	display: flex;
	align-items: center;
	gap: 10px;
}

.progress-container {
	width: 100%;
	height: 4px;
	background: #fff;
	overflow: hidden;
}

.progress {
	height: 100%;
	background-color: #ffcc00;
	transition: width 0.3s ease;
}
</style>
