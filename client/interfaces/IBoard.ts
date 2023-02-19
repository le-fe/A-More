import { ITexture } from "./ITexture";

type IBoard = {
  id?: string;
  name?: string;
  src?: string;
  texture?: ITexture;
  createAt?: string;
};

export { IBoard };
