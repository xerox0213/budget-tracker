<script setup lang="ts">
import { computed, inject, onMounted, ref, toValue, watch } from "vue";

import PageSection from "@/components/layouts/PageSection.vue";
import { themeKey } from "@/providers/keys.ts";
import { getDayNumbers, getMonthNumber } from "@/services/date-service.ts";
import {
  filterTransactionsByType,
  getAvailableYears,
  getTotalByDay,
  getTotalByMonth,
} from "@/services/transaction-service.js";
import { useTransactionStore } from "@/stores/transaction-store.js";
import type { Month, Months } from "@/types/date-type.ts";
import type { ThemeData } from "@/types/theme-type.ts";
import type { Transaction } from "@/types/transaction-type.ts";
import { months } from "@/utils/const.ts";

const { theme } = inject(themeKey) as ThemeData;

const transactionStore = useTransactionStore();

const incomeTransactions = computed<Transaction[]>(() => {
  return filterTransactionsByType(transactionStore.transactions, "income");
});

const expenseTransactions = computed<Transaction[]>(() => {
  return filterTransactionsByType(transactionStore.transactions, "expense");
});

const modes = ref<["Year", "Month"]>(["Year", "Month"]);

const selectedMode = ref<"Year" | "Month">("Year");

const years = computed<number[]>(() => {
  return getAvailableYears(transactionStore.transactions);
});

const selectedYear = ref<number>();

const monthNames = ref<Months>(months);

const selectedMonthName = ref<Month>(months[0]);

const chartData = ref();

const chartOptions = ref();

onMounted(() => {
  handleChartData();
  chartOptions.value = setChartOptions();
});

watch(
  [
    transactionStore.transactions,
    selectedMode,
    selectedYear,
    selectedMonthName,
  ],
  () => {
    handleChartData();
  },
  {
    immediate: false,
  },
);

watch(
  theme,
  () => {
    chartOptions.value = setChartOptions();
  },
  { immediate: false },
);

const handleChartData = () => {
  switch (toValue(selectedMode)) {
    case "Year":
      chartData.value = setTotalByMonthData();
      break;
    case "Month":
      chartData.value = setTotalByDayData();
      break;
    default:
      chartData.value = undefined;
      break;
  }
};

const setTotalByMonthData = () => {
  if (selectedYear.value) {
    return {
      labels: toValue(monthNames),
      datasets: [
        {
          label: "Incomes",
          data: getTotalByMonth(incomeTransactions.value, selectedYear.value),
          backgroundColor: ["rgba(249, 115, 22, 0.2)"],
          borderColor: ["rgb(249, 115, 22)"],
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: getTotalByMonth(expenseTransactions.value, selectedYear.value),
          backgroundColor: "rgba(168,25,63,0.2)",
          borderColor: "rgb(52,134,76)",
          borderWidth: 1,
        },
      ],
    };
  }

  return undefined;
};

const setTotalByDayData = () => {
  if (selectedYear.value && selectedMonthName.value) {
    const selectedMonthNumber = getMonthNumber(selectedMonthName.value);

    return {
      labels: getDayNumbers(selectedYear.value, selectedMonthNumber),
      datasets: [
        {
          label: "Incomes",
          data: getTotalByDay(
            incomeTransactions.value,
            selectedYear.value,
            selectedMonthNumber,
          ),
          backgroundColor: ["rgba(249, 115, 22, 0.2)"],
          borderColor: ["rgb(249, 115, 22)"],
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: getTotalByDay(
            expenseTransactions.value,
            selectedYear.value,
            selectedMonthNumber,
          ),
          backgroundColor: "rgba(168,25,63,0.2)",
          borderColor: "rgb(52,134,76)",
          borderWidth: 1,
        },
      ],
    };
  }

  return undefined;
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color",
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<template>
  <PageSection>
    <template #title>History</template>
    <template #actions>
      <SelectButton v-model="selectedMode" :options="modes" size="small" />
      <Select
        v-model="selectedYear"
        :options="years"
        placeholder="Select a year"
        size="small"
        checkmark
        :highlight-on-select="false"
      />
      <Select
        v-if="selectedMode === 'Month' && selectedYear"
        v-model="selectedMonthName"
        :options="monthNames"
        placeholder="Select a month"
        size="small"
        checkmark
        :highlight-on-select="false"
      />
    </template>
    <div class="min-h-[300px]">
      <Chart
        v-if="chartData"
        type="bar"
        :data="chartData"
        :options="chartOptions"
      />

      <div
        v-else
        class="flex min-h-[300px] items-center justify-center text-muted-color"
      >
        <span v-if="!selectedMode">Select between year and month mode</span>
        <span v-else-if="!transactionStore.transactions.length">
          You have not yet made any transactions
        </span>
        <span v-else>Select a period to display your history</span>
      </div>
    </div>
  </PageSection>
</template>
