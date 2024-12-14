<template>
	<div
		class="bg-white text-gray-800 shadow-md p-4 flex justify-start items-center text-lg h-16"
	>
		<font-awesome-icon
			class="mr-4 cursor-pointer"
			:icon="['fas', 'bars']"
			size="lg"
			@click="toggle"
		/>
		<!-- <img width="50" src="@/assets/images/logo.svg" alt="logo" /> -->
		<div>高雄厝管理系統</div>
	</div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	mounted() {
		this.onScreenResize();
	},
	methods: {
		...mapMutations(["toggle"]),
		onScreenResize() {
			window.addEventListener("resize", () => {
				if (window.innerWidth <= 1080) {
					this.$store.dispatch("setMenu", false);
				} else {
					this.$store.dispatch("setMenu", true);
				}
			});
		},
	},
};
</script>
