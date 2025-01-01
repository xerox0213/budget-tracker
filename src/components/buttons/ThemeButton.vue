<script setup lang="ts">
import { computed, inject, ref } from "vue";

import { themeKey } from "@/providers/keys.ts";
import type { ThemeData } from "@/types/theme-type.ts";

const { theme, switchTheme } = inject(themeKey) as ThemeData;

const op = ref();

const items = [
  {
    theme: "auto",
    icon: "pi pi-sparkles",
    action: () => switchTheme("auto"),
  },
  {
    theme: "light",
    icon: "pi pi-sun",
    action: () => switchTheme("light"),
  },
  {
    theme: "dark",
    icon: "pi pi-moon",
    action: () => switchTheme("dark"),
  },
];

const icon = computed<string>(() => {
  switch (theme.value) {
    case "auto":
      return "pi pi-sparkles";
    case "light":
      return "pi pi-sun";
    case "dark":
      return "pi pi-moon";
    default:
      return "";
  }
});

const toggle = (event) => op.value.toggle(event);
</script>

<template>
  <Button :icon="icon" size="small" outlined @click="toggle" />
  <Popover ref="op">
    <div class="flex flex-col gap-y-3">
      <Button
        v-for="item in items"
        :key="item.theme"
        :icon="item.icon"
        variant="outlined"
        size="small"
        @click="item.action"
      />
    </div>
  </Popover>
</template>

<style scoped></style>
