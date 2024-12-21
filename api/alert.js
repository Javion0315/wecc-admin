import { weccApi } from '~/service';

export function getAdminAlterSetting() {
  return weccApi.get(`AdminAlterSetting`);
}

export function postAdminAlterSetting(data) {
  return weccApi.post(`AdminAlterSetting`, data);
}

