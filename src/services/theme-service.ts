import type { Theme } from "@/types/theme-type.ts";

export const darkMedia = matchMedia("(prefers-color-scheme: dark)");

export const setDark = () => {
  document.documentElement.classList.add("dark");
};

export const setLight = () => {
  document.documentElement.classList.remove("dark");
};

export const saveTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

export const getSavedTheme = (): Theme => {
  return (localStorage.getItem("theme") ?? "light") as Theme;
};

export const onChangePreferSchemeColor = () => {
  if (darkMedia.matches) {
    setDark();
  } else {
    setLight();
  }
};

export const addOnChangePreferSchemeColor = () => {
  darkMedia.addEventListener("change", onChangePreferSchemeColor);
};

export const removeOnChangePreferSchemeColor = () => {
  darkMedia.removeEventListener("change", onChangePreferSchemeColor);
};
