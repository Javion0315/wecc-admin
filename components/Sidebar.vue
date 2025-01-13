<template>
	<div class="absolute inset-0 top-16 z-50">
		<div
			class="bg-primary-blue w-64 h-full fixed top-0 left-0 inset-0 overflow-y-auto p-4"
		>
			<div
				class="flex justify-start items-center text-lg font-bold border-b pb-3 mb-6 border-white/25"
				@click="goPath('index')"
			>
				<img class="w-8 mr-2" src="@/assets/images/favicon.png" alt="favicon" />
				高雄厝管理系統
			</div>
			<div v-for="menu in menuList" :key="menu.label">
				<div
					class="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-[#2E394E] hover:border-l-2 hover:border-white cursor-pointer text-base whitespace-nowrap"
					@click="toggleMenu(menu)"
					:class="{
						'border-l-2 border-white bg-[#2E394E] rounded':
							menuActived === menu.label,
						'text-white': menuActived !== menu.label,
						'mb-4': !menu.expanded,
					}"
					v-if="menu.isShow"
				>
					<div>{{ menu.label }}</div>
					<font-awesome-icon
						:icon="
							menu.expanded ? ['fas', 'chevron-down'] : ['fas', 'chevron-right']
						"
					/>
				</div>
				<!-- 展開和收起子菜單 -->
				<div
					v-show="menu.expanded"
					class="transition-all duration-300 ease-in-out mb-4"
				>
					<div
						class="flex justify-start items-center py-2 pl-6 pr-12 rounded-lg hover:bg-[#2E394E] hover:border-l-2 hover:border-white cursor-pointer text-base whitespace-nowrap"
						v-for="item in menu.children"
						:key="item.value"
						@click="goPath(item)"
						:class="{
							'border-l-2 border-white bg-[#2E394E] rounded':
								menuActived === item.value,
							'text-white': menuActived !== item.value,
						}"
					>
						<div class="ml-4">{{ item.label }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAdminC } from "@/api/main";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			menuActived: this.$route.name || "index",
			menuList: [
				{
					label: "系統管理",
					children: [
						{ label: "項目簡介", value: "siteInformation" },
						{ label: "地圖簡介", value: "mapInformation" },
						{ label: "亮點計畫簡介", value: "lightInformation" },
						{ label: "輔助計畫簡介", value: "supplyInformation" },
						{ label: "電價設定", value: "electricityPrice" },
					],
					expanded: false, // 控制展開與收起
					isShow: false,
				},
				{
					label: "權限管理",
					children: [{ label: "帳戶管理", value: "user" }],
					expanded: false, // 控制展開與收起
					isShow: false,
				},
				{
					label: "個案管理",
					children: [{ label: "個案名單", value: "case" }],
					expanded: false, // 控制展開與收起
					isShow: false,
				},
				{
					label: "告警管理",
					children: [
						{ label: "告警通知設定", value: "alertSetting" },
						{ label: "異常事件管理", value: "alertHistory" },
					],
					expanded: false, // 控制展開與收起
					isShow: false,
				},
				{
					label: "原始資料",
					children: [
						{ label: "雨水資料管理", value: "rawDataRain" },
						{ label: "電表資料管理", value: "rawDataElectric" },
						{ label: "水表資料管理", value: "rawDataWater" },
						{ label: "空氣資料管理", value: "rawDataAir" },
					],
					expanded: false, // 控制展開與收起
					isShow: false,
				},
			],
		};
	},
	computed: {
		...mapGetters(["getToggleState"]),
	},
	mounted() {
		this.getRole();
	},
	methods: {
		toggleMenu(menu) {
			// 只展開當前選擇的菜單，並將其他的收起
			menu.expanded = !menu.expanded;
			this.menuList.forEach((m) => {
				if (m !== menu) {
					m.expanded = false;
				}
			});
		},
		goPath(item) {
			this.menuActived = item.value;
			this.$router.push({ name: item.value });
		},
		getRole() {
			getAdminC().then((res) => {
				let data = res.data;
				data.forEach((page) => {
					this.menuList.forEach((menu) => {
						if (
							menu.label === "系統管理" &&
							page.pageCName === "項目簡介" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
						if (
							menu.label === "權限管理" &&
							page.pageCName === "帳戶管理" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
						if (
							menu.label === "個案管理" &&
							page.pageCName === "個案管理" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
						if (
							menu.children[0].label === "告警通知設定" &&
							page.pageCName === "告警通知設定" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
						if (
							menu.children[0].label === "異常事件管理" &&
							page.pageCName === "異常事件管理" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
						if (
							menu.label === "原始資料" &&
							page.pageCName === "原始資料" &&
							page.readPage === "Y"
						) {
							menu.isShow = true;
						}
					});
				});
			});
		},
	},
};
</script>

<style scoped>
/* 為了增加過渡效果，這裡使用了 `transition-all` */
.transition-all {
	transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
}
</style>
