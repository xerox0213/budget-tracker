<script setup lang="ts">
import AddExpenseCategoryDialog from "@/components/AddExpenseCategoryDialog.vue";
import CategoriesCard from "@/components/CategoriesCard.vue";
import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";

const categoryStore = useCategoryStore();
</script>

<template>
  <CategoriesCard
    :categories="categoryStore.expenseCategories"
    :type="CategoryType.enum.expense"
  >
    <template #add-category-dialog>
      <AddExpenseCategoryDialog />
    </template>
  </CategoriesCard>
</template>

<style scoped></style>
