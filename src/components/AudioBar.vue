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
					<div class="audio-time">
						<span
							>{{ formattedCurrentTime }} /
							{{ formattedDuration }}</span
						>
					</div>
				</div>
			</div>
			<div class="audio-controls">
				<button @click="togglePlayPause">
					{{ isPlaying ? "⏸" : "▶️" }}
				</button>
			</div>
		</div>
	</div>
	<div style="padding-bottom: 100px"></div>
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
		formattedCurrentTime() {
			return this.formatTime(this.track.currentTime);
		},
		formattedDuration() {
			return this.formatTime(this.track.duration);
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

		hiden() {
			this.visible = false;
		},

		formatTime(time) {
			const minutes = Math.floor(time / 60);
			const seconds = Math.floor(time % 60);
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
	bottom: -1px;
	left: 0;
	width: 100%;
	height: 84px;
	background-color: #fff;
	color: black;
	display: flex;
	flex-direction: column;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: 333ms ease-in-out;
}

button {
	border: none;
	background-color: white;
	font-size: 28px;
}

.for-bar {
	display: flex;
	justify-content: space-between;
	padding: 8px 20px 6px 20px;
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
	background: grey;
	overflow: hidden;
	transition: 200ms ease;
}

.progress-container:hover {
	height: 8px;
}

.progress {
	height: 100%;
	background-color: black;
	transition: width 0.3s ease;
}
</style>
