<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">系統管理</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div class="text-gray-600 text-base">平台地圖簡介</div>
		</div>

		<div class="mt-4 rounded-lg bg-white">
			<div
				class="text-xl text-gray-800 font-medium border-b border-gray-400 p-4"
			>
				平台地圖簡介
			</div>
			<div class="p-4">
				<div>
					<div class="text-base text-gray-600">標題名稱</div>
					<input
						v-model="title"
						type="text"
						class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
						placeholder="標題名稱"
					/>
					<div class="text-base text-gray-600 mt-6 mb-1">文字敘述</div>
					<VueEditor class="text-gray-800" v-model="editorContent" />
				</div>
				<CommonButton size="large" class="w-24 mt-6" @click.native="save()">
					<span class="text-sm">儲存</span>
				</CommonButton>
			</div>
		</div>
	</div>
</template>

<script>
import { getArticles, putArticles } from "~/api/information";

export default {
	data() {
		return {
			title: "",
			editorContent: "",
			isLoading: false,
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.isLoading = true;
			getArticles(2)
				.then((res) => {
					if (res.status === 200) {
						this.title = res.data.artileTitle;
						this.editorContent = res.data.articleContent;
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		save() {
			let payload = {
				serialNumber: 2,
				artileTitle: this.title,
				articleContent: this.editorContent,
			};
			this.isLoading = true;
			putArticles(payload)
				.then((res) => {
					if (res.status === 200) {
						this.$swal.fire({
							title: res.data,
							type: "success",
						});
						this.getData();
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
