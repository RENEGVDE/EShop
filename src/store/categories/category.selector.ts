import { createSelector } from "reselect";
import { IRootState } from "../root-reducer";
import { ICategory } from "../../models/ICategory";

const selectCategoryReducer = (state: IRootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc: Record<string, any>, category: ICategory) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
