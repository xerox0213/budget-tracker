<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-vue-next";
import { ref } from "vue";

const dark = ref<boolean>(false);

const toggleDark = () => (dark.value = !dark.value);
</script>

<template>
  <Button @click="toggleDark" variant="ghost" size="icon">
    <Sun v-if="dark" />
    <Moon v-else />
  </Button>
</template>

<style scoped></style>
