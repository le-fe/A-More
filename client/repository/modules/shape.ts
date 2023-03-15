import HttpFactory from "../factory";

class ShapeModule extends HttpFactory {
  private RESOURCE = "/shape";

  async list(queries?: object) {
    return await this.call(
      "GET",
      `${this.RESOURCE}/?${new URLSearchParams(queries || {}).toString()}`
    );
  }
}

export default ShapeModule;
