<template>
	<div>
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">個案管理</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div
				class="text-blue-500 text-base cursor-pointer font-bold"
				@click="$router.push({ name: 'user' })"
			>
				計畫個案清單
			</div>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mx-4" />
			<div class="text-gray-600 text-base">新增個案</div>
		</div>
		<div class="mt-4 rounded-lg bg-white pb-8">
			<div
				class="text-xl text-gray-800 font-medium border-b border-gray-400 p-4"
			>
				新增個案
			</div>
			<CaseAction />
		</div>
	</div>
</template>
