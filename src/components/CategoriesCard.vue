<script setup lang="ts">
import CategoryCard from "@/components/CategoryCard.vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryType } from "@/stores/category/category-schema.ts";
import { Category } from "@/stores/category/category-types.ts";
import { SquarePlus, TrendingDown, TrendingUp } from "lucide-vue-next";
import { computed } from "vue";
import { z } from "zod";

type Properties = {
  categories: Category[];
  type: z.infer<typeof CategoryType>;
};

const { categories, type } = defineProps<Properties>();

const categoriesSortedByName = computed<Category[]>(() => {
  return [...categories].sort((c1, c2) => c1.name.localeCompare(c2.name));
});
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row flex-wrap justify-between border-b">
      <div class="flex flex-row gap-x-2">
        <TrendingUp
          v-if="type === 'income'"
          class="h-12 w-12 shrink-0 rounded bg-emerald-500/10 p-2 text-emerald-500"
        />
        <TrendingDown
          v-else-if="type === 'expense'"
          class="h-12 w-12 shrink-0 rounded bg-red-500/10 p-2 text-red-500"
        />
        <div>
          <CardTitle class="first-letter:uppercase">
            {{ type }} categories
          </CardTitle>
          <CardDescription>Sorted by name</CardDescription>
        </div>
      </div>
      <Button>
        <SquarePlus />
        Create category
      </Button>
    </CardHeader>
    <CardContent
      class="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-2 p-3"
    >
      <CategoryCard
        v-for="category in categoriesSortedByName"
        :key="category.id"
        :category="category"
      />
      <div
        v-if="categories.length === 0"
        class="col-start-1 col-end-[-1] flex h-[138px] flex-col items-center justify-center"
      >
        <p>
          No
          <span
            :class="{
              'text-emerald-500': type == 'income',
              'text-red-500': type == 'expense',
            }"
            >{{ type }}</span
          >
          categories found.
        </p>
        <p class="text-gray-400">Create one to get started.</p>
      </div>
    </CardContent>
  </Card>
</template>
