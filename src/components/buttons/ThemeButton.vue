<script setup lang="ts">
import { ref } from "vue";

import { isCurrentThemeDark, toggleTheme } from "@/services/theme-service.ts";

const dark = ref<boolean>(isCurrentThemeDark());

const handleClick = () => {
  toggleTheme();
  dark.value = !dark.value;
};
</script>

<template>
  <Button
    variant="outlined"
    size="small"
    :icon="dark ? 'pi pi-sun' : 'pi pi-moon'"
    @click="handleClick"
  />
</template>

<style scoped></style>
