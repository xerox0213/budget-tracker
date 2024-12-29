import { expect, it } from "vitest";

import { categoryTypeEnum } from "../../../src/schemas/category-schema";
import {
  getDarkCategoryColor,
  getLightCategoryColor,
} from "../../../src/services/category-color-service";

const categoriesType = Object.values(categoryTypeEnum.Values);

it.each(categoriesType)(
  "should return the light color of the category",
  (categoryType) => {
    const lightCategoryColor = getLightCategoryColor(categoryType);
    expect(lightCategoryColor).toEqual(`${categoryType}-light`);
  },
);

it.each(categoriesType)(
  "should return the dark color of the category",
  (categoryType) => {
    const darkCategoryColor = getDarkCategoryColor(categoryType);
    expect(darkCategoryColor).toEqual(`${categoryType}-dark`);
  },
);
