import { $Fetch } from "ohmyfetch";
import { useAuthCookie } from "../composables/useAuthCookie";

class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /**
   * method - GET, POST, PUT
   * URL
   **/
  async call<T>(
    method: string,
    url: string,
    data?: object,
    extras = {}
  ): Promise<T> {
    const authCookie = useAuthCookie();
    let headers = {};
    if (authCookie.value) {
      headers = {
        Authorization: `Bearer ${authCookie.value}`,
      };
    }
    const $res: T = await this.$fetch(url, {
      headers,
      method,
      body: data,
      ...extras,
    });
    return $res;
  }
}

export default HttpFactory;
