<script setup lang="ts">
import NavBarLink from "@/components/NavBarLink.vue";
import BrandLogo from "@/components/ui/brand-logo/BrandLogo.vue";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-vue-next";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader class="mb-4 text-left">
        <SheetTitle>
          <BrandLogo size="large" />
        </SheetTitle>
      </SheetHeader>
      <nav class="flex flex-col">
        <SheetClose as-child>
          <NavBarLink route-name="dashboard">Dashboard</NavBarLink>
        </SheetClose>
        <SheetClose as-child>
          <NavBarLink route-name="transactions">Transactions</NavBarLink>
        </SheetClose>
        <SheetClose as-child>
          <NavBarLink route-name="manage">Manage</NavBarLink>
        </SheetClose>
      </nav>
    </SheetContent>
  </Sheet>
</template>
