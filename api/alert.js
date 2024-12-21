import { weccApi } from '~/service';

// 告警通知設定
export function getAdminAlterSetting() {
  return weccApi.get(`AdminAlterSetting`);
}

// 更新告警通知設定
export function postAdminAlterSetting(data) {
  return weccApi.post(`AdminAlterSetting`, data);
}

// 異常事件管理
export function getAdminAlterHistory(data) {
  return weccApi.get(`AdminAlterHistory?page=${data.page}&PageRow=${data.PageRow}`);
}

