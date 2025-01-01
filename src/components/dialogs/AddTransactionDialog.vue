<script setup lang="ts">
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { computed, ref, watchEffect } from "vue";

import { transactionDataSchema } from "@/schemas/transaction-schema.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import { useCurrencyStore } from "@/stores/currency-store.ts";
import { useTransactionStore } from "@/stores/transaction-store.ts";
import type { Category } from "@/types/category-type.ts";
import type { TransactionData } from "@/types/transaction-type.ts";

type Props = { transactionType: Category["categoryType"] };
const props = defineProps<Props>();

const categoryStore = useCategoryStore();
const currencyStore = useCurrencyStore();
const transactionStore = useTransactionStore();

const visible = ref<boolean>(false);
const categories = computed(() => {
  return categoryStore.categories.filter(
    (category) => category.categoryType === props.transactionType,
  );
});
const selectedCategoryId = ref();
const selectedCategory = computed<Category | undefined>(() => {
  return categoryStore.categories.find(
    (category) => category.id === selectedCategoryId.value,
  );
});
const resolver = ref(zodResolver(transactionDataSchema));

const onSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    const transactionData = values as TransactionData;
    transactionStore.store(transactionData);
  }
};
</script>

<template>
  <Button
    icon="pi pi-plus"
    :label="`New ${transactionType}`"
    size="small"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    :draggable="false"
    modal
    class="w-screen sm:max-w-screen-sm"
  >
    <template #header>
      <div class="text-xl font-bold">
        Create a new
        <span>{{ transactionType }}</span>
        transaction
      </div>
    </template>

    <Form :resolver="resolver" class="space-y-5" @submit="onSubmit">
      <div class="space-y-1">
        <label for="description">Description</label>
        <InputText id="description" name="description" type="text" fluid />
        <Message variant="simple" severity="secondary" size="small">
          Transaction description (optional)
        </Message>
      </div>

      <div class="space-y-1">
        <label for="amount">Amount</label>
        <InputNumber
          input-id="amount"
          name="amount"
          mode="currency"
          :currency="currencyStore.defaultCurrency.isoCode"
          :min="1"
          locale="en-US"
          fluid
        />
        <Message variant="simple" severity="secondary" size="small">
          Transaction amount (required)
        </Message>
      </div>

      <div class="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2">
        <div class="space-y-1">
          <label for="category">Category</label>
          <Select
            v-model="selectedCategoryId"
            label-id="category"
            name="categoryId"
            :options="categories"
            option-label="name"
            option-value="id"
            placeholder="Select category"
            checkmark
            data-key="id"
            filter
            :highlight-on-select="false"
            fluid
          >
            <template #value="slotProps">
              <div v-if="selectedCategory" class="space-x-1">
                <span>{{ selectedCategory.icon }}</span>
                <span>{{ selectedCategory.name }}</span>
              </div>
              <div v-else>
                {{ slotProps.placeholder }}
              </div>
            </template>

            <template #option="slotProps">
              <div class="space-x-1">
                <span>{{ slotProps.option.icon }}</span>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>

            <template #emptyfilter>
              <div class="text-center"><span>No categories found</span></div>
            </template>

            <template #empty>
              <div class="text-center"><span>No categories found</span></div>
            </template>
          </Select>
          <Message variant="simple" severity="secondary" size="small">
            Select a category for this transaction
          </Message>
        </div>

        <div class="space-y-1">
          <label for="date">Transaction date</label>
          <DatePicker
            input-id="date"
            name="date"
            date-format="yy-mm-dd"
            show-button-bar
            fluid
          />
          <Message variant="simple" severity="secondary" size="small">
            Select a date for this transaction
          </Message>
        </div>
      </div>

      <div class="flex justify-end gap-x-3">
        <Button
          size="small"
          severity="secondary"
          label="Cancel"
          autofocus
          @click="visible = false"
        />
        <Button
          size="small"
          type="submit"
          severity="primary"
          label="Create"
          autofocus
        />
      </div>
    </Form>
  </Dialog>
</template>

<style scoped></style>
