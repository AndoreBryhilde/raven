/* c8 ignore start */
<template>
  <div class="sideBar">
    <PanelMenu v-model:expandedKeys="ExpandedKeys" :model="Items" class="cursor-pointer font-bold" @panel-open="ChangePanel">
      <template #item="slotProps">
        <!-- <div class="p-1" v-auth="slotProps.item.Authoriztion"> -->
        <div class="p-1">
          <div class="flex align-items-center">
            <div v-if="slotProps.item.items">
              <i v-if="ExpandedKeys[slotProps.item.key]" class="pi pi-angle-down" />
              <i v-else class="pi pi-angle-right" />
            </div>
            <div @click="ClickTitle(slotProps.item.Href)" @KeyDown="() => {}" v-text="slotProps.item.Name" />
          </div>
        </div>
      </template>
    </PanelMenu>
  </div>
</template>
/* c8 ignore stop */

<script setup>
import { ref } from 'vue';

const ExpandedKeys = ref({
  setting: true,
});

// 切換側欄
const ChangePanel = (o) => {
  // 關閉全部
  Object.keys(ExpandedKeys.value).forEach((p) => {
    ExpandedKeys.value[p] = false;
  });
  // 將點選的panel打開
  ExpandedKeys.value[o.item.key] = true;
};

const Items = ref([
  {
    key: 'setting',
    Name: '管理功能',
    Authoriztion: '',
    items: [
      { Name: '事件管理', Href: '/event', Authoriztion: '讀取事件' },
      { Name: '客戶管理', Href: '/customer', Authoriztion: '讀取客戶' },
      { Name: '帳號管理', Href: '/account', Authoriztion: '讀取帳號' },
    ],
  },
]);

// 點擊標題
const ClickTitle = (href) => {
  if (href === undefined) return;
  window.router.push(href);
  // 若 為手機版 則 關閉側欄
  if (window.innerWidth < 992) {
    window.emitter.emit('ChangeSideBarShow');
  }
};
</script>
<style>
@import '../assets/css/components/sidebar.css';
</style>
