<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Main from "@/components/layout/Main.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <Toaster />
  <Header />
  <Main>
    <RouterView />
  </Main>
</template>

<style scoped></style>
