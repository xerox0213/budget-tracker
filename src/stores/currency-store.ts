import { defineStore } from "pinia";
import { ref } from "vue";

import { currencies } from "@/data/currencies.ts";
import type { Currency } from "@/types/currency-type.ts";

const setup = () => {
  const defaultCurrency = ref<Currency>(currencies[0]);

  return {
    defaultCurrency,
  };
};

export const useCurrencyStore = defineStore("currency", setup);
