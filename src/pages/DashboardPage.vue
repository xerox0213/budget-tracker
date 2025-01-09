<script setup lang="ts">
import AddTransactionDialog from "@/components/dialogs/AddTransactionDialog.vue";
import MainContent from "@/components/layouts/MainContent.vue";
import PageHeader from "@/components/layouts/PageHeader.vue";
import HistoryPageSection from "@/components/page-sections/HistoryPageSection.vue";
import OverviewPageSection from "@/components/page-sections/OverviewPageSection.vue";
</script>

<template>
  <PageHeader>
    <template #title> Hello 👋</template>
    <template #subtitle>Welcome in your dashboard</template>
    <template #actions>
      <AddTransactionDialog transaction-type="income" />
      <AddTransactionDialog transaction-type="expense" />
    </template>
  </PageHeader>
  <MainContent>
    <OverviewPageSection />
    <HistoryPageSection />
  </MainContent>
</template>

<style scoped></style>
