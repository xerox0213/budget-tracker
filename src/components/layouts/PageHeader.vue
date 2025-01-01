<script setup lang="ts"></script>

<template>
  <div class="border-b py-5 border-surface">
    <div class="container flex flex-wrap justify-between gap-2">
      <div>
        <h1 class="text-4xl font-bold">
          <slot name="title" />
        </h1>
        <p class="text-muted-color">
          <slot name="subtitle" />
        </p>
      </div>
      <div class="flex items-start gap-x-1">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
