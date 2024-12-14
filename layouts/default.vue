<template>
	<div class="text-white min-h-screen bg-[#F7F8FA]" v-cloak>
		<div>
			<Navbar v-if="$route.name !== 'login'" />
			<div class="flex">
				<Sidebar
					class="sticky top-0 min-h-screen"
					v-if="getToggleState && $route.name !== 'login'"
				/>
				<main class="w-full">
					<Nuxt
						:class="[
							'p-6',
							getToggleState && windowWidth >= 840 && $route.name !== 'login'
								? 'ml-64'
								: 'ml-0',
						]"
					/>
				</main>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			windowWidth: "",
		};
	},
	mounted() {
		this.windowWidth = window.innerWidth;
		if (this.windowWidth <= 1080) {
			this.$store.dispatch("setMenu", false);
		}
		window.addEventListener("resize", () => {
			this.windowWidth = window.innerWidth;
		});
	},
	computed: {
		...mapGetters(["getToggleState"]),
	},
};
</script>
