<script setup lang="ts">
import CategoriesDataView from "@/components/data-views/CategoriesDataView.vue";
import MainContent from "@/components/layouts/MainContent.vue";
import PageHeader from "@/components/layouts/PageHeader.vue";
import CurrencyPanel from "@/components/panels/CurrencyPanel.vue";
</script>

<template>
  <PageHeader>
    <template #title>Manage</template>
    <template #subtitle>Manage you account settings and categories</template>
  </PageHeader>

  <MainContent>
    <CurrencyPanel />
    <CategoriesDataView category-type="income" />
    <CategoriesDataView category-type="expense" />
  </MainContent>
</template>

<style scoped></style>
