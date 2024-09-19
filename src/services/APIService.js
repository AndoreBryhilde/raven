import axios from 'axios';
import NProgress from 'nprogress';

const APIService = axios.create();

APIService.ISAuthenticated = false; // 未授權
APIService.defaults.headers.common.Authorization = localStorage.token; // 權杖

// 移除權杖
APIService.RemoveToken = () => {
  if (localStorage.token) localStorage.removeItem('token');
  APIService.defaults.headers.common.Authorization = '';
  APIService.ISAuthenticated = false;
  document.cookie = 'RavenToken=; Max-Age=0';
};

// 異常處理
APIService.interceptors.response.use(
  (response) => response,
  (error) => {
    // 若 未授權 則 導到登入頁
    if (error && error.response && error.response.status === 401) {
      APIService.RemoveToken();
      window.router.replace('/login');
    } else if (error && error.response && error.response.status === 403) {
      window.Swal.fire({ icon: 'error', title: '沒有權限!', timer: 1000 });
    }
    return Promise.reject(error);
  },
);

APIService.defaults.baseURL = '/api';

const progressStart = (o) => {
  NProgress.start();
  return o;
};

const progressDone = (o) => {
  NProgress.done();
  return o;
};

const progressError = (o) => {
  NProgress.done();
  return Promise.reject(o);
};

APIService.interceptors.request.use(progressStart, progressError);
APIService.interceptors.response.use(progressDone, progressError);

export default APIService;
