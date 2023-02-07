import HttpFactory from "../factory";

class PostCategoriesModule extends HttpFactory {
  private RESOURCE = "/post-categories";

  async list(queries?: object) {
    return await this.call("GET", `${this.RESOURCE}/`);
  }

  async retrieve(id: string) {
    return await this.call("GET", `${this.RESOURCE}/${id}/`);
  }
}

export default PostCategoriesModule;
