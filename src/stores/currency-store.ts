import { defineStore } from "pinia";
import { ref } from "vue";

import { currencies } from "@/data/currencies.ts";
import type { Currency } from "@/types/currency-type.ts";

const setup = () => {
  const defaultCurrency = ref<Currency>(currencies[0]);

  const update = (isoCode: Currency["isoCode"]) => {
    const currency = currencies.find(
      (currency) => currency.isoCode === isoCode,
    );

    if (!currency) throw new Error("The currency does not exist.");

    defaultCurrency.value = currency;
  };

  return {
    defaultCurrency,
    update,
  };
};

export const useCurrencyStore = defineStore("currency", setup);
