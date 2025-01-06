<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { ref } from "vue";

import MainContent from "@/components/layouts/MainContent.vue";
import PageHeader from "@/components/layouts/PageHeader.vue";
import { useTransactionDateRange } from "@/composables/transaction/useTransactionDateRange.ts";
import { useTransactionsWithCategories } from "@/composables/transaction/useTransactionsWithCategories.ts";
import { categoryTypeEnum } from "@/schemas/category-schema.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import { useCurrencyStore } from "@/stores/currency-store.ts";
import { useTransactionStore } from "@/stores/transaction-store.ts";
import type { Category } from "@/types/category-type.ts";

const transactionStore = useTransactionStore();
const currencyStore = useCurrencyStore();
const categoryStore = useCategoryStore();

const { dateRange, transactions } = useTransactionDateRange();

const { transactionsWithCategories } =
  useTransactionsWithCategories(transactions);

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};

const filters = ref({
  "category.categoryType": { value: null, matchMode: FilterMatchMode.EQUALS },
  category: { value: null, matchMode: FilterMatchMode.IN },
});

const categoryTypes = ref(Object.values(categoryTypeEnum.Values));

const getSeverity = (categoryType: Category["categoryType"]) => {
  switch (categoryType) {
    case "income":
      return "success";
    case "expense":
      return "danger";
    default:
      return "";
  }
};

const formatDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};
</script>

<template>
  <PageHeader>
    <template #title>Transactions history</template>
    <template #subtitle> Manage your transactions</template>
    <template #actions>
      <DatePicker
        v-model="dateRange"
        date-format="yy-mm-dd"
        selection-mode="range"
        :manual-input="false"
      />
    </template>
  </PageHeader>

  <MainContent>
    <DataTable
      ref="dt"
      v-model:filters="filters"
      class="overflow-hidden border border-b border-surface rounded-border"
      :value="transactionsWithCategories"
      filter-display="row"
      paginator
      :rows="5"
      removable-sort
      sort-mode="multiple"
      data-key="id"
    >
      <template #header>
        <div class="pb-4 text-end">
          <Button
            icon="pi pi-external-link"
            outlined
            size="small"
            label="Export CSV"
            @click="exportCSV()"
          />
        </div>
      </template>

      <Column
        field="category.name"
        filter-field="category"
        header="Category"
        :show-filter-menu="false"
        :sortable="true"
      >
        <template #body="{ data }">
          {{ data.category.icon }}
          {{ data.category.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            :options="categoryStore.categories"
            option-label="name"
            size="small"
            placeholder="Any"
            :max-selected-labels="1"
            @change="filterCallback()"
          >
            <template #value="{ value, placeholder }">
              <template v-if="value && value.length >= 1">
                <span v-if="value.length == 1">
                  {{ value[0].icon }} {{ value[0].name }}
                </span>
                <span v-else>{{ value.length }} categories selected</span>
              </template>
              <span v-else>{{ placeholder }}</span>
            </template>

            <template #option="{ option }">
              <div>{{ option.icon }} {{ option.name }}</div>
            </template>
          </MultiSelect>
        </template>
      </Column>

      <Column
        field="description"
        header="Description"
        :sortable="true"
      ></Column>

      <Column field="date" header="Date" :sortable="true">
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
      </Column>

      <Column
        field="category.categoryType"
        header="Type"
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <Tag
            :value="data.category.categoryType"
            :severity="getSeverity(data.category.categoryType)"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            :options="categoryTypes"
            placeholder="Select one"
            :show-clear="true"
            size="small"
            :highlight-on-select="false"
            @change="filterCallback()"
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option"
                :severity="getSeverity(slotProps.option)"
              />
            </template>
          </Select>
        </template>
      </Column>

      <Column field="amount" header="Amount" :sortable="true">
        <template #body="{ data }">
          <Tag class="w-full">
            {{ data.amount }}
            {{ currencyStore.defaultCurrency.symbol }}
          </Tag>
        </template>
      </Column>

      <Column class="w-24 text-end">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            text
            rounded
            @click="transactionStore.destroy(data.id)"
          />
        </template>
      </Column>

      <template #empty>
        <div class="text-center">No transactions found</div>
      </template>
    </DataTable>
  </MainContent>
</template>

<style scoped></style>
