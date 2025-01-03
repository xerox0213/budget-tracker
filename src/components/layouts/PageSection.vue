<script setup lang="ts"></script>

<template>
  <section class="space-y-2">
    <div class="flex flex-wrap justify-between gap-2">
      <span class="text-2xl font-bold text-color">
        <slot name="title" />
      </span>
      <div class="flex flex-row">
        <slot name="actions" />
      </div>
    </div>

    <div>
      <slot name="default" />
    </div>
  </section>
</template>

<style scoped></style>
