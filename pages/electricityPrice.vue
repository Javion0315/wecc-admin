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
			<div class="text-gray-600 text-base">電價設定</div>
		</div>

		<div class="mt-4 rounded-lg bg-white p-4">
			<div class="mt-4 text-gray-800 overflow-x-auto">
				<table
					class="min-w-full text-center table-fixed border-separate border border-slate-400 whitespace-nowrap"
				>
					<thead>
						<tr class="bg-[#409CFF] text-white text-center">
							<th colspan="6" class="py-4">分類</th>
							<th class="py-4">
								夏月<br />
								(6/1~9/30)
							</th>
							<th class="py-4">
								非夏月<br />
								(夏月以外的時間)
							</th>
						</tr>
					</thead>

					<tbody class="bg-[#EBF5FF]">
						<tr>
							<td rowspan="9">流動電費</td>
							<td rowspan="4">週一~週五</td>
							<td rowspan="2">尖峰時間</td>
							<td>夏月</td>
							<td>09:00~24:00</td>
							<td rowspan="9">每度</td>
							<td>
								<input
									v-model="dayPeakSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>非夏月</td>
							<td>
								06:00~11:00<br />
								14:00~24:00
							</td>
							<td></td>
							<td>
								<input
									v-model="dayPeakNoSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
						</tr>
						<tr>
							<td rowspan="2">離峰時間</td>
							<td>夏月</td>
							<td>00:00~09:00</td>
							<td>
								<input
									v-model="dayOffPeakSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>非夏月</td>
							<td>00:00~06:00<br />11:00~14:00</td>
							<td></td>
							<td>
								<input
									v-model="dayOffPeakNoSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
						</tr>
						<tr>
							<td rowspan="4">週六</td>
							<td rowspan="2">半尖峰時間</td>
							<td>夏月</td>
							<td>09:00~24:00</td>
							<td>
								<input
									v-model="satMidPeakSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>非夏月</td>
							<td>06:00~11:00<br />14:00~24:00</td>
							<td></td>
							<td>
								<input
									v-model="satMidPeakNoSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
						</tr>
						<tr>
							<td rowspan="2">離峰時間</td>
							<td>夏月</td>
							<td>00:00~09:00</td>
							<td>
								<input
									v-model="satOffPeakSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>非夏月</td>
							<td>00:00~06:00<br />11:00~14:00</td>
							<td></td>
							<td>
								<input
									v-model="satOffPeakNoSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
						</tr>
						<tr>
							<td>週日及離峰日</td>
							<td>離峰時間</td>
							<td colspan="2">全日</td>
							<td>
								<input
									v-model="sunOffPeakSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
							<td>
								<input
									v-model="sunOffPeakNoSummer"
									type="text"
									class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<CommonButton size="large" class="w-24 mt-6" @click.native="save()">
					<span class="text-sm">儲存</span>
				</CommonButton>
			</div>
		</div>
	</div>
</template>
<script>
import { getElectricityPrice, putElectricityPrice } from "~/api/information";

export default {
	data() {
		return {
			isLoading: false,
			dayPeakSummer: "",
			dayPeakNoSummer: "",
			dayOffPeakSummer: "",
			dayOffPeakNoSummer: "",
			satMidPeakSummer: "",
			satMidPeakNoSummer: "",
			satOffPeakSummer: "",
			satOffPeakNoSummer: "",
			sunOffPeakSummer: "",
			sunOffPeakNoSummer: "",
			originalValues: {
				dayPeakSummer: "",
				dayPeakNoSummer: "",
				dayOffPeakSummer: "",
				dayOffPeakNoSummer: "",
				satMidPeakSummer: "",
				satMidPeakNoSummer: "",
				satOffPeakSummer: "",
				satOffPeakNoSummer: "",
				sunOffPeakSummer: "",
				sunOffPeakNoSummer: "",
			},
			totalUpdates: 0,
			successfulUpdates: 0,
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.isLoading = true;
			getElectricityPrice()
				.then((res) => {
					if (res.status === 200) {
						res.data.forEach((item) => {
							this[item.priceTitle] = item.price;
							this.originalValues[item.priceTitle] = item.price;
						});
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		save() {
			const fields = [
				{ title: "dayPeakSummer", value: this.dayPeakSummer, serialNumber: 1 },
				{
					title: "dayPeakNoSummer",
					value: this.dayPeakNoSummer,
					serialNumber: 2,
				},
				{
					title: "dayOffPeakSummer",
					value: this.dayOffPeakSummer,
					serialNumber: 3,
				},
				{
					title: "dayOffPeakNoSummer",
					value: this.dayOffPeakNoSummer,
					serialNumber: 4,
				},
				{
					title: "satMidPeakSummer",
					value: this.satMidPeakSummer,
					serialNumber: 5,
				},
				{
					title: "satMidPeakNoSummer",
					value: this.satMidPeakNoSummer,
					serialNumber: 6,
				},
				{
					title: "satOffPeakSummer",
					value: this.satOffPeakSummer,
					serialNumber: 7,
				},
				{
					title: "satOffPeakNoSummer",
					value: this.satOffPeakNoSummer,
					serialNumber: 8,
				},
				{
					title: "sunOffPeakSummer",
					value: this.sunOffPeakSummer,
					serialNumber: 9,
				},
				{
					title: "sunOffPeakNoSummer",
					value: this.sunOffPeakNoSummer,
					serialNumber: 10,
				},
			];
			// 計算有幾個欄位有變動
			this.successfulUpdates = 0;
			this.totalUpdates = fields.filter(
				(field) => field.value !== this.originalValues[field.title]
			).length;

			fields.forEach((field) => {
				// 只更新有變動的欄位
				if (field.value !== this.originalValues[field.title]) {
					const payload = {
						serialNumber: field.serialNumber,
						price: field.value,
					};
					this.putData(payload);
					// 更新 originalValues 中的值
					this.originalValues[field.title] = field.value;
				}
			});
		},
		putData(payload) {
			this.isLoading = true;
			putElectricityPrice(payload).then((res) => {
				if (res.status === 200) {
					this.successfulUpdates++;
					if (this.successfulUpdates === this.totalUpdates) {
						this.$swal.fire({
							title: res.data,
							type: "success",
						});
						this.isLoading = false;
						this.getData();
					}
				}
			});
		},
	},
};
</script>
