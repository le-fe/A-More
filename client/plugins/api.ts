import { $fetch, FetchOptions } from "ohmyfetch";
import AuthModule from "../repository/modules/auth";
import UserModule from "../repository/modules/user";
import BoardModule from "../repository/modules/board";
import PostCategoriesModule from "../repository/modules/post-categories";
import TextureModule from "../repository/modules/texture";
import ElementModule from "../repository/modules/element";
import BoardElementModule from "../repository/modules/board-elements";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: AuthModule;
  user: UserModule;
  postCategories: PostCategoriesModule;
  texture: TextureModule;
  board: BoardModule;
  element: ElementModule;
  boardElements: BoardElementModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.apiBase,
  };

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
    user: new UserModule(apiFetcher),
    postCategories: new PostCategoriesModule(apiFetcher),
    texture: new TextureModule(apiFetcher),
    board: new BoardModule(apiFetcher),
    element: new ElementModule(apiFetcher),
    boardElements: new BoardElementModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
