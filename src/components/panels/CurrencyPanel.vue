<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { currencies } from "@/data/currencies.ts";
import { useCurrencyStore } from "@/stores/currency-store.ts";
import type { Currency } from "@/types/currency-type.ts";

const currencyStore = useCurrencyStore();

const selectedCurrency = ref<Currency>(currencyStore.defaultCurrency);

watchEffect(() => {
  if (selectedCurrency.value) {
    currencyStore.update(selectedCurrency.value.isoCode);
  }
});
</script>

<template>
  <Panel>
    <template #header>
      <div>
        <div class="text-2xl font-bold">Currency</div>
        <div class="text-muted-color">
          Set your default currency for transactions
        </div>
      </div>
    </template>
    <Select
      v-model="selectedCurrency"
      :options="currencies"
      option-label="isoCode"
      placeholder="Select currency"
      checkmark
      :highlight-on-select="false"
      class="w-full"
    />
  </Panel>
</template>

<style scoped></style>
