<script setup lang="ts">
import NavBar from "@/components/layouts/NavBar.vue";
import ThemeProvider from "@/providers/ThemeProvider.vue";
</script>

<template>
  <ThemeProvider>
    <NavBar />
    <RouterView />
  </ThemeProvider>
</template>

<style scoped></style>
