// @vitest-environment happy-dom

import { beforeEach, expect, it } from "vitest";

import {
  getSavedTheme,
  saveTheme,
  setDark,
  setLight,
} from "../../../src/services/theme-service";

const themes = ["auto", "light", "dark"];

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
});

it("should set theme to dark", () => {
  setDark();
  const isDark = document.documentElement.classList.contains("dark");
  expect(isDark).toBeTruthy();
});

it("should set theme to light", () => {
  setLight();
  const isLight = !document.documentElement.classList.contains("light");
  expect(isLight).toBeTruthy();
});

it.each(themes)("should save the given theme", (theme) => {
  saveTheme(theme);
  const themeSaved = localStorage.getItem("theme");
  expect(themeSaved).toBe(theme);
});

it.each(themes)("should return the saved theme", (theme) => {
  localStorage.setItem("theme", theme);
  const themeSaved = getSavedTheme();
  expect(themeSaved).toBe(theme);
});
