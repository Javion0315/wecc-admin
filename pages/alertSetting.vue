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
			<div class="flex justify-between items-center">
				<div class="text-xl text-gray-800 font-bold">數位電表</div>
				<div class="text-red-500 text-sm font-bold">
					email 如為多筆請用分號區隔
					<font-awesome-icon :icon="['fas', 'arrow-right']" class="mr-1" /> ;
				</div>
			</div>

			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-36 min-w-[120px] py-2 px-3">個案名稱</th>
							<th class="w-24 min-w-[90px] py-2 px-3">設備編號</th>
							<th class="w-28 min-w-[80px] py-2 px-3">大於</th>
							<th class="w-28 min-w-[80px] py-2 px-3">等於</th>
							<th class="w-28 min-w-[80px] py-2 px-3">小於</th>
							<th class="w-44 min-w-[224px] py-2 px-3">通知 Email</th>
						</tr>
					</thead>
					<!-- Table Body -->

					<tbody>
						<tr
							v-for="(item, idx) in powerSetting"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap"
						>
							<td class="w-36 min-w-[120px] py-4 px-3">{{ item.name }}</td>
							<td class="w-24 min-w-[90px] py-4 px-3">{{ item.deviceSeq }}</td>
							<td class="w-28 min-w-[80px] py-4 px-3">
								<font-awesome-icon :icon="['fas', 'chevron-right']" />
								<input
									type="number"
									v-model="item.isBig"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<th class="w-28 min-w-[80px] py-2 px-3">
								<font-awesome-icon :icon="['fas', 'equals']" />
								<input
									type="number"
									v-model="item.isEqual"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</th>
							<th class="w-28 min-w-[80px] py-2 px-3">
								<font-awesome-icon :icon="['fas', 'chevron-left']" />
								<input
									type="number"
									v-model="item.isSmall"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</th>
							<th class="w-44 min-w-[224px] py-2 px-3">
								<input
									type="text"
									v-model="item.isEmail"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
									@blur="validateEmails(item.isEmail, idx)"
								/>
							</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="flex items-center gap-4 mt-6">
				<CommonButton size="small" class="w-20" @click.native="save('POWER')">
					<span class="text-sm">儲存</span>
				</CommonButton>
				<CommonButton
					variant="outlined"
					class="w-20"
					size="small"
					@click.native="getData"
				>
					<span class="text-sm">重置</span>
				</CommonButton>
			</div>
		</div>

		<!-- 淹水偵測 -->
		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="flex justify-between items-center">
				<div class="text-xl text-gray-800 font-bold">淹水偵測</div>
				<div class="text-red-500 text-sm font-bold">
					email 如為多筆請用分號區隔
					<font-awesome-icon :icon="['fas', 'arrow-right']" class="mr-1" /> ;
				</div>
			</div>

			<div class="mt-4 text-gray-800 overflow-x-auto text-sm">
				<table class="min-w-full table-auto border-collapse">
					<!-- Table Header -->
					<thead>
						<tr class="bg-gray-400 text-white text-left">
							<th class="w-36 min-w-[120px] py-2 px-3">個案名稱</th>
							<th class="w-24 min-w-[90px] py-2 px-3">設備編號</th>
							<th class="w-28 min-w-[80px] py-2 px-3">大於</th>
							<th class="w-28 min-w-[80px] py-2 px-3">等於</th>
							<th class="w-28 min-w-[80px] py-2 px-3">小於</th>
							<th class="w-44 min-w-[224px] py-2 px-3">通知 Email</th>
						</tr>
					</thead>
					<!-- Table Body -->
					<tbody>
						<tr
							v-for="(item, idx) in floodSetting"
							:key="item + idx"
							class="border-b border-gray-300 whitespace-nowrap"
						>
							<td class="w-36 min-w-[120px] py-4 px-3">{{ item.name }}</td>
							<td class="w-24 min-w-[90px] py-4 px-3">{{ item.deviceSeq }}</td>
							<td class="w-28 min-w-[80px] py-4 px-3">
								<font-awesome-icon :icon="['fas', 'chevron-right']" />
								<input
									type="number"
									v-model="item.isBig"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<th class="w-28 min-w-[80px] py-2 px-3">
								<font-awesome-icon :icon="['fas', 'equals']" />
								<input
									type="number"
									v-model="item.isEqual"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</th>
							<th class="w-28 min-w-[80px] py-2 px-3">
								<font-awesome-icon :icon="['fas', 'chevron-left']" />
								<input
									type="number"
									v-model="item.isSmall"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</th>
							<th class="w-44 min-w-[224px] py-2 px-3">
								<input
									type="text"
									v-model="item.isEmail"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
									@blur="validateEmails(item.isEmail, idx)"
								/>
							</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="flex items-center gap-4 mt-6">
				<CommonButton size="small" class="w-20" @click.native="save('FLOOD')">
					<span class="text-sm">儲存</span>
				</CommonButton>
				<CommonButton
					variant="outlined"
					class="w-20"
					size="small"
					@click.native="getData"
				>
					<span class="text-sm">重置</span>
				</CommonButton>
			</div>
		</div>
	</div>
</template>

<script>
import { getAdminAlterSetting, postAdminAlterSetting } from "@/api/alert";

export default {
	data() {
		return {
			isLoading: false,
			powerSetting: [],
			floodSetting: [],
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.isLoading = true;
			getAdminAlterSetting()
				.then((res) => {
					this.powerSetting = res.data.filter(
						(item) => item.deviceCode === "POWER"
					)[0].settingValues;
					this.floodSetting = res.data.filter(
						(item) => item.deviceCode === "FLOOD"
					)[0].settingValues;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		save(type) {
			this.isLoading = true;
			let payload = {
				deviceCode: type,
				settingValues: type === "POWER" ? this.powerSetting : this.floodSetting,
			};

			postAdminAlterSetting(payload)
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
		validateEmails(emails) {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const emailArray = emails.split(";").map((email) => email.trim());
			for (let email of emailArray) {
				if (!emailPattern.test(email)) {
					this.$swal.fire({
						title: "email 格式錯誤",
						type: "error",
					});
				}
			}
			return true;
		},
	},
};
</script>
