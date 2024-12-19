<script setup lang="ts">
import InputEmojiPicker from "@/components/InputEmojiPicker.vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  categoryDataSchema,
  CategoryType,
} from "@/stores/category/category-schema.ts";
import { CategoryData } from "@/stores/category/category-types.ts";
import { toTypedSchema } from "@vee-validate/zod";
import { SquarePlus } from "lucide-vue-next";
import * as z from "zod";

type Emits = {
  (event: "add-category", categoryData: CategoryData): void;
};
const emit = defineEmits<Emits>();

type Properties = { type: z.infer<typeof CategoryType> };
defineProps<Properties>();

const formSchema = toTypedSchema(categoryDataSchema);

const onSubmit = (values: any) => emit("add-category", values);
</script>

<template>
  <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
    <Dialog>
      <DialogTrigger as-child>
        <slot name="dialog-trigger">
          <Button>
            <SquarePlus />
            Create category
          </Button>
        </slot>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              :class="{
                'text-red-500': type === 'expense',
                'text-emerald-500': 'income',
              }"
              >{{ type }}</span
            >
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField
            :validate-on-blur="false"
            :validate-on-change="false"
            v-slot="{ componentField }"
            name="name"
          >
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                This is how your category will appear in the app
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            :validate-on-blur="false"
            :validate-on-change="false"
            v-slot="{ setValue }"
            name="icon"
          >
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <InputEmojiPicker @select="(emoji) => setValue(emoji)" />
              </FormControl>
              <FormDescription>
                This is how your category will appear in the app
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter class="flex flex-row gap-x-2">
          <DialogClose>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="dialogForm">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
