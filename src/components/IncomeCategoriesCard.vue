<script setup lang="ts">
import CategoriesCard from "@/components/CategoriesCard.vue";
import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";

const categoryStore = useCategoryStore();
</script>

<template>
  <CategoriesCard
    :categories="categoryStore.incomeCategories"
    :type="CategoryType.enum.income"
  >
  </CategoriesCard>
</template>

<style scoped></style>
