<template>
	<div>
		<div
			class="!font-medium text-center shadow-md cursor-pointer"
			:class="[
				variant === 'outlined' && color === 'black'
					? '!border-gray-500 !text-gray-800 hover:!bg-gray-800/40 hover:!text-white hover:!ring-4  hover:!border-none'
					: variant === 'outlined' && color === 'red'
					? '!border-red-400 !text-red-400 hover:!bg-red-400 hover:!text-white hover:!ring-4  hover:!border-none'
					: variant === 'outlined'
					? '!text-gray-500 !bg-white/25 !border-primary-blue hover:!bg-blue-500 hover:!text-white'
					: color === 'slate'
					? '!bg-slate-700 !text-white !text-sm !font-medium h-8 !rounded leading-8 hover:!bg-slate-600'
					: color === 'red'
					? '!bg-red-400 !text-white hover:!bg-red-300'
					: '!bg-primary-blue !text-white hover:!bg-blue-500 ',
				size === 'large'
					? '!h-10 !rounded !leading-10  !text-base'
					: 'h-8 !rounded leading-8',
				custom,
			]"
			:outlined="variant === 'outlined'"
			elevation="0"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		variant: {
			type: String,
			required: false,
			default: "default", //default, outlined
		},
		color: {
			type: String,
			required: false,
			default: "", //black
		},
		size: {
			type: String,
			required: false,
			default: "small",
		},
		custom: {
			type: [String, Boolean],
			required: false,
			default: "",
		},
	},
};
</script>
