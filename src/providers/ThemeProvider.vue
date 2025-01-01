<script setup lang="ts">
import { onWatcherCleanup, provide, ref, watchEffect } from "vue";

import { themeKey } from "@/providers/keys.ts";
import {
  addOnChangePreferSchemeColor,
  getSavedTheme,
  onChangePreferSchemeColor,
  removeOnChangePreferSchemeColor,
  saveTheme,
  setDark,
  setLight,
} from "@/services/new-theme-service.ts";
import type { Theme } from "@/types/theme-type.ts";

const theme = ref<Theme>(getSavedTheme());

const switchTheme = (newTheme: Theme) => {
  saveTheme(newTheme);
  theme.value = newTheme;
};

watchEffect(() => {
  switch (theme.value) {
    case "auto":
      onChangePreferSchemeColor();
      addOnChangePreferSchemeColor();
      onWatcherCleanup(removeOnChangePreferSchemeColor);
      break;
    case "dark":
      setDark();
      break;
    case "light":
      setLight();
      break;
  }
});

provide(themeKey, { theme, switchTheme });
</script>

<template>
  <slot />
</template>

<style scoped></style>
