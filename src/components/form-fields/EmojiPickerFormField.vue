<script setup lang="ts">
import "node_modules/vue3-emoji-picker/dist/style.css";

import { inject, ref, useTemplateRef } from "vue";
import EmojiPicker, { type EmojiExt } from "vue3-emoji-picker";

import { themeKey } from "@/providers/keys.ts";
import type { ThemeData } from "@/types/theme-type.ts";

const model = defineModel<string>();

const op = ref();
const input = useTemplateRef("input");

const toggle = (event: Event) => op.value.toggle(event);
const onSelectEmoji = ({ i }: EmojiExt) => {
  if (input.value) {
    input.value.value = i;
    input.value.dispatchEvent(new Event("input"));
  }
};

const { theme } = inject(themeKey) as ThemeData;
</script>

<template>
  <input ref="input" type="text" class="hidden" v-bind="$attrs" />

  <Button variant="outlined" class="block w-full space-y-2" @click="toggle">
    <template v-if="model">
      <div class="text-4xl">{{ model }}</div>
      <div class="text-xs text-muted-color">Click to change</div>
    </template>
    <template v-else>
      <div><i class="pi pi-minus-circle text-4xl" /></div>
      <div class="text-xs text-muted-color">Click to edit</div>
    </template>
  </Button>

  <Popover ref="op" unstyled>
    <EmojiPicker :theme="theme" :native="true" @select="onSelectEmoji" />
  </Popover>
</template>

<style scoped></style>
