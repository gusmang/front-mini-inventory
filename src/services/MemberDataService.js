import http from "../http-common";

class MemberDataService {
  getAll(params) {
    return http.get("/member/list", { params });
  }
  // other CRUD methods
}

export default new MemberDataService();