<script setup lang="ts">
import AddTransactionDialog from "@/components/dialogs/AddTransactionDialog.vue";
import PageHeader from "@/components/layouts/PageHeader.vue";
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
</template>

<style scoped></style>
