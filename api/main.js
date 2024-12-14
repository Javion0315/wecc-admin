import { weccApi } from '~/service';

// login
export function postAdminLogin(data) {
  return weccApi.post('AdminLogin', data);
}

// login
export function getAdminC() {
  return weccApi.get('AdminC', { withCredentials: true });
}

