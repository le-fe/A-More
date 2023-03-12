import { ITexture } from "./ITexture";

type IBoard = {
  id?: string;
  name?: string;
  src?: string;
  texture?: ITexture;
  createAt?: string;
  isPublished?: boolean;
};

type IBoardElement = {
  type?: string;
  top: number;
  left: number;
  href?: string;
  width: number;
  height: number;
  content: string;
  label: string;
};

export { IBoard, IBoardElement };
