<template>
  <div class="flex w-fit justify-center">
    <div class="ml-1 flex items-center rounded-lg bg-gray-200 px-5 py-1">
      <button
        class="ml-1 cursor-pointer rounded-full p-1 hover:bg-gray-300"
        @click="cartStore.addItem(productStore.getProduct(productId))"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 text-lime-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <span class="cursor-default px-2 text-xl font-bold">{{
        toPersianNumber(cartStore.getCartItem(productId)?.qty)
      }}</span>

      <button
        class="mr-1 cursor-pointer rounded-full p-1 hover:bg-gray-300"
        @click="cartStore.removeItem(productId)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 text-red-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </button>
    </div>
    <Button @click="cartStore.deleteItem(productId)" color="red">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </Button>
  </div>
</template>

<script setup>
import { Button } from "flowbite-vue"
import { useCartStore } from "../stores/cartStore"
import { useProductStore } from "../stores/productStore"
import toPersianNumber from "../utils/toPersianNumber"

const { productId } = defineProps(["productId"])
const cartStore = useCartStore()
const productStore = useProductStore()
</script>
