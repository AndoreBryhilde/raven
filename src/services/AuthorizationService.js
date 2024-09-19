import APIService from './APIService';
// import RoleService from './RoleService';

export default class AuthorizationService {
  static AllAuthorizations = []; // 權限列表

  static UserAuthorization = []; // 使用者授權

  // 取得權限列表
  static GetAllAuthorization() {
    return APIService.get('authorization').then((o) => o.data);
  }

  // 是否授權
  static IsAuthorization(name) {
    // 若 權限名稱為空 則回授權
    if (name === '') return true;

    // 若 全部授權 則回授權
    if (this.UserAuthorization[0] === '*') return true;

    // 依 授權名稱 查出 授權主鍵
    const id = this.GetAuthorizationID(name);

    // 回 授權主鍵 是否在 使用者授權中
    return this.UserAuthorization.some((o) => +o === id);
  }

  // 依 授權名稱 查出 授權主鍵
  static GetAuthorizationID(name) {
    const authorization = this.AllAuthorizations.filter((o) => o.Name === name);
    // 若有授權名稱 則 回傳權限主鍵
    return authorization[0] ? authorization[0].ID : 0;
  }
}
