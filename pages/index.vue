<template>
	<div>
		<CommonLoading v-if="isLoading" />
		<div
			class="w-[350px] bg-white mx-auto rounded p-6 shadow-md flex flex-col justify-center items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
		>
			<div class="mt-4 text-xl font-bold text-gray-800">系統登入</div>
			<input
				v-model="account"
				type="text"
				class="w-full border-b text-gray-800 border-gray-600 p-2 mt-4 focus-visible:outline-none font-bold"
				placeholder="帳號"
			/>
			<input
				v-model="password"
				type="password"
				class="w-full border-b text-gray-800 border-gray-600 p-2 mt-4 focus-visible:outline-none font-bold"
				placeholder="密碼"
			/>
			<CommonButton class="mt-20 w-full" @click.native="login()">
				<span class="text-sm">登入</span>
			</CommonButton>
			<CommonButton
				variant="outlined"
				class="mt-4 w-full"
				@click.native="$router.go(-1)"
			>
				<span class="text-sm">取消</span>
			</CommonButton>
		</div>
	</div>
</template>

<script>
import { postAdminLogin, getAdminC } from "~/api/main";
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
					if (res.status === 200) {
						// 測試 session
						getAdminC().then((res) => {
							console.log(res, 999);
						});
					}
				})
				.catch(() => {
					this.$swal.fire({
						title: "帳號或密碼錯誤",
						type: "error",
						confirmButtonText: "確認",
					});
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

