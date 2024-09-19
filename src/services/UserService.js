import APIService from './APIService';
import AuthorizationService from './AuthorizationService';

export default class UserService {
  static UserLoginID = 'admin'; // 使用者帳號

  // 取得 當前使用者資訊
  static GetCurrentUser() {
    return APIService.get('currentuser').then((o) => {
      APIService.defaults.headers.common.Authorization = o.data.token;
      document.cookie = `RavenToken=${JSON.stringify(APIService.defaults.headers.common.Authorization)}`;
      // 若 有儲存權杖 則 更新權杖
      if (localStorage.token) localStorage.token = o.data.token;
      AuthorizationService.AllAuthorizations = o.data.allAuthorizations; // 權限列表
      AuthorizationService.UserAuthorization = o.data.userAuthorization; // 使用者授權
      this.UserLoginID = o.data.loginID; // 使用者帳號
      this.UserDepartmentName = o.data.departmentName; // 使用者部門名稱
    });
  }
}
