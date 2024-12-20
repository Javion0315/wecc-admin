<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">
				電表管理原始資料
			</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div class="text-gray-600 text-base">資料清單</div>
		</div>

		<div class="mt-4 rounded-lg bg-white pb-4">
			<div class="px-4 pt-4 flex justify-end items-center text-gray-800">
				日期篩選：
				<v-date-picker
					v-model="date"
					color="blue"
					class="ml-4"
					:max-date="new Date()"
				>
					<template v-slot="{ inputValue, inputEvents }">
						<input
							class="text-gray-800 border px-2 py-1 rounded text-left"
							:value="inputValue"
							v-on="inputEvents"
						/>
					</template>
				</v-date-picker>
				<CommonButton size="small" class="w-20 ml-2" @click.native="date = ''">
					<span class="text-sm">清除</span>
				</CommonButton>
			</div>

			<div class="mt-4 text-gray-800 overflow-x-auto">
				<div class="px-4" v-if="rawList && rawList.length === 0 && !isLoading">
					<div
						class="text-center text-white py-4 bg-gray-300 w-full rounded-lg"
					>
						查無資料
					</div>
				</div>
				<table class="min-w-full table-auto border-collapse text-sm" v-else>
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-12 min-w-[50px] py-2 px-3">#</th>
							<th class="w-40 min-w-[150px] py-2 px-3 whitespace-nowrap">id</th>
							<th class="w-40 min-w-[100px] py-2 px-3">DeviceSeq</th>
							<th class="w-56 min-w-[100px] py-2 px-3">EventDate</th>
							<th class="w-36 min-w-[100px] py-2 px-3">EventMinutes</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueCap</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueDem</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueKw</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueKwd</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueKwm</th>
							<th class="w-36 min-w-[100px] py-2 px-3">valueMdm</th>
							<th class="w-36 min-w-[100px] py-2 px-3">CreateTime</th>
						</tr>
					</thead>

					<!-- Table Body -->
					<tbody>
						<tr
							v-for="(item, idx) in rawList"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap text-left"
						>
							<td class="w-12 min-w-[50px] py-4 px-3">{{ item.sequenceNo }}</td>
							<td class="w-40 min-w-[150px] py-4 px-3">{{ item.id }}</td>
							<td class="w-40 min-w-[100px] py-4 px-3">{{ item.deviceSeq }}</td>
							<th class="w-56 min-w-[100px] py-2 px-3">
								{{ item.eventDate }}
							</th>
							<th class="w-36 min-w-[100px] py-2 px-3">
								{{ item.eventMinutes }}
							</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueCap }}</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueDem }}</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueKw }}</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueKwd }}</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueKwm }}</th>
							<th class="w-36 min-w-[100px] py-2 px-3">{{ item.valueMdm }}</th>
							<td class="w-56 min-w-[100px] py-4 px-3">
								{{ item.createTime }}
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
import { getAdminRawDataElectric } from "@/api/rawData";

export default {
	data() {
		return {
			date: "",
			inputValue: "",
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
				EventDate: this.date && this.$moment(this.date).format("YYYY-MM-DD"),
			};
			getAdminRawDataElectric(payLoad)
				.then((res) => {
					this.rawList = res.data.dataElectric;
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
