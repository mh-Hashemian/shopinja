<template>
  <div class="container lg:flex">
    <Sidebar />

    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
    >
      <div
        class="col-span-full mx-auto flex max-w-sm items-center pt-2 sm:mx-0"
      >
        <div class="flex items-center">
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
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
          <span class="p-1 text-sm font-bold">مرتب‌سازی:</span>
        </div>
        <ul class="mr-1 flex items-center text-sm text-gray-600">
          <li
            @click="sort({ sortBy: 'price', direction: 'ASC' })"
            class="ml-2 cursor-pointer hover:text-red-600"
            :class="{
              'text-red-600':
                sortOptions.sortBy === 'price' &&
                sortOptions.direction === 'ASC',
            }"
          >
            ارزان‌ترین
          </li>
          <li
            @click="sort({ sortBy: 'price', direction: 'DESC' })"
            class="cursor-pointer hover:text-red-600"
            :class="{
              'text-red-600':
                sortOptions.sortBy === 'price' &&
                sortOptions.direction === 'DESC',
            }"
          >
            گران‌ترین
          </li>
        </ul>
      </div>
      <Product
        v-for="product in filteredProducts"
        :product="product"
        :key="product.id"
      />
    </div>
    <div
      v-else
      class="col-span-3 flex h-full items-center justify-center border border-dashed border-gray-300 p-8 text-4xl text-gray-800"
    >
      کالایی یافت نشد!
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useProductStore } from "../stores/productStore"
import Sidebar from "../components/Sidebar.vue"
import Product from "../components/Product.vue"
import { storeToRefs } from "pinia"

const productStore = useProductStore()
const { sortOptions } = storeToRefs(productStore)
const filteredProducts = computed(() => productStore.getFilteredProducts)

const sort = (options) => {
  sortOptions.value = options
}
</script>

<style></style>
