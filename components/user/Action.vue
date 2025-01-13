<template>
	<div class="text-gray-800 px-4 mt-4">
		<CommonLoading v-if="isLoading" />
		<div class="text-base text-gray-600">姓名</div>
		<input
			v-model="name"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="姓名"
		/>
		<div class="text-base text-gray-600 mt-6">帳號</div>
		<input
			v-model="account"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="帳號"
		/>
		<div class="text-base text-gray-600 mt-6">電子信箱</div>
		<input
			v-model="email"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="電子信箱"
		/>
		<div class="text-base text-gray-600 mt-6">電話號碼</div>
		<input
			v-model="contactTel"
			type="text"
			class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
			placeholder="電話號碼"
		/>
		<template v-if="!$route.params.id">
			<div class="text-base text-gray-600 mt-3">密碼</div>
			<input
				v-model="password"
				type="password"
				class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
				placeholder="密碼"
			/>
			<div class="text-xs text-gray-600 mt-2">
				暫時性密碼，首次登入請重新設定新密碼
			</div>
			<div class="text-base text-gray-600 mt-6">確認密碼</div>
			<input
				v-model="confirmPassword"
				type="password"
				class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
				placeholder="確認密碼"
			/>
		</template>

		<!-- <div class="text-base text-gray-600 mt-6">是否啟用</div>
		<div class="flex items-center mt-1">
			<label class="mr-4">
				<input type="radio" v-model="isEnable" value="是" class="mr-1" />
				是
			</label>
			<label>
				<input type="radio" v-model="isEnable" value="否" class="mr-1" />
				否
			</label>
		</div> -->
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

		<div class="mt-8 border-t border-gray-200 pt-4" v-if="$route.params.id">
			<div class="text-gray-800 text-xl font-bold">修改密碼</div>
			<div class="text-base text-gray-600 mt-3">密碼</div>
			<input
				v-model="password"
				type="password"
				class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
				placeholder="密碼"
			/>
			<div class="text-xs text-gray-600 mt-2">
				密碼需符合以下要求：<br />
				1. 密碼至少包含12個字元<br />
				2. 密碼需包含大小寫字母、數字、特殊符號<br />
				3. 密碼不可與前三次密碼相同<br />
				4. 單一字元不得連續重複三次
			</div>
			<div class="text-base text-gray-600 mt-6">確認密碼</div>
			<input
				v-model="confirmPassword"
				type="password"
				class="w-full border border-gray-200 rounded-lg text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
				placeholder="確認密碼"
			/>

			<CommonButton
				size="large"
				class="w-24 mt-4"
				@click.native="putChangePwd()"
			>
				<span class="text-sm">密碼修改</span>
			</CommonButton>

			<div class="mt-8 border-t border-gray-200 pt-4">
				<div class="text-gray-800 text-xl font-bold">權限設定</div>
				<div class="grid grid-cols-4 gap-4 mt-3">
					<div
						v-for="role in roleSet.data"
						:key="role.pageCName"
						class="border border-gray-200 rounded-lg p-2"
					>
						<div class="text-base font-bold">
							{{ role.pageCName }}
						</div>
						<div>
							<div class="flex justify-start items-center mt-1">
								讀取：
								<div class="flex items-center mt-1 ml-3">
									<label class="mr-4">
										<input
											type="radio"
											v-model="role.readPage"
											value="Y"
											class="mr-1"
										/>
										是
									</label>
									<label>
										<input
											type="radio"
											v-model="role.readPage"
											value="N"
											class="mr-1"
										/>
										否
									</label>
								</div>
							</div>
							<div class="flex justify-start items-center mt-1">
								寫入：
								<div class="flex items-center mt-1 ml-3">
									<label class="mr-4">
										<input
											type="radio"
											v-model="role.writePage"
											value="Y"
											class="mr-1"
										/>
										是
									</label>
									<label>
										<input
											type="radio"
											v-model="role.writePage"
											value="N"
											class="mr-1"
										/>
										否
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<CommonButton size="large" class="w-24 mt-4" @click.native="putRole()">
				<span class="text-sm">權限修改</span>
			</CommonButton>
		</div>
	</div>
</template>

<script>
import {
	getAdminUserSequenceNo,
	postAdminUser,
	putAdminUser,
	putChangePassword,
	getRoleSet,
	putRoleSet,
} from "~/api/main";
import CryptoJS from "crypto-js";

