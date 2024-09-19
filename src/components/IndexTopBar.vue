/* c8 ignore start */
<template>
  <div class="flex justify-content-between py-2 px-3 topbar align-items-center fixed w-full bg-white">
    <div class="flex align-items-center text-2xl font-font-font-semibold text-blue-400">
      <Button icon="pi pi-bars text-2xl" class="text-gray-800 bg-white mr-2" text @click="ChangeSideBarDisplay" />
      <router-link to="/" class="logo">
        <img alt="Logo" src="/images/Logo.png" class="ml-1 w-6rem" />
      </router-link>
      <div class="hidden lg:inline">Raven</div>
    </div>
    <div class="flex">
      <div class="flex align-items-center">
        <div class="font-semibold hidden lg:inline">登入者:</div>
        <div class="font-semibold hidden lg:inline ml-1">{{ UserName }}</div>
        <Button label="登出" size="small" raised class="ml-2" @click="Logout" />
      </div>
    </div>
  </div>
</template>
/* c8 ignore stop */

<script setup>
import { ref } from 'vue';
import APIService from '../services/APIService';

const { router } = window; // 路由
const UserName = ref(APIService.UserName); // 使用者姓名

// 登出
const Logout = async () => {
  APIService.RemoveToken(); // 移除權杖
  router.replace('/login'); // 跳轉至登入頁
};

// 切換側欄顯示
const ChangeSideBarDisplay = () => {
  window.emitter.emit('ResizeCalendar');
  window.emitter.emit('ChangeSideBarShow');
};
</script>
<style scoped>
@import '../assets/css/components/topbar.css';
</style>
