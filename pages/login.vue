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
	</div>
</template>

<script>
import { postAdminLogin } from "~/api/main";
import CryptoJS from "crypto-js";

export default {
	data() {
		return {
			account: "",
			password: "",
			isLoading: false,
		};
	},
	mounted() {},
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
						this.$swal.fire({
							title: res.data.loginMsg,
							type: "success",
						});
						this.$router.push({ name: "index" });
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
	},
};
</script>

