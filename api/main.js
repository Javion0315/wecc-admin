import { weccApi } from '~/service';

// login
export function postAdminLogin(data) {
  return weccApi.post('AdminLogin', data);
}

// logout
export function getAdminLogout() {
  return weccApi.get('AdminLogout');
}

// login test
export function getAdminC() {
  return weccApi.get('AdminC');
}

// user api start ===============================
// user list
export function getAdminUser() {
  return weccApi.get('AdminUser');
}

// 新增使用者
export function postAdminUser(data) {
  return weccApi.post('AdminUser', data);
}

// 更新使用者
export function putAdminUser(data) {
  return weccApi.put('AdminUser', data);
}

// 刪除使用者
export function deleteAdminUser(sequenceNo) {
  return weccApi.delete(`AdminUser?SequenceNo=${sequenceNo}`);
}

// 個別使用者資訊
export function getAdminUserSequenceNo(sequenceNo) {
  return weccApi.get(`AdminUser/SequenceNo/${sequenceNo}`);
}

// 修改密碼
export function putChangePassword(data) {
  return weccApi.put(`AdminUser/ChangePassword`, data);
}

// 取得使用者權限
export function getRoleSet(userAccout) {
  return weccApi.get(`AdminUser/roleSet/${userAccout}`);
}

// 更新使用者權限
export function putRoleSet(data) {
  return weccApi.put(`AdminUser/roleSet`, data);
}
// user api end ===============================
