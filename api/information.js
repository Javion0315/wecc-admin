import { weccApi } from '~/service';

// 1 項目 建築智慧雲平台
// 2 地圖 建築智慧雲地圖
// 3 亮點 亮點計畫
// 4 補助 補助計畫

// 項目介紹
export function getArticles(serialNumber) {
  return weccApi.get(`Articles?serialNumber=${serialNumber}`);
}

// 項目更新
export function putArticles(data) {
  return weccApi.put('Articles', data);
}

// 電價設定
export function getElectricityPrice() {
  return weccApi.get('ElectricityPrice');
}

// 更新電價
export function putElectricityPrice(data) {
  return weccApi.put('ElectricityPrice', data);
}

