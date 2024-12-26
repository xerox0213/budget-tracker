// @vitest-environment happy-dom

import { beforeEach, describe, expect, it } from "vitest";

import {
  getSavedTheme,
  isCurrentThemeDark,
} from "../../../src/services/theme-service";

beforeEach(() => {
  document.documentElement.className = "";
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

describe("is current theme dark", () => {
  it("should return true", () => {
    document.documentElement.classList.add("dark");

    expect(isCurrentThemeDark()).toBeTruthy();
  });

  it("should return false", () => {
    expect(isCurrentThemeDark()).toBeFalsy();
  });
});
