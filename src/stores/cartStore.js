import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import { useLocalStorage } from "@vueuse/core"

import { ref, computed } from "vue"
import { useProductStore } from "./productStore"

export const useCartStore = defineStore("cart", () => {
  const cart = ref({
    items: useLocalStorage("cart", []),
  })

  const productStore = useProductStore()

  const itemsCount = computed(() => {
    return cart.value.items.reduce((acc, cur) => {
      return acc + cur.qty
    }, 0)
  })

  const totalPrice = computed(() => {
    return cart.value.items.reduce((acc, cur) => {
      return acc + cur.qty * cur.price
    }, 0)
  })

  function getCartItem(itemId) {
    const item = cart.value.items.find((i) => i.id === itemId)
    return item
  }

  function addItem(item) {
    const cartItem = getCartItem(item.id)

    const availableInStock = productStore.decreaseInStock(item.id)
    if (availableInStock) {
      if (cartItem) {
        cartItem.qty += 1
        cartItem.stock -= 1
      } else {
        cart.value.items.push({ ...item, qty: 1 })
      }
    } else {
      toast.error("موجودی کالا به اتمام رسیده است!")
    }
  }

  function removeItem(itemId) {
    const item = getCartItem(itemId)
    if (item) {
      if (item.qty > 1) {
        item.qty -= 1
        item.stock += 1
        productStore.increaseInStock(itemId)
      } else deleteItem(itemId)
    }
  }

  function deleteItem(itemId) {
    const itemQuantity = getCartItem(itemId).qty
    productStore.increaseInStock(itemId, itemQuantity)
    cart.value.items = cart.value.items.filter((i) => i.id !== itemId)
    toast.info("کالا با موفقیت از سبد حذف شد.")
  }

  return {
    cart,
    addItem,
    removeItem,
    getCartItem,
    deleteItem,
    itemsCount,
    totalPrice,
  }
})
