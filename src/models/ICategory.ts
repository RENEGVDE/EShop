import { IItem } from "./IItem";

export interface ICategory {
  id: number;
  title: string;
  items: IItem[];
}
