<script setup lang="ts">
import { computed } from "vue";

import PageSection from "@/components/layouts/PageSection.vue";
import { useCategoriesWithAnalytics } from "@/composables/category/useCategoriesWithAnalytics.ts";
import { useTransactionAmount } from "@/composables/transaction/useTransactionAmount.ts";
import { useTransactionDateRange } from "@/composables/transaction/useTransactionDateRange.ts";
import { useTransactionTypeFilter } from "@/composables/transaction/useTransactionTypeFilter.ts";
import { useCurrencyStore } from "@/stores/currency-store.ts";

const currencyStore = useCurrencyStore();

const { dateRange, transactions } = useTransactionDateRange();

const { filteredTransactions: incomeTransactions } = useTransactionTypeFilter(
  transactions,
  "income",
);

const { filteredTransactions: expenseTransactions } = useTransactionTypeFilter(
  transactions,
  "expense",
);

const { amount: incomeAmount } = useTransactionAmount(incomeTransactions);

const { amount: expenseAmount } = useTransactionAmount(expenseTransactions);

const balanceAmount = computed<number>(() => {
  return incomeAmount.value - expenseAmount.value;
});

const { categoriesWithAnalytics: incomeCategoriesWithAnalytics } =
  useCategoriesWithAnalytics(incomeTransactions);

const { categoriesWithAnalytics: expenseCategoriesWithAnalytics } =
  useCategoriesWithAnalytics(expenseTransactions);
</script>

<template>
  <PageSection>
    <template #title>Overview</template>
    <template #actions>
      <DatePicker
        v-model="dateRange"
        date-format="yy-mm-dd"
        selection-mode="range"
        :manual-input="false"
      />
    </template>

    <div class="space-y-3">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          class="flex flex-col border bg-primary-contrast p-3 border-surface rounded-border"
        >
          <span class="text-muted-color">Income</span>
          <span class="text-xl">
            {{ incomeAmount }}
            {{ currencyStore.defaultCurrency.symbol }}
          </span>
        </div>

        <div
          class="flex flex-col border bg-primary-contrast p-3 border-surface rounded-border"
        >
          <span class="text-muted-color">Expense</span>
          <span class="text-xl">
            {{ expenseAmount }}
            {{ currencyStore.defaultCurrency.symbol }}
          </span>
        </div>
        <div
          class="flex flex-col border bg-primary-contrast p-3 border-surface rounded-border"
        >
          <span class="text-muted-color">Balance</span>
          <span class="text-xl">
            {{ balanceAmount }}
            {{ currencyStore.defaultCurrency.symbol }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div class="border bg-primary-contrast border-surface rounded-border">
          <div class="p-3 text-xl font-semibold text-color">
            Incomes by category
          </div>
          <div class="flex h-[250px] flex-col gap-4 overflow-y-scroll p-3 pt-0">
            <div
              v-for="item in incomeCategoriesWithAnalytics"
              :key="item.id"
              class="flex flex-col gap-2"
            >
              <span>
                {{ item.icon }}
                {{ item.name }}
                ({{ item.transactionAmount }}
                {{ currencyStore.defaultCurrency.symbol }})
              </span>
              <ProgressBar
                :pt="{
                  value: 'bg-income-light',
                }"
                :value="item.part"
              />
            </div>
            <div
              v-if="!incomeCategoriesWithAnalytics.length"
              class="flex h-full flex-col items-center justify-center"
            >
              <span>No data for the select period</span>
              <span class="text-center text-sm text-muted-color">
                Try selecting a different period or try adding new incomes
              </span>
            </div>
          </div>
        </div>
        <div class="border bg-primary-contrast border-surface rounded-border">
          <div class="p-3 text-xl font-semibold text-color">
            Expenses by category
          </div>
          <div class="flex h-[250px] flex-col gap-4 overflow-y-scroll p-3 pt-0">
            <div
              v-for="item in expenseCategoriesWithAnalytics"
              :key="item.id"
              class="flex flex-col gap-2"
            >
              <span>
                {{ item.icon }}
                {{ item.name }}
                ({{ item.transactionAmount }}
                {{ currencyStore.defaultCurrency.symbol }})
              </span>
              <ProgressBar
                :pt="{
                  value: 'bg-expense-light',
                }"
                :value="item.part"
              />
            </div>
            <div
              v-if="!expenseCategoriesWithAnalytics.length"
              class="flex h-full flex-col items-center justify-center"
            >
              <span>No data for the select period</span>
              <span class="text-center text-sm text-muted-color">
                Try selecting a different period or try adding new expenses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageSection>
</template>

<style scoped></style>
