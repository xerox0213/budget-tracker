<script setup lang="ts">
import AddIncomeCategoryDialog from "@/components/AddIncomeCategoryDialog.vue";
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
    <template #add-category-dialog>
      <AddIncomeCategoryDialog />
    </template>
  </CategoriesCard>
</template>

<style scoped></style>
