import HttpFactory from "../factory";

class UserModule extends HttpFactory {
  private RESOURCE = "/users";

  async checkAvailable(username: string) {
    return await this.call("GET", `${this.RESOURCE}/available/${username}`);
  }
}

export default UserModule;
