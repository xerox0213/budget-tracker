import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { currencies } from "../../../src/data/currencies";
import { useCurrencyStore } from "../../../src/stores/currency-store";

let currencyStore: ReturnType<typeof useCurrencyStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  currencyStore = useCurrencyStore();
});

describe("update action", () => {
  it("should succeed", () => {
    const currency = currencies[1];

    currencyStore.update(currency.isoCode);

    expect(currencyStore.defaultCurrency).toEqual(currency);
  });
});
