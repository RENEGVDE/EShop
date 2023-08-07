import { createSelector } from "reselect";
import { ICategoriesState, IRootState } from "../root-reducer";
import { ICategory } from "../../models/ICategory";
import { IItem } from "../../models/IItem";

interface ICategoriesMap {
  [key: string]: IItem[];
}

const selectCategoryReducer = (state: IRootState): ICategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc: ICategoriesMap, category: ICategory) => {
      const { title, items } = category;

      if (!items) return acc;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
