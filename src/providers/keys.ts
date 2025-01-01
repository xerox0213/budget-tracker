import type { InjectionKey } from "vue";

import type { ThemeData } from "@/types/theme-type.ts";

export const themeKey = Symbol() as InjectionKey<ThemeData>;
