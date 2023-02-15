import HttpFactory from "../factory";

class ElementModule extends HttpFactory {
  private RESOURCE = "/elements";

  async list(queries?: object) {
    return await this.call("GET", `${this.RESOURCE}/`);
  }

  async retrieve(id: string) {
    return await this.call("GET", `${this.RESOURCE}/${id}/`);
  }
}

export default ElementModule;
