<template>
	<div class="text-gray-800 px-4 mt-4">
		<CommonLoading v-if="isLoading" />
		<div class="text-base text-gray-600">名稱</div>
		<input
			v-model="info.name"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="名稱"
		/>
		<div class="text-base text-gray-600 mt-6">計畫代碼</div>
		<select
			v-model="info.planCode"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
		>
			<option value="P1">P1 點亮計畫</option>
			<option value="P2">P2 補助計畫</option>
		</select>
		<div class="text-base text-gray-600 mt-6">建築代碼</div>
		<input
			v-model="info.buildingCode"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="建築代碼"
		/>
		<div class="text-base text-gray-600 mt-6">建築類型</div>
		<input
			v-model="info.buildingType"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="建築類型"
		/>
		<div class="text-base text-gray-600 mt-6">電子信箱</div>
		<input
			v-model="info.email"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="電子信箱"
		/>
		<div class="text-base text-gray-600 mt-6">address</div>
		<input
			v-model="info.address"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="address"
		/>
		<div class="text-base text-gray-600 mt-6">floorSpace</div>
		<input
			v-model="info.floorSpace"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="floorSpace"
		/>
		<div class="flex items-center gap-4 mt-6">
			<CommonButton size="large" class="w-24" @click.native="save()">
				<span class="text-sm">儲存</span>
			</CommonButton>
			<CommonButton
				variant="outlined"
				class="w-24"
				size="large"
				@click.native="reset()"
			>
				<span class="text-sm">重置</span>
			</CommonButton>
			<CommonButton
				color="red"
				class="w-24"
				size="large"
				@click.native="$router.go(-1)"
			>
				<span class="text-sm">離開</span>
			</CommonButton>
		</div>
	</div>
</template>

<script>
import { getCaseSequenceNo, postCase, putCase } from "~/api/case";

export default {
	data() {
		return {
			isLoading: false,
			info: {
				sequenceNo: 0,
				name: "",
				email: "",
				planCode: "",
				buildingType: "",
				buildingCode: "",
				createTime: "",
				updateTime: "",
				address: "",
				floorSpace: 0,
			},
		};
	},
	mounted() {
		let routeId = this.$route.params.id;
		if (routeId) {
			this.getInfo(routeId);
		}
	},
	methods: {
		save() {
			this.isLoading = true;
			if (this.$route.params.id) {
				this.edit();
			} else {
				this.add();
			}
		},
		edit() {
			putCase({
				sequenceNo: this.info.sequenceNo,
				name: this.info.name,
				email: this.info.email,
				planCode: this.info.planCode,
				buildingType: this.info.buildingType,
				buildingCode: this.info.buildingCode,
				createTime: this.info.createTime,
				updateTime: this.info.updateTime,
				address: this.info.address,
				floorSpace: this.info.floorSpace,
			})
				.then((res) => {
					if (res.status === 200) {
						this.$swal.fire({
							title: "更新成功",
							type: "success",
						});
						this.$router.go(-1);
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		add() {
			postCase({
				sequenceNo: this.info.sequenceNo,
				name: this.info.name,
				email: this.info.email,
				planCode: this.info.planCode,
				buildingType: this.info.buildingType,
				buildingCode: this.info.buildingCode,
				createTime: this.info.createTime,
				updateTime: this.info.updateTime,
				address: this.info.address,
				floorSpace: this.info.floorSpace,
			})
				.then((res) => {
					if (res.status === 200) {
						this.$swal.fire({
							title: "新增成功",
							type: "success",
						});
						this.$router.go(-1);
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		reset() {
			this.info = {
				sequenceNo: 0,
				name: "",
				email: "",
				planCode: "",
				buildingType: "",
				buildingCode: "",
				createTime: "",
				updateTime: "",
				address: "",
				floorSpace: 0,
			};
		},
		getInfo(id) {
			this.isLoading = true;
			getCaseSequenceNo(id)
				.then((res) => {
					let data = res.data[0];
					if (res.status === 200) {
						this.info = data;
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
