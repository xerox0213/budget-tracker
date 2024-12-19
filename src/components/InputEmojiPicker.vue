<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { CircleOff } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import EmojiPicker, { EmojiExt } from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

type Emits = {
  (event: "select", emoji: string): void;
};
const emit = defineEmits<Emits>();

const open = ref<boolean>(false);
const emoji = ref<string>();

const closeEmojiPicker = () => (open.value = false);
const toggleEmojiPicker = () => (open.value = !open.value);

const handleSelectEmoji = (emojiExtension: EmojiExt) => {
  emoji.value = emojiExtension.i;
  emit("select", emojiExtension.i);
  toggleEmojiPicker();
};

onMounted(() => {
  globalThis.addEventListener("click", closeEmojiPicker);
});

onUnmounted(() => {
  globalThis.removeEventListener("click", closeEmojiPicker);
});
</script>

<template>
  <div class="relative">
    <Button
      type="button"
      variant="outline"
      class="flex h-auto w-full flex-col [&_svg]:size-auto"
      @click.stop="toggleEmojiPicker"
    >
      <span v-if="emoji" class="text-5xl">{{ emoji }}</span>
      <CircleOff v-else :size="48" />
      <span class="text-sm text-gray-400">Click to change</span>
    </Button>
    <Transition
      enter-active-class="transition-opacity"
      leave-active-class="transition-opacity"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <EmojiPicker
        v-if="open"
        class="absolute bottom-full left-1/2 -translate-x-1/2"
        @click.stop
        @select="handleSelectEmoji"
      />
    </Transition>
  </div>
</template>

<style scoped></style>
