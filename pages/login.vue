<template>
	<div
		class="bg-login bg-fixed min-h-screen bg-no-repeat bg-cover bg-center w-full"
	>
		<CommonLoading v-if="isLoading" />
		<div
			class="w-[350px] bg-white mx-auto rounded-3xl p-6 shadow-md flex flex-col justify-center items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
		>
			<div class="mt-4 text-3xl font-bold text-gray-800">系統登入</div>
			<div class="flex justify-center items-center w-full text-xs mt-8 mb-4">
				<div class="h-[1px] w-full bg-gray-400"></div>
				<div class="text-gray-400 whitespace-nowrap mx-1">
					請輸入登入的帳號密碼
				</div>
				<div class="h-[1px] w-full bg-gray-400"></div>
			</div>
			<div class="text-left w-full">
				<div class="text-sm text-gray-600">帳號：</div>
				<input
					v-model="account"
					type="text"
					class="w-full border border-gray-200 rounded-xl text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
					placeholder="帳號"
				/>
			</div>

			<div class="text-left w-full mt-4">
				<div class="text-sm text-gray-600">密碼：</div>
				<input
					v-model="password"
					type="password"
					class="w-full border border-gray-200 rounded-xl text-gray-800 p-2 mt-1 focus-visible:outline-none font-bold"
					placeholder="密碼"
				/>
			</div>

			<CommonButton class="mt-8 w-full" size="large" @click.native="login()">
				<span class="text-sm">登入</span>
			</CommonButton>
		</div>

		<CommonModal @close="changePwd = false" v-if="changePwd">
			<div class="p-4">
				<div class="text-gray-800 text-xl font-bold text-center">修改密碼</div>
				<div class="text-base text-gray-600 mt-3">密碼</div>
				<input
					v-model="chPassword"
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
			</div>
		</CommonModal>
	</div>
</template>

<script>
import { postAdminLogin, putChangePassword } from "~/api/main";
import CryptoJS from "crypto-js";

export default {
	data() {
		return {
			account: "",
			password: "",
			isLoading: false,
			changePwd: false,
			chPassword: "",
			confirmPassword: "",
		};
	},
	methods: {
		login() {
			let payload = {
				userID: this.account.trim(),
				userPW: this.encrypt(this.password.trim()),
			};
			this.isLoading = true;
			postAdminLogin(payload)
				.then((res) => {
					if (res.data.isSuccess === true) {
						if (res.data.isFirstTimeLogin || res.data.isFirstTimeLogin) {
							this.changePwd = true;
						} else {
							this.$swal.fire({
								title: res.data.loginMsg,
								type: "success",
							});
							this.$router.push({ name: "index" });
						}
					} else {
						this.$swal.fire({
							title: res.data.loginMsg,
							type: "error",
							confirmButtonText: "確認",
						});
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
			if (this.chPassword.trim().length < 12) {
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
				if (!rule.regex.test(this.chPassword)) {
					this.$swal.fire({
						title: "密碼不符合規則",
						text: rule.message,
						type: "warning",
					});
					return;
				}
			}
			if (this.chPassword !== this.confirmPassword) {
				this.$swal.fire({
					title: "密碼不符合規則",
					text: "確認密碼與密碼不相同",
					type: "warning",
				});
				return;
			}
			let data = {
				userID: this.account,
				userPW: this.encrypt(this.chPassword.trim()),
			};
			this.isLoading = true;
			putChangePassword(data)
				.then((res) => {
					if (res.data.isChangeFinish && !res.data.isPassSame) {
						this.$swal
							.fire({
								title: "修改成功",
								type: "success",
							})
							.then(() => {
								this.changePwd = false;
								this.$router.push({ name: "index" });
							});
					} else if (res.data.isPassSame) {
						this.$swal.fire({
							title: "密碼相同",
							type: "info",
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

