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

		<div class="mt-4 rounded-lg bg-white px-4 pt-4 pb-8">
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
							<th class="text-right py-2 px-3 min-w-[120px]">操作</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
						<tr
							class="text-center"
							v-if="list && list.length === 0 && !isLoading"
						>
							<td colspan="7" class="py-4">目前尚無告警資料！</td>
						</tr>
						<!-- <tr
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
							<td class="w-56 min-w-[224px] py-4 px-3">{{ item.email }}</td>
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
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			list: [],
		};
	},
};
</script>
