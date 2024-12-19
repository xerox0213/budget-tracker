<script setup lang="ts">
import ExpenseCategoriesCard from "@/components/ExpenseCategoriesCard.vue";
import IncomeCategoriesCard from "@/components/IncomeCategoriesCard.vue";
import ManageRibbon from "@/components/page-ribbons/ManageRibbon.vue";
import PageSection from "@/components/PageSection.vue";
</script>

<template>
  <ManageRibbon />
  <PageSection class="flex flex-col gap-y-4">
    <IncomeCategoriesCard />
    <ExpenseCategoriesCard />
  </PageSection>
</template>

<style scoped></style>
