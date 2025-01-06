<script setup lang="ts">
import { computed, type Ref, toValue } from "vue";

import PageSection from "@/components/layouts/PageSection.vue";
import { useTransactionDateRange } from "@/composables/transaction/useTransactionDateRange.ts";
import {
  filterTransactionsByType,
  getBalance,
  getTotalTransactions,
} from "@/services/transaction-service.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import { useCurrencyStore } from "@/stores/currency-store.ts";
import type { CategoryAnalytic } from "@/types/category-type.ts";
import type { Category } from "@/types/category-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";

const currencyStore = useCurrencyStore();

const { dateRange, transactions } = useTransactionDateRange();

const incomeTransactions = computed(() => {
  return filterTransactionsByType(toValue(transactions), "income");
});

const expenseTransactions = computed(() => {
  return filterTransactionsByType(toValue(transactions), "expense");
});

const totalIncomes = computed<number>(() => {
  return getTotalTransactions(toValue(incomeTransactions));
});

const totalExpenses = computed<number>(() => {
  return getTotalTransactions(toValue(expenseTransactions));
});

const balance = computed<number>(() => {
  return getBalance(toValue(totalIncomes), toValue(totalExpenses));
});

const incomeCategoryAnalytics = computed(() => {
  return getCategoryAnalytics(incomeTransactions, totalIncomes);
});

const expenseCategoryAnalytics = computed(() => {
  return getCategoryAnalytics(expenseTransactions, totalExpenses);
});

const getCategoryAnalytics = (
  transactions: Ref<Transaction[]>,
  total: Ref<number>,
) => {
  const categoryStore = useCategoryStore();
  const analyticsByCategory: Map<Category, CategoryAnalytic> = new Map();

  for (const transaction of toValue(transactions)) {
    const category = categoryStore.view(transaction.categoryId);
    if (!category) continue;
    const analytic = analyticsByCategory.get(category);

    if (analytic) {
      analytic.total += transaction.amount;
      analytic.part = Math.round((analytic.total / toValue(total)) * 100);
    } else {
      analyticsByCategory.set(category, {
        total: transaction.amount,
        part: Math.round((transaction.amount / toValue(total)) * 100),
      });
    }
  }

  return analyticsByCategory;
};
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
            {{ totalIncomes }}
            {{ currencyStore.defaultCurrency.symbol }}
          </span>
        </div>

        <div
          class="flex flex-col border bg-primary-contrast p-3 border-surface rounded-border"
        >
          <span class="text-muted-color">Expense</span>
          <span class="text-xl">
            {{ totalExpenses }}
            {{ currencyStore.defaultCurrency.symbol }}
          </span>
        </div>
        <div
          class="flex flex-col border bg-primary-contrast p-3 border-surface rounded-border"
        >
          <span class="text-muted-color">Balance</span>
          <span class="text-xl">
            {{ balance }}
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
              v-for="[category, analytic] in incomeCategoryAnalytics"
              :key="category.id"
              class="flex flex-col gap-2"
            >
              <span>
                {{ category.icon }}
                {{ category.name }}
                ({{ analytic.total }}
                {{ currencyStore.defaultCurrency.symbol }})
              </span>
              <ProgressBar
                :pt="{
                  value: 'bg-income-light',
                }"
                :value="analytic.part"
              />
            </div>
            <div
              v-if="!incomeCategoryAnalytics.size"
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
              v-for="[category, analytic] in expenseCategoryAnalytics"
              :key="category.id"
              class="flex flex-col gap-2"
            >
              <span>
                {{ category.icon }}
                {{ category.name }}
                ({{ analytic.total }}
                {{ currencyStore.defaultCurrency.symbol }})
              </span>
              <ProgressBar
                :pt="{
                  value: 'bg-expense-light',
                }"
                :value="analytic.part"
              />
            </div>
            <div
              v-if="!expenseCategoryAnalytics.size"
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
