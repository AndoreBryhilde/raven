/* c8 ignore start */
<template>
  <div class="h-screen vertical-container login">
    <div class="w-full h-full flex">
      <div class="col-6 xl:flex flex-column pl-8 pt-8 align-items-center">
        <img alt="bigLogo" src="/Raven_Dragon.png" />
      </div>
      <div class="col-6 xl:flex flex-column justify-content-center align-items-center">
        <div ref="googleButton" />
        <Button label="Signin with Google Account" class="col-6 mt-3" />
      </div>
    </div>
  </div>
</template>
/* c8 ignore stop */

<script setup>
import { ref, onMounted } from 'vue';
import UserService from '../services/UserService';

// 參考 Google 登入按鈕的 DOM 元素
const googleButton = ref(null);

// 處理 Google 回應
const handleCredentialResponse = (response) => {
  const idToken = response.credential;

  // 發送 ID token 到後端進行驗證
  fetch('/api/googleauth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Token: idToken }),
  })
    .then((res) => res.json())
    .then((o) => {
      UserService.GetCurrentUser(idToken, o.name); // 取得 當前使用者資訊
      window.router.push('/');
    })
    .catch((error) => console.error('網絡錯誤', error));
};

// 在組件掛載後初始化 Google 登入按鈕
onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: window.GoogleID, // 使用環境變量中的 Client ID
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(googleButton.value, {
      theme: 'filled_black',
      size: 'large',
    });
  } else {
    console.error('Google API 未加載');
  }
});
</script>
