/* c8 ignore start */
<template>
  <IndexTopBar />
  <div class="grid container m-0 pt-8">
    <template v-if="IsMobile">
      <Sidebar v-model:visible="IsSideBarShow" :pt="{ content: { class: 'p-1' } }" @hide="ResizeCalendar">
        <template #header>
          <div class="flex">
            <div class="font-semibold">User:</div>
            <div class="font-semibold ml-1">{{ UserName }}</div>
          </div>
        </template>
        <SideBar v-if="IsSideBarShow" />
      </Sidebar>
    </template>
    <template v-else>
      <transition name="slide">
        <SideBar class="fixed mt-2 ml-1 p-1" v-if="IsSideBarShow" />
      </transition>
    </template>
    <div class="px-3 pt-2 scaling col" :class="{ 'scaling-margin-left': IsSideBarShow }">
      <router-view />
    </div>
  </div>
  <div v-tooltip="'回到頂端'" @click="ScrollToTop" @KeyDown="() => {}" :class="{ active: IsScrolled }" class="back-button back-to-top flex align-items-center justify-content-center">
    <i class="pi pi-arrow-up text-sm" />
  </div>
</template>
/* c8 ignore stop */

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import IndexTopBar from '../components/IndexTopBar.vue';
import SideBar from '../components/SideBar.vue';
// import APIService from '../services/APIService';

const IsSideBarShow = ref(window.innerWidth > 992); // 側欄顯示
const IsMobile = ref(window.innerWidth < 992); // 側欄顯示
const IsScrolled = ref(false); // 是否已捲動
// const UserName = ref(APIService.UserName); // 使用者帳號

const ScrollToTop = () => window.scrollTo(0, 0); // 捲到頂部

onMounted(() => {
  // 垂直捲動超過100則設為已捲動
  window.addEventListener('scroll', () => {
    IsScrolled.value = window.scrollY > 100;
  });
});

// 重新渲染外勤紀錄
const ResizeCalendar = () => {
  window.emitter.emit('ResizeCalendar');
};

// 切換側欄顯示
const changeSideBarShow = () => {
  IsSideBarShow.value = !IsSideBarShow.value;
};

// 切換手機版側欄
const changeMobileSideBar = () => {
  IsMobile.value = window.innerWidth < 992;
};

// 監聽瀏覽器寬度
window.addEventListener('resize', changeMobileSideBar);
onBeforeUnmount(() => {
  window.removeEventListener('resize', changeMobileSideBar);
});

window.emitter.on('ChangeSideBarShow', changeSideBarShow);
</script>
<style scoped>
@import '../assets/css/views/home.css';
</style>
