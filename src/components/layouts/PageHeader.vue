<script setup lang="ts"></script>

<template>
  <div class="border-b py-5 border-surface">
    <div class="container">
      <h1 class="text-4xl font-bold">
        <slot name="title" />
      </h1>
      <p class="text-muted-color">
        <slot name="subtitle" />
      </p>
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped></style>
