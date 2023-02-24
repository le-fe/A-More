import HttpFactory from "../factory";

class BoardElementModule extends HttpFactory {
  private RESOURCE = "/board-elements";

  async list(boardId: string) {
    return await this.call("GET", `${this.RESOURCE}/${boardId}/`);
  }

  async retrieve(id: string) {
    return await this.call("GET", `${this.RESOURCE}/${id}/`);
  }

  async create(payload: object) {
    return await this.call("POST", `${this.RESOURCE}/`, payload);
  }

  async delete(id: string) {
    return await this.call("DELETE", `${this.RESOURCE}/${id}/`);
  }
}

export default BoardElementModule;
