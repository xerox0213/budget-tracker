<script setup lang="ts">
import { computed } from "vue";

import AddCategoryDialog from "@/components/dialogs/AddCategoryDialog.vue";
import { getLightCategoryColor } from "@/services/category-color-service.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category } from "@/types/category-type.ts";

type Props = { categoryType: Category["categoryType"] };
const props = defineProps<Props>();

const categoryStore = useCategoryStore();

const categories = computed<Category[]>(() => {
  return categoryStore.categories.filter(
    (category) => category.categoryType == props.categoryType,
  );
});

const lightCategoryColor = computed<string>(() => {
  return getLightCategoryColor(props.categoryType);
});
</script>

<template>
  <DataView
    class="overflow-hidden border border-surface rounded-border"
    :value="categories"
    data-key="id"
    layout="grid"
  >
    <template #header>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div class="text-2xl font-bold first-letter:uppercase">
            {{ categoryType }} categories
          </div>
          <div class="text-muted-color">Sorted by name</div>
        </div>
        <AddCategoryDialog :category-type="categoryType" />
      </div>
    </template>

    <template #grid="slotProps">
      <div
        class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <div
          v-for="category in slotProps.items"
          :key="category.id"
          class="overflow-hidden border border-surface rounded-border"
        >
          <div class="flex flex-col items-center gap-y-2 p-2">
            <span class="text-3xl">{{ category.icon }}</span>
            <span class="text-md">{{ category.name }}</span>
          </div>
          <div>
            <Button
              size="small"
              severity="danger"
              class="w-full rounded-none"
              @click="categoryStore.destroy(category.id)"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </template>

    <template #empty>
      <div
        class="flex min-h-[153px] flex-col items-center justify-center text-center"
      >
        <span>
          No
          <span :class="`text-${lightCategoryColor}`">{{ categoryType }}</span>
          categories yet
        </span>
        <span class="text-sm text-muted-color-emphasis">
          Create one to get started
        </span>
      </div>
    </template>
  </DataView>
</template>
<style scoped></style>
