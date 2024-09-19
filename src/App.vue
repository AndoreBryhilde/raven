<template><router-view /></template>

<script setup>
import APIService from './services/APIService';
import UserService from './services/UserService';

// 改變路徑前
window.router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 若 未授權
    if (!APIService.ISAuthenticated) {
      // 若 有Cookie有權杖 則 取得 當前使用者資訊 後導到首頁
      if (document.cookie.indexOf('RavenToken=') > -1) {
        APIService.defaults.headers.common.Authorization = JSON.parse(document.cookie.split('RavenToken=')[1].split(';')[0]);
        APIService.ISAuthenticated = true; // 已授權
        UserService.GetCurrentUser() // 取得 當前使用者資訊
          .then(() => next())
          .catch(() => next({ path: '/login', replace: true }));
        return;
      }
      // 若 有儲存權杖 則 取得 當前使用者資訊 後導到首頁
      if (localStorage.token) {
        APIService.defaults.headers.common.Authorization = localStorage.token;
        APIService.ISAuthenticated = true; // 已授權
        UserService.GetCurrentUser() // 取得 當前使用者資訊
          .then(() => next())
          .catch(() => next({ path: '/login', replace: true }));
        return;
      }
      // 否則 導到登入頁
      next({ path: '/login', replace: true });
      return;
    }
  }

  // 若 無適配路徑 則 導到首頁
  if (!to.matched.length) {
    next({ path: '/', replace: true });
    return;
  }

  next();
});
</script>
