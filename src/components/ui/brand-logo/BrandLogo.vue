<script setup lang="ts">
import { logo, LogoVariants } from "@/components/ui/brand-logo/index.ts";
import { cn } from "@/lib/utils.ts";
import { HTMLAttributes } from "vue";

type Properties = {
  class?: HTMLAttributes["class"];
  size?: LogoVariants["size"];
};

const properties = defineProps<Properties>();
</script>

<template>
  <p :class="cn(logo({ size }), properties.class)">💵 Budget Tracker</p>
</template>

<style scoped></style>
