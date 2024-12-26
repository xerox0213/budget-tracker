// @vitest-environment happy-dom

import { beforeEach, describe, expect, it } from "vitest";

import { getSavedTheme } from "../../../src/services/theme-service";

beforeEach(() => {
  localStorage.clear();
});

describe("get saved theme", () => {
  it("should return the theme saved in localstorage", () => {
    const theme = "light";
    localStorage.setItem("theme", theme);

    const savedTheme = getSavedTheme();

    expect(savedTheme).toEqual(theme);
  });

  it("should return undefined if no theme has been saved", () => {
    const savedTheme = getSavedTheme();
    expect(savedTheme).toBeUndefined();
  });
});
