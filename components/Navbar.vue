<template>
	<div
		class="bg-white text-gray-800 shadow-md p-4 flex justify-between items-center text-lg h-16"
		:class="getToggleState && 'ml-64'"
	>
		<font-awesome-icon
			class="mr-4 cursor-pointer"
			:icon="['fas', 'bars']"
			size="lg"
			@click="toggle"
		/>
		<div class="text-base cursor-pointer" @click="logout">登出</div>
	</div>
</template>

<script>
import { getAdminLogout } from "@/api/main";
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
		logout() {
			getAdminLogout().then((res) => {
				this.$swal
					.fire({
						title: res.data,
						type: "success",
					})
					.then(() => {
						this.$router.push("/login");
					});
			});
		},
	},
};
</script>
