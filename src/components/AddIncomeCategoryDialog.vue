<script setup lang="ts">
import AddCategoryDialog from "@/components/AddCategoryDialog.vue";
import { toast } from "@/components/ui/toast";
import { CategoryType } from "@/stores/category/category-schema.ts";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { CategoryData } from "@/stores/category/category-types.ts";

const categoryStore = useCategoryStore();

const handleAddCategory = (categoryData: CategoryData) => {
  categoryStore.addIncomeCategory(categoryData);
  toast({
    class: "text-emerald-500",
    title: "Income category created successfully 🎉",
  });
};
</script>

<template>
  <AddCategoryDialog
    :type="CategoryType.enum.income"
    @add-category="handleAddCategory"
  >
    <template #dialog-trigger>
      <slot />
    </template>
  </AddCategoryDialog>
</template>

<style scoped></style>
