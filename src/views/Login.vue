/* c8 ignore start */
<template>
  <div class="h-screen vertical-container login">
    <div class="w-full h-full flex">
      <div class="col-6 xl:flex flex-column pl-8 pt-8 align-items-center">
        <img alt="bigLogo" src="/Raven_Dragon.png" />
      </div>
      <div class="col-6 xl:flex flex-column justify-content-center align-items-center">
        <Button label="Login with Google Account" class="col-6" />
        <Button label="Signin with Google Account" class="col-6 mt-3" />
      </div>
    </div>
  </div>
</template>
/* c8 ignore stop */

<script setup>
// import { ref } from 'vue';
// import LoginService from '../services/LoginService';
// import UtilityService from '../services/UtilityService';
// import UserService from '../services/UserService';

// const { Alert, IsEmailValid } = UtilityService; // 提示訊息 檢查Email格式

// const Email = ref(''); // 帳號
// const Password = ref(''); // 密碼
// const PasswordInput = ref(); // 密碼輸入框
// const IsRemember = ref(false); // 記住密碼

// // 登入
// const Login = () => {
//   LoginService.Login(Email.value.trim(), Password.value.trim(), IsRemember.value)
//     .then(UserService.GetCurrentUser) // 若 登入成功 取得 當前使用者資訊
//     .then(() => Alert('登入成功!', 'success'))
//     .then(() => window.router.push('/'))
//     .catch(() => Alert('登入失敗!', 'error'));
// };

// // 忘記密碼
// const SendResetPasswordMail = () => {
//   if (!Email.value) return Alert('未輸入信箱!', 'error');
//   if (!IsEmailValid(Email.value)) return Alert('信箱格式錯誤!', 'error'); // 檢查信箱格式是否正確

//   return LoginService.SendResetPasswordMail(Email.value)
//     .then(() => Alert('已發送重設密碼郵件至填寫的信箱!', 'success'))
//     .catch(() => Alert('傳送信件失敗!', 'error'));
// };
</script>
