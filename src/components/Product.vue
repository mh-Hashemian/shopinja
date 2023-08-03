<template>
  <div
    class="group relative flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
  >
    <a class="overflow-hidden">
      <img
        class="scale-75 rounded-t-lg p-3 transition-all ease-out group-hover:scale-100"
        :src="image_src"
        :alt="title"
      />
    </a>
    <div class="flex flex-grow flex-col p-4">
      <a>
        <h5
          class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </a>
      <div
        class="mb-3 flex flex-wrap overflow-x-auto overflow-y-hidden text-sm font-normal text-gray-700 dark:text-gray-400"
      >
        <span
          @click="productStore.addTag(tag)"
          class="tag"
          v-for="tag in tags"
          :key="tag"
          >{{ tag }}
        </span>
      </div>
      <div class="mb-2 flex flex-grow flex-col">
        <div class="text-md text-light flex-grow text-red-500">
          باقیمانده در انبار:
          <span class="font-bold">{{
            toPersianNumber(props.product.stock)
          }}</span>
        </div>
        <div class="text-left text-sm">
          <span class="ml-1 text-lg font-bold"
            >{{ toPersianNumber(price) }} </span
          >تومان
        </div>
      </div>

      <Button
        v-if="!cartStore.getCartItem(id)"
        class="flex w-full items-center justify-center"
        outline
        variant="default"
        @click="clickHandler"
        >افزودن به سبد خرید
        <template #prefix>
          <svg
            class="ml-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            ></path>
          </svg>
        </template>
      </Button>

      <number-input class="mx-auto" v-else :productId="id" />
    </div>
  </div>
</template>

<script setup>
import { Button } from "flowbite-vue"
import { toast } from "vue3-toastify"

import NumberInput from "./NumberInput.vue"
import { useProductStore } from "../stores/productStore"
import { useCartStore } from "../stores/cartStore"
import toPersianNumber from "../utils/toPersianNumber"

const props = defineProps({ product: Object })
const { id, title, description, image_src, price, tags } = props.product

const productStore = useProductStore()
const cartStore = useCartStore()

const clickHandler = () => {
  cartStore.addItem(props.product)
  if (props.product.stock > 0) toast.success("با موفقیت به سبد افزوده شد.")
}
</script>

<style></style>
