<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div class="text-gray-800 flex justify-start items-center">
			<div class="border-r border-gray-500 pr-4 mr-4 text-xl">權限管理</div>
			<font-awesome-icon
				:icon="['fas', 'house']"
				class="mr-4 text-base text-blue-500"
			/>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mr-4" />
			<div class="text-gray-600 text-base">帳戶管理</div>
		</div>

		<div class="mt-4 rounded-lg bg-white px-4 pt-4 pb-8">
			<div
				class="text-blue-500 font-bold text-xl cursor-pointer"
				@click="$router.push({ name: 'user-add' })"
			>
				+ 新增帳戶
			</div>
			<div class="mt-4 text-gray-800 overflow-x-auto">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-12 min-w-[80px] py-2 px-3">#</th>
							<th class="w-40 min-w-[120px] py-2 px-3">姓名</th>
							<th class="w-40 min-w-[120px] py-2 px-3">帳號</th>
							<th class="w-56 min-w-[224px] py-2 px-3">E-mail</th>
							<th class="w-36 min-w-[100px] py-2 px-3">啟用</th>
							<th class="text-right py-2 px-3 min-w-[120px]">操作</th>
						</tr>
					</thead>

					<!-- Table Body -->
					<tbody>
						<tr
							v-for="(item, idx) in accountList"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap"
						>
							<td class="w-12 min-w-[80px] py-4 px-3">{{ item.sequenceNo }}</td>
							<td class="w-40 min-w-[120px] py-4 px-3">{{ item.name }}</td>
							<td class="w-40 min-w-[120px] py-4 px-3">{{ item.account }}</td>
							<td class="w-56 min-w-[224px] py-4 px-3">{{ item.email }}</td>
							<td class="w-36 min-w-[100px] py-4 px-3">{{ item.isEnable }}</td>
							<td class="text-right py-4 px-3">
								<div class="flex justify-end items-center">
									<div
										class="text-blue-500 font-medium pr-4 border-r border-gray-800 mr-4 cursor-pointer"
										@click="
											$router.push({
												name: 'user-id',
												params: { id: item.sequenceNo },
											})
										"
									>
										編輯
									</div>
									<div
										class="font-medium text-red-500 cursor-pointer"
										@click="deleteUser(item.sequenceNo)"
									>
										刪除
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { getAdminUser, deleteAdminUser } from "~/api/main";

export default {
	data() {
		return {
			accountList: [],
			isLoading: false,
		};
	},
	methods: {
		getList() {
			this.isLoading = true;
			getAdminUser()
				.then((res) => {
					this.accountList = res.data;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		deleteUser(sequenceNo) {
			this.$swal
				.fire({
					title: "確定要刪除此帳戶嗎？",
					cancelButtonText: "取消",
					showCancelButton: true,
					type: "warning",
				})
				.then((result) => {
					if (result.value) {
						this.isLoading = true;
						deleteAdminUser(sequenceNo)
							.then(() => {
								this.$swal.fire({
									title: "刪除成功",
									type: "success",
								});
								this.getList();
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

