// @vitest-environment happy-dom

import { beforeEach, expect, it } from "vitest";

import { setDark } from "../../../src/services/theme-service";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
});

it("should set theme to dark", () => {
  setDark();
  const isDark = document.documentElement.classList.contains("dark");
  expect(isDark).toBeTruthy();
});
