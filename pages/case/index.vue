<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">個案管理</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div class="text-gray-600 text-base">計畫個案清單</div>
		</div>

		<div class="mt-4 rounded-lg bg-white px-4 pt-4 pb-8">
			<div
				class="text-blue-500 font-bold text-xl cursor-pointer"
				@click="$router.push({ name: 'case-add' })"
			>
				+ 新增個案
			</div>
			<div class="mt-4 text-gray-800 overflow-x-auto">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-12 min-w-[80px] py-2 px-3">#</th>
							<th class="w-40 min-w-[120px] py-2 px-3">名稱</th>
							<th class="w-40 min-w-[100px] py-2 px-3">計畫代碼</th>
							<th class="w-56 min-w-[100px] py-2 px-3">建築代碼</th>
							<th class="w-36 min-w-[100px] py-2 px-3">建築類型</th>
							<th class="w-36 min-w-[100px] py-2 px-3">啟用</th>
							<!-- <th class="w-36 min-w-[224px] py-2 px-3">E-mail</th> -->
							<th class="w-36 min-w-[100px] py-2 px-3">最後修改</th>
							<th class="text-right py-2 px-3 min-w-[120px]">操作</th>
						</tr>
					</thead>

					<!-- Table Body -->
					<tbody>
						<tr
							v-for="(item, idx) in caseList"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap"
						>
							<td class="w-12 min-w-[80px] py-4 px-3">{{ item.sequenceNo }}</td>
							<td class="w-40 min-w-[120px] py-4 px-3">{{ item.name }}</td>
							<td class="w-40 min-w-[100px] py-4 px-3">{{ item.planCode }}</td>
							<th class="w-56 min-w-[100px] py-2 px-3">
								{{ item.buildingCode }}
							</th>
							<th class="w-36 min-w-[100px] py-2 px-3">
								{{ item.buildingType }}
							</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.isEnable }}</th>
							<!-- <td class="w-56 min-w-[224px] py-4 px-3">{{ item.email }}</td> -->
							<td class="w-36 min-w-[100px] py-4 px-3">
								{{ item.updateTime }}
							</td>
							<td class="text-right py-4 px-3">
								<div class="flex justify-end items-center">
									<div
										class="text-blue-500 font-medium pr-4 border-r border-gray-800 mr-4 cursor-pointer"
										@click="
											$router.push({
												name: 'case-id',
												params: { id: item.sequenceNo },
											})
										"
									>
										編輯
									</div>
									<div
										class="font-medium text-red-500 cursor-pointer"
										@click="deleteCase(item.sequenceNo)"
									>
										刪除
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div class="flex justify-center items-center mt-4">
				<button
					:disabled="page === 1"
					class="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg mr-2 disabled:opacity-40"
					@click="changePage(page - 1)"
				>
					上一頁
				</button>

				<!-- Dynamic Page Numbers -->
				<div class="flex space-x-2">
					<button
						v-for="n in paginationRange"
						:key="n"
						:class="{
							'bg-blue-500 text-white': page === n,
							'bg-gray-300 text-gray-600': page !== n,
						}"
						class="px-4 py-2 rounded-lg"
						@click="changePage(n)"
					>
						{{ n }}
					</button>
				</div>

				<button
					:disabled="page === totalPages"
					class="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg ml-2 disabled:opacity-40"
					@click="changePage(page + 1)"
				>
					下一頁
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { getCase, deleteCase } from "~/api/case";

export default {
	data() {
		return {
			caseList: [],
			isLoading: false,
			page: 1,
			pageRow: 20,
			total: 0,
		};
	},
	computed: {
		totalPages() {
			return Math.ceil(this.total / this.pageRow);
		},
		paginationRange() {
			const range = [];
			for (let i = 1; i <= this.totalPages; i++) {
				range.push(i);
			}
			return range;
		},
	},
	methods: {
		getList() {
			this.isLoading = true;
			getCase(this.page, this.pageRow) // Use current page and rows per page
				.then((res) => {
					this.caseList = res.data.caseInfo;
					this.total = res.data.caseCount;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},

		changePage(newPage) {
			if (newPage > 0 && newPage <= this.totalPages) {
				this.page = newPage;
				this.getList();
			}
		},

		deleteCase(sequenceNo) {
			this.$swal
				.fire({
					title: "確定要刪除這條記錄嗎？",
					cancelButtonText: "取消",
					showCancelButton: true,
					type: "warning",
				})
				.then((result) => {
					if (result.value) {
						this.isLoading = true;
						deleteCase(sequenceNo)
							.then(() => {
								this.$swal.fire({
									title: "刪除成功",
									type: "success",
								});
								this.getList(); // Refresh list after deletion
							})
							.finally(() => {
								this.isLoading = false;
							});
					}
				});
		},
	},
	mounted() {
		this.getList();
	},
};
</script>
