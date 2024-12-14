<template>
	<div
		class="bg-white text-gray-800 shadow-md p-4 flex justify-start items-center text-lg h-16"
		:class="getToggleState && 'ml-64'"
	>
		<font-awesome-icon
			class="mr-4 cursor-pointer"
			:icon="['fas', 'bars']"
			size="lg"
			@click="toggle"
		/>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
	mounted() {
		this.onScreenResize();
	},
	computed: {
		...mapGetters(["getToggleState"]),
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
