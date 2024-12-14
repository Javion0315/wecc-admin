<template>
	<div class="absolute inset-0 top-16 z-50">
		<div
			class="bg-primary-blue w-52 top-0 absolute inset-0 overflow-y-auto max-lg:bg-dark-black100 p-4"
		>
			<div
				class="flex justify-start items-center py-3 pl-6 pr-12 hover:bg-[#2E394E] cursor-pointer text-base whitespace-nowrap"
				v-for="item in menuList"
				:key="item.value"
				@click="goPath(item)"
				:class="
					menuActived === item.value
						? 'border-l-2 border-white bg-[#2E394E] rounded'
						: 'text-neutral-300'
				"
			>
				<font-awesome-icon :icon="item.icon" size="lg" />
				<div class="ml-4">{{ item.label }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			menuActived: this.$route.name || "index",
			menuList: [{ label: "首頁", value: "index", icon: ["fas", "house"] }],
		};
	},
	computed: {
		...mapGetters(["getToggleState"]),
	},
	methods: {},
};
</script>
