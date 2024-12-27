<script setup lang="ts">
import { ref } from "vue";

import ThemeButton from "@/components/buttons/ThemeButton.vue";

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Transactions",
    icon: "pi pi-wallet",
    route: "/transactions",
  },
  {
    label: "Manage",
    icon: "pi pi-cog",
    route: "/manage",
  },
]);
</script>

<template>
  <div class="border-b border-surface">
    <Menubar
      :model="items"
      class="container mx-auto rounded-none border-none bg-transparent py-3"
    >
      <template #start>
        <h1 class="text-xl font-bold text-yellow-400">💵 Budget Tracker</h1>
      </template>

      <template #item="{ item, props }">
        <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
      <template #end>
        <ThemeButton />
      </template>
    </Menubar>
  </div>
</template>

<style scoped></style>
