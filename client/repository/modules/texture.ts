import HttpFactory from "../factory";

class TextureModule extends HttpFactory {
  private RESOURCE = "/texture";

  async list(queries?: object) {
    return await this.call("GET", `${this.RESOURCE}/`);
  }

  async retrieve(id: string) {
    return await this.call("GET", `${this.RESOURCE}/${id}/`);
  }
}

export default TextureModule;
