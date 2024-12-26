<template>
	<div
		class="bg-black/60 w-full h-full backdrop-blur-[2px] flex justify-center items-center fixed top-0 left-0 z-30"
	>
		<div
			class="bg-white rounded shadow-md relative"
			:class="customWidth ? customWidth : 'w-[345px] lg:w-1/2'"
		>
			<div
				class="absolute top-5 right-4 w-5 h-5 cursor-pointer"
				@click="$emit('close')"
			>
				<font-awesome-icon
					class="text-xl text-gray-800"
					:icon="['fas', 'xmark']"
				/>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		customWidth: {
			type: String,
			required: false,
			default: "",
		},
	},
	mounted() {
		document.body.style.overflow = "hidden";
	},
	destroyed() {
		document.body.removeAttribute("style");
	},
};
</script>
