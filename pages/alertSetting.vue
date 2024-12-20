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
			<div class="text-gray-600 text-base">告警通知設定</div>
		</div>

		<!-- 數位電表 -->
		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="text-xl text-gray-800 font-bold">數位電表</div>
			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-40 min-w-[120px] py-2 px-3">個案名稱</th>
							<th class="w-40 min-w-[110px] py-2 px-3">設備編號</th>
							<th class="w-24 min-w-[60px] py-2 px-3">大於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">等於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">小於</th>
							<th class="w-44 min-w-[224px] py-2 px-3">通知 Email</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
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
			<div class="flex items-center gap-4 mt-6">
				<CommonButton size="small" class="w-20">
					<span class="text-sm">儲存</span>
				</CommonButton>
				<CommonButton variant="outlined" class="w-20" size="small">
					<span class="text-sm">重置</span>
				</CommonButton>
			</div>
		</div>

		<!-- 數位水表 -->
		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="text-xl text-gray-800 font-bold">數位水表</div>
			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-40 min-w-[120px] py-2 px-3">個案名稱</th>
							<th class="w-40 min-w-[110px] py-2 px-3">設備編號</th>
							<th class="w-24 min-w-[60px] py-2 px-3">大於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">等於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">小於</th>
							<th class="w-44 min-w-[224px] py-2 px-3">通知 Email</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
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
			<div class="flex items-center gap-4 mt-6">
				<CommonButton size="small" class="w-20">
					<span class="text-sm">儲存</span>
				</CommonButton>
				<CommonButton variant="outlined" class="w-20" size="small">
					<span class="text-sm">重置</span>
				</CommonButton>
			</div>
		</div>

		<!-- 雨水筏基 -->
		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="text-xl text-gray-800 font-bold">雨水筏基</div>
			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-40 min-w-[120px] py-2 px-3">個案名稱</th>
							<th class="w-40 min-w-[110px] py-2 px-3">設備編號</th>
							<th class="w-24 min-w-[60px] py-2 px-3">大於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">等於</th>
							<th class="w-24 min-w-[60px] py-2 px-3">小於</th>
							<th class="w-44 min-w-[224px] py-2 px-3">通知 Email</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
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
			<div class="flex items-center gap-4 mt-6">
				<CommonButton size="small" class="w-20">
					<span class="text-sm">儲存</span>
				</CommonButton>
				<CommonButton variant="outlined" class="w-20" size="small">
					<span class="text-sm">重置</span>
				</CommonButton>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
		};
	},
};
</script>
