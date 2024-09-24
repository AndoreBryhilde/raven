import APIService from './APIService';
// import AuthorizationService from './AuthorizationService';

export default class UserService {
  static UserLoginID = 'admin'; // 使用者帳號

  // 取得 當前使用者資訊
  static GetCurrentUser(token, loginID) {
    APIService.defaults.headers.common.Authorization = token;
    document.cookie = `RavenToken=${JSON.stringify(APIService.defaults.headers.common.Authorization)}`;
    // 若 有儲存權杖 則 更新權杖
    if (localStorage.token) localStorage.token = token;
    // AuthorizationService.AllAuthorizations = o.data.allAuthorizations; // 權限列表F
    // AuthorizationService.UserAuthorization = o.data.userAuthorization; // 使用者授權
    this.UserLoginID = loginID; // 使用者帳號

    return Promise.resolve();
  }
}
