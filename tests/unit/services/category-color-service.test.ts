import { describe, expect, it } from "vitest";

import { getLightCategoryColor } from "../../../src/services/category-color-service";

describe("get light category color", () => {
  it("should return the light color for the income category", () => {
    const lightCategoryColor = getLightCategoryColor("income");
    expect(lightCategoryColor).toEqual("income-light");
  });
});
