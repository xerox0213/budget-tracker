<script setup lang="ts">
import NavBarLink from "@/components/NavBarLink.vue";
import SheetNavBar from "@/components/SheetNavBar.vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import BrandLogo from "@/components/ui/brand-logo/BrandLogo.vue";
</script>

<template>
  <header
    class="grid grid-cols-[auto_1fr_auto] items-center border-b border-b-gray-200 px-5 py-2 md:grid-cols-[1fr_auto]"
  >
    <SheetNavBar />
    <div
      class="justify-self-center md:flex md:items-baseline md:gap-2 md:justify-self-auto"
    >
      <BrandLogo size="large" />
      <nav class="hidden md:block">
        <NavBarLink route-name="dashboard">Dashboard</NavBarLink>
        <NavBarLink route-name="transactions">Transactions</NavBarLink>
        <NavBarLink route-name="manage">Manage</NavBarLink>
      </nav>
    </div>
    <ToggleTheme />
  </header>
</template>

<style scoped></style>
