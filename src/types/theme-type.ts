import type { Ref } from "vue";

export type Theme = "auto" | "light" | "dark";

export type ThemeData = {
  theme: Ref<Theme>;
  switchTheme: (theme: Theme) => void;
};