export default {
	data() {
		return {
			isLoading: false,
			name: "",
			account: "",
			password: "",
			confirmPassword: "",
			email: "",
			contactTel: "",
			sequenceNo: "",
			// isEnable: "是",
			roleSet: {},
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
			if (this.$route.params.id) {
				this.edit();
			} else {
				this.add();
			}
		},
		edit() {
			this.isLoading = true;
			putAdminUser({
				sequenceNo: this.sequenceNo,
				name: this.name,
				account: this.account,
				// password: this.encrypt(this.password.trim()),
				email: this.email,
				contactTel: this.contactTel,
				isEnable: this.isEnable,
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
			// 先檢查密碼是否符合規則且與確認密碼相同
			// if (this.password.trim().length < 12) {
			// 	this.$swal.fire({
			// 		title: "密碼長度不足",
			// 		text: "密碼至少包含12個字元",
			// 		type: "warning",
			// 	});
			// 	return;
			// }
			// const passwordRules = [
			// 	{ regex: /^(?!.*(.)\1{2})/, message: "單一字元不得連續重複三次" },
			// 	{ regex: /[A-Z]/, message: "密碼需包含大寫字母" },
			// 	{ regex: /[a-z]/, message: "密碼需包含小寫字母" },
			// 	{ regex: /[0-9]/, message: "密碼需包含數字" },
			// 	{ regex: /[^A-Za-z0-9]/, message: "密碼需包含特殊符號" },
			// ];

			// for (let rule of passwordRules) {
			// 	if (!rule.regex.test(this.password)) {
			// 		this.$swal.fire({
			// 			title: "密碼不符合規則",
			// 			text: rule.message,
			// 			type: "warning",
			// 		});
			// 		return;
			// 	}
			// }
			// if (this.password !== this.confirmPassword) {
			// 	this.$swal.fire({
			// 		title: "密碼不符合規則",
			// 		text: "確認密碼與密碼不相同",
			// 		type: "warning",
			// 	});
			// 	return;
			// }
			// 檢查 email 格式
			if (!this.email.includes("@")) {
				this.$swal.fire({
					title: "Email 格式錯誤",
					text: "請輸入正確的 Email 格式",
					type: "warning",
				});
				return;
			}
			this.isLoading = true;
			postAdminUser({
				name: this.name,
				account: this.account,
				password: this.encrypt(this.password.trim()),
				email: this.email,
				contactTel: this.contactTel,
				isEnable: this.isEnable,
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
			this.name = "";
			this.account = "";
			this.password = "";
			this.confirmPassword = "";
			this.email = "";
			this.contactTel = "";
		},
		getInfo(id) {
			this.isLoading = true;
			getAdminUserSequenceNo(id)
				.then((res) => {
					let data = res.data[0];
					if (res.status === 200) {
						this.name = data.name;
						this.account = data.account;
						this.email = data.email;
						this.contactTel = data.contactTel;
						this.sequenceNo = data.sequenceNo;

						this.getRole();
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		encrypt(data) {
			const key = CryptoJS.enc.Utf8.parse("weccweccweccwecc");
			const iv = CryptoJS.enc.Utf8.parse("1234567812345678");
			const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
			return encrypted.toString();
		},
		putChangePwd() {
			// 先檢查密碼是否符合規則且與確認密碼相同
			if (this.password.trim().length < 12) {
				this.$swal.fire({
					title: "密碼長度不足",
					text: "密碼至少包含12個字元",
					type: "warning",
				});
				return;
			}
			const passwordRules = [
				{ regex: /^(?!.*(.)\1{2})/, message: "單一字元不得連續重複三次" },
				{ regex: /[A-Z]/, message: "密碼需包含大寫字母" },
				{ regex: /[a-z]/, message: "密碼需包含小寫字母" },
				{ regex: /[0-9]/, message: "密碼需包含數字" },
				{ regex: /[^A-Za-z0-9]/, message: "密碼需包含特殊符號" },
			];

			for (let rule of passwordRules) {
				if (!rule.regex.test(this.password)) {
					this.$swal.fire({
						title: "密碼不符合規則",
						text: rule.message,
						type: "warning",
					});
					return;
				}
			}
			if (this.password !== this.confirmPassword) {
				this.$swal.fire({
					title: "密碼不符合規則",
					text: "確認密碼與密碼不相同",
					type: "warning",
				});
				return;
			}
			let data = {
				userID: this.account,
				userPW: this.encrypt(this.password.trim()),
			};
			putChangePassword(data).then((res) => {
				if (res.status === 200) {
					if (res.data.isChangeFinish && !res.data.isPassSame) {
						this.$swal
							.fire({
								title: "修改成功",
								type: "success",
							})
							.then(() => {
								this.$router.go(-1);
							});
					} else if (res.data.isPassSame) {
						this.$swal.fire({
							title: "密碼相同",
							type: "info",
						});
					}
				}
			});
		},
		getRole() {
			this.isLoading = true;
			getRoleSet(this.account)
				.then((res) => {
					if (res.status === 200) {
						this.roleSet = res.data;
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		putRole() {
			this.isLoading = true;
			putRoleSet(this.roleSet)
				.then((res) => {
					if (res.status === 200) {
						this.$swal
							.fire({
								title: "修改成功",
								type: "success",
							})
							.then(() => {
								this.$router.go(-1);
							});
					}
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
