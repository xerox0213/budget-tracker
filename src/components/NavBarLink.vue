<script setup lang="ts">
interface Properties {
  routeName: string;
}

defineProps<Properties>();
</script>

<template>
  <RouterLink
    :to="{ name: routeName }"
    class="rounded px-2 py-1 transition-colors hover:bg-secondary"
    exact-active-class="font-bold hover:bg-transparent"
  >
    <slot />
  </RouterLink>
</template>

<style scoped></style>
