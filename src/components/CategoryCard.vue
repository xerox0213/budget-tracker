<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategoryStore } from "@/stores/category/category-store.ts";
import { Category } from "@/stores/category/category-types.ts";
import { Trash2 } from "lucide-vue-next";

type Properties = {
  category: Category;
};

defineProps<Properties>();

const { deleteCategory } = useCategoryStore();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-col items-center">
        <span>{{ category.icon }}</span>
        <span class="text-xl font-medium">{{ category.name }}</span>
      </CardTitle>
    </CardHeader>
    <CardFooter class="p-0">
      <Button
        variant="destructive"
        class="w-full rounded-t-none"
        @click="deleteCategory(category.id)"
      >
        <Trash2 />
        Remove
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
