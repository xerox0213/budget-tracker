<script setup lang="ts">
import {
  Form,
  FormField,
  type FormFieldState,
  type FormSubmitEvent,
} from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { computed, ref } from "vue";

import EmojiPickerFormField from "@/components/form-fields/EmojiPickerFormField.vue";
import { categoryDataSchema } from "@/schemas/category-schema.ts";
import { getLightCategoryColor } from "@/services/category-color-service.ts";
import { useCategoryStore } from "@/stores/category-store.ts";
import type { Category, CategoryData } from "@/types/category-type.ts";

type Props = { categoryType: Category["categoryType"] };
const props = defineProps<Props>();

const categoryStore = useCategoryStore();

const visible = ref<boolean>(false);
const resolver = ref(zodResolver(categoryDataSchema));
const lightCategoryColor = computed<string>(() => {
  return getLightCategoryColor(props.categoryType);
});

const onSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    categoryStore.store(values as CategoryData);
    visible.value = false;
  }
};
</script>

<template>
  <Button
    label="Add category"
    icon="pi pi-plus"
    size="small"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    class="w-screen sm:max-w-screen-sm"
    :draggable="false"
    modal
  >
    <template #header>
      <div class="text-xl font-bold">
        Create
        <span :class="`text-${lightCategoryColor}`">{{ categoryType }}</span>
        category
      </div>
    </template>

    <Form :resolver class="space-y-5" @submit="onSubmit">
      <div class="text-muted-color">
        Categories are used to group your transactions
      </div>

      <FormField v-slot="$field" name="name" class="space-y-1">
        <label for="name">Name</label>
        <InputText id="name" type="text" placeholder="Category" fluid />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="icon" class="space-y-1">
        <label for="icon">Icon</label>
        <EmojiPickerFormField v-model="$field.value" v-bind="$field.props" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField
        name="categoryType"
        :initial-value="categoryType"
        class="hidden"
      />

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
