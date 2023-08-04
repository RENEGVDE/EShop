import { IItem } from "./IItem";

export interface ICategory {
  id: number;
  title: string;
  imageUrl: string;
  items: IItem[];
}
