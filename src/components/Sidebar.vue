<template>
  <div class="col-span-2 min-h-fit rounded-md lg:col-span-1">
    <div class="relative">
      <Input placeholder="جستجو در محصولات" v-model="filters.title" />
      <svg
        v-if="filters.title"
        @click="filters.title = ''"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="absolute left-2 top-2 h-6 w-6 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <list-group class="mt-1 w-full">
      <list-group-item class="flex flex-col items-end p-3" :hover="false">
        <p class="ml-auto font-normal text-gray-400">
          نام تگ را نوشته و سپس کلید اینتر را بزنید
        </p>
        <Input
          class="ml-auto w-full"
          size="sm"
          placeholder="جستجو بر اساس تگ"
          v-model="tagInput"
          @keydown.enter.exact.stop.prevent="addToTags"
        />
        <ul class="mt-2 flex flex-wrap">
          <li
            @click="productStore.removeTag(tag)"
            class="tag"
            v-for="tag in filters.tags"
            :key="tag"
          >
            {{ tag }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-3 w-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </li>
        </ul>
      </list-group-item>
      <list-group-item
        class="flex items-center justify-between p-3"
        :hover="false"
        >فقط کالاهای موجود
        <Toggle v-model="filters.justInStock" dir="ltr" class="toggle"
      /></list-group-item>
      <list-group-item
        class="flex flex-col justify-between space-y-1 p-3"
        :hover="false"
      >
        <span>محدوده قیمت</span>
        <div class="flex lg:flex-col">
          <div class="mx-2 flex w-full flex-col lg:mb-3 lg:px-3">
            <div class="flex items-center">
              <span class="">از</span>
              <Input
                class="mr-1 flex-grow text-center"
                size="sm"
                v-model="filters.priceRange.min"
              />
            </div>
            <div class="">
              <Range
                v-model="filters.priceRange.min"
                label=""
                steps="100000"
                min="0"
                max="30000000"
              />
            </div>
          </div>
          <div class="mx-2 flex w-full flex-col lg:px-3">
            <div class="flex items-center">
              <span class="pr-1">تا</span>
              <Input
                class="mx-1 text-center"
                size="sm"
                v-model="filters.priceRange.max"
              />
              <span>تومان</span>
            </div>
            <div class="">
              <Range
                v-model="filters.priceRange.max"
                label=""
                steps="100000"
                min="0"
                max="30000000"
              />
            </div>
          </div>
        </div>
      </list-group-item>
    </list-group>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useProductStore } from "../stores/productStore"
import {
  Input,
  ListGroup,
  ListGroupItem,
  Toggle,
  Button,
  Range,
  Select,
} from "flowbite-vue"
import { ref } from "vue"

const productStore = useProductStore()
const { filters } = storeToRefs(productStore)

const tagInput = ref("")

const addToTags = () => {
  if (tagInput.value.length > 0) productStore.addTag(tagInput.value)
  tagInput.value = ""
}
</script>

<style></style>
