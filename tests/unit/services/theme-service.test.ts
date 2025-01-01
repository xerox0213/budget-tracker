// @vitest-environment happy-dom

import { beforeEach, expect, it } from "vitest";

import { setDark, setLight } from "../../../src/services/theme-service";

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
