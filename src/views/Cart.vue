<template>
  <div class="rounded-md bg-white px-8 py-16 shadow-md lg:px-32">
    <header class="flex items-center justify-between">
      <h2 class="text-4xl font-bold">سبد خرید</h2>
      <p>
        تعداد اقلام:
        <span class="text-xl font-bold">{{ toPersianNumber(itemsCount) }}</span>
      </p>
    </header>
    <hr class="mt-5 border-2 border-dashed" />
    <div class="mt-2 py-4">
      <div
        class="border-2 border-dashed p-6 text-xl text-gray-800"
        v-if="itemsCount <= 0"
      >
        کالایی در سبد خرید وجود ندارد!
      </div>
      <div v-else>
        <cart-item v-for="item in cart.items" :key="item.id" :item="item" />
      </div>
    </div>
    <hr v-if="itemsCount > 0" class="mb-3 mt-3 border-2 border-dashed" />
    <footer
      v-if="itemsCount > 0"
      class="flex flex-col items-center justify-between sm:flex-row"
    >
      <p class="mb-2 sm:mb-0">
        <span class="text-xl text-gray-700">مجموع سفارش: </span>
        <span class="text-2xl font-bold text-gray-800">{{
          toPersianNumber(cartStore.totalPrice)
        }}</span>
        تومان
      </p>
      <Button
        class="flex w-full items-center justify-center px-16 text-center text-xl transition-all sm:w-auto"
        color="default"
        outline
        pill
        >پرداخت</Button
      >
    </footer>
  </div>
</template>

<script setup>
import { Button } from "flowbite-vue"
import { storeToRefs } from "pinia"
import { useCartStore } from "../stores/cartStore"
import toPersianNumber from "../utils/toPersianNumber"
import CartItem from "../components/CartItem.vue"

const cartStore = useCartStore()
const { itemsCount, cart } = storeToRefs(cartStore)
</script>
