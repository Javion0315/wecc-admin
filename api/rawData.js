import { weccApi } from '~/service';

// 取得空氣管理原始資料
export function getAdminRawDataAir(data) {
  return weccApi.get(`AdminRawDataAir?page=${data.page}&PageRow=${data.PageRow}&EventDate=${data.EventDate}`);
}

// 取得水表管理原始資料
export function getAdminRawDataWater(data) {
  return weccApi.get(`AdminRawDataWater?page=${data.page}&PageRow=${data.PageRow}&EventDate=${data.EventDate}`);
}

// 取得雨水管理原始資料
export function getAdminRawDataRain(data) {
  return weccApi.get(`AdminRawDataRain?page=${data.page}&PageRow=${data.PageRow}&EventDate=${data.EventDate}`);
}

// 取得電表管理原始資料
export function getAdminRawDataElectric(data) {
  return weccApi.get(`AdminRawDataElectric?page=${data.page}&PageRow=${data.PageRow}&EventDate=${data.EventDate}`);
}
