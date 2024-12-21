import axios from 'axios';
import Swal from 'sweetalert2';

const weccBaseUrl = '/api/'
// const weccBaseUrl = "https://wecc.elfbar.tw:8080/api/"

axios.defaults.withCredentials = true
// axios.defaults.baseURL = null
// axios.defaults.timeout = 60 * 1000 //timeout 60秒


const weccApi = axios.create({
  baseURL: weccBaseUrl,
  withCredentials: true
});

// 設置攔截器來處理 401 錯誤
weccApi.interceptors.response.use(
  response => response, // 請求成功，直接返回 response
  error => {
    // 檢查錯誤回應的狀態碼是否為 401
    if (error.response && error.response.status === 401) {

      // 當遇到 401 錯誤時，重定向到登錄頁面
      Swal.fire({
        title: '請重新登入',
        type: 'warning',
        confirmButtonText: '確認'
      }).then(() => {
        $nuxt.$router.push({ name: 'login' });
      });

    }

    // 返回錯誤，便於進一步處理
    return Promise.reject(error);
  }
);


export { weccApi }
