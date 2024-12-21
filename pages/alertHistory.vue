<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">告警管理</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div class="text-gray-600 text-base">異常事件管理</div>
		</div>

		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-12 min-w-[80px] py-2 px-3">#</th>
							<th class="w-40 min-w-[100px] py-2 px-3">告警日期</th>
							<th class="w-40 min-w-[100px] py-2 px-3">告警時間</th>
							<th class="w-56 min-w-[100px] py-2 px-3">個案建築名稱</th>
							<th class="w-36 min-w-[100px] py-2 px-3">告警設備編號</th>
							<th class="w-36 min-w-[224px] py-2 px-3">E-mail</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
						<tr class="text-center" v-if="total === 0 && !isLoading">
							<td colspan="7" class="py-4">目前尚無告警資料！</td>
						</tr>
						<tr
							v-else
							v-for="(item, idx) in rawList"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap text-left"
						>
							<td class="w-12 min-w-[80px] py-4 px-3">{{ item.sequenceNo }}</td>
							<td class="w-40 min-w-[100px] py-4 px-3">{{ item.alterDate }}</td>
							<td class="w-40 min-w-[100px] py-4 px-3">{{ item.alterTime }}</td>
							<th class="w-56 min-w-[100px] py-2 px-3">
								{{ item.name }}
							</th>
							<th class="w-36 min-w-[100px] py-2 px-3">
								{{ item.deviceSeq }}
							</th>
							<td class="w-36 min-w-[224px] py-4 px-3">
								{{ item.email }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div
				class="flex justify-center items-center mt-4"
				v-if="rawList.length > 0"
			>
				<button
					@click="prevPage"
					:disabled="currentPage === 1"
					class="bg-primary-blue text-white rounded-md px-2 disabled:opacity-40"
				>
					<font-awesome-icon :icon="['fas', 'chevron-left']" />
				</button>
				<button
					v-for="(page, index) in pages"
					:key="'page' + index"
					@click="goToPage(page)"
				>
					<span
						class="mx-1 rounded-md px-2 py-[2px] text-white"
						:class="page === currentPage ? 'bg-primary-blue ' : 'bg-gray-400 '"
						v-if="page"
					>
						{{ page }}
					</span>
					<span v-else class="text-black"> ... </span>
				</button>
				<button
					@click="nextPage"
					:disabled="currentPage === total"
					class="bg-primary-blue text-white rounded-md px-2 disabled:opacity-40"
				>
					<font-awesome-icon :icon="['fas', 'chevron-right']" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { getAdminAlterHistory } from "~/api/alert";

export default {
	data() {
		return {
			rawList: [],
			isLoading: false,
			currentPage: 1,
			pageRow: 20,
			total: 0,
		};
	},
	watch: {
		date() {
			this.getData();
		},
		currentPage() {
			this.getData();
		},
	},
	mounted() {
		this.getData();
	},
	computed: {
		totalPages() {
			return Math.ceil(this.total / this.pageRow);
		},
		currentPageData() {
			const start = (this.currentPage - 1) * this.pageRow;
			const end = start + this.pageRow;
			return this.rawList.slice(start, end);
		},
		pages() {
			let pages = [];
			if (this.totalPages > 6) {
				if (this.currentPage <= 3) {
					pages = [1, 2, 3, 4, 5, null, this.totalPages];
				} else if (this.currentPage >= this.totalPages - 2) {
					pages = [
						1,
						null,
						this.totalPages - 4,
						this.totalPages - 3,
						this.totalPages - 2,
						this.totalPages - 1,
						this.totalPages,
					];
				} else {
					pages = [
						1,
						null,
						this.currentPage - 1,
						this.currentPage,
						this.currentPage + 1,
						null,
						this.totalPages,
					];
				}
			} else {
				// 如果總頁數沒有超過6，則生成1到總頁數的頁碼
				for (let i = 1; i <= this.totalPages; i++) {
					pages.push(i);
				}
			}
			return pages;
		},
	},
	methods: {
		getData() {
			this.isLoading = true;
			let payLoad = {
				page: this.currentPage,
				PageRow: this.pageRow,
			};
			getAdminAlterHistory(payLoad)
				.then((res) => {
					this.rawList = res.data.dataAlterHistory;
					this.total = res.data.rawDataCount;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
			}
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		},
		goToPage(page) {
			if (page) {
				this.currentPage = page;
			}
		},
	},
};
</script>
