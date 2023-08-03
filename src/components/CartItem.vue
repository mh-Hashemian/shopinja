<template>
  <div
    class="mb-1 flex cursor-pointer flex-col rounded-md border hover:shadow-md sm:flex-row"
  >
    <img class="mx-auto w-40 py-2 sm:w-28" :src="item.image_src" />
    <div
      class="flex flex-grow flex-col items-center justify-between px-1 py-2 sm:flex-row"
    >
      <div class="mb-4 text-center sm:mb-0 sm:text-right">
        <h4 class="text-lg font-bold">{{ item.title }}</h4>
        <p class="text-base text-gray-700">
          {{ toPersianNumber(item.price) }} تومان
        </p>
        <p class="text-sm text-gray-600">
          باقیمانده در انبار:
          <span class="text-lg font-bold">{{
            toPersianNumber(item.stock)
          }}</span>
        </p>
      </div>
      <div class="ml-3 flex flex-col items-center justify-center space-y-2">
        <number-input :product-id="item.id" />
        <p class="text-base text-gray-600">
          <span class="text-xl font-bold text-gray-700">{{
            toPersianNumber(item.qty * item.price)
          }}</span>
          تومان
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore"
import { useProductStore } from "../stores/productStore"
import toPersianNumber from "../utils/toPersianNumber"
import NumberInput from "./NumberInput.vue"

const cartStore = useCartStore()
const productStore = useProductStore()
const { item } = defineProps(["item"])
</script>
